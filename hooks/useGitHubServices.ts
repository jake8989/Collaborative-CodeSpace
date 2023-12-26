import { useState } from 'react';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { useUser } from '../context/userContext';
import { userType } from '../types/user';
const useGitHubServices = () => {
	const [loadingWithGitHub, setLoading] = useState<boolean>(false);
	const { loginUser } = useUser();
	const GitHubServices = (router: NextRouter, toast: any) => {
		const GitHubProvider = new firebaseSDK.auth.GithubAuthProvider();
		setLoading(true);
		firebaseSDK
			.auth()
			.signInWithPopup(GitHubProvider)
			.then((response) => {
				console.log(response);
				const user: userType = {
					user: {
						name: response.user?.displayName,
						email: response.user?.email,
						token: 'khali',
						uid: response.user?.uid,
					},
				};
				if (response.additionalUserInfo?.isNewUser) {
					///do backend stuff for new user
					///requests for backend
					loginUser(user);
					setLoading(false);
					router.push('/');
				} else {
					loginUser(user);
					setLoading(false);
					toast.success('Logged In Successfully', {
						position: 'bottom-center',
					});
					router.push('/');
				}
			})
			.catch((err: any) => {
				setLoading(false);
				toast.error(`${err.message}`, {
					position: 'bottom-center',
				});
			});
	};
	return { GitHubServices, loadingWithGitHub };
};
export default useGitHubServices;
