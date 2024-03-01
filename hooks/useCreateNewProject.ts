import { useState } from 'react';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { useUser } from '../context/userContext';
import { userType } from '../types/user';
import axios, { AxiosResponse } from 'axios';
import { ProjectInput } from '../types/project';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const useCreateNewProject = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { user, logoutUser } = useUser();
	const router = useRouter();
	const createNewProject = async (projectData: ProjectInput, toast: any) => {
		if (!user || !cookie.get('user_id')) {
			toast.error('Session not created please login/signup to continue', {
				position: 'bottom-center',
			});
			logoutUser();
			cookie.set('previous_step', '/collaborating');
			router.push('/login');
			return;
		}
		setLoading(true);
		axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/users/create-new-project`,
				projectData,
				{
					headers: {
						Authorization: `Bearer ${cookie.get('token')}`,
					},
				}
			)
			.then((response: AxiosResponse) => {
				setLoading(false);
				console.log(response.data);
				toast.success('Project Created Successfully', {
					position: 'bottom-center',
				});
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				router.push('/login');
				cookie.set('previous_step', '/collaborating');
				logoutUser();

				toast.error(
					`${
						err.response?.data?.message
							? err?.response?.data?.message
							: 'Server Error'
					}`,
					{
						position: 'bottom-center',
					}
				);
			});
	};
	return { createNewProject, loading };
};
export default useCreateNewProject;
