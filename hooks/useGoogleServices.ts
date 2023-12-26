import { useState } from 'react';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { useUser } from '../context/userContext';
import { userType } from '../types/user';
const useGoogleServices = () => {
	const [loadingWithGoogle, setLoading] = useState<boolean>(false);
	const { loginUser } = useUser();
	const googleServices = (router: NextRouter, toast: any) => {
		const googleProvider = new firebaseSDK.auth.GoogleAuthProvider();
		setLoading(true);
		firebaseSDK
			.auth()
			.signInWithPopup(googleProvider)
			.then((response) => {
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

					setLoading(false);
					loginUser(user);
					toast.success('Logged In Successfully', {
						position: 'bottom-center',
					});
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
	return { googleServices, loadingWithGoogle };
};
export default useGoogleServices;
