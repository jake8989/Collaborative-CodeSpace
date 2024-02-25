import { useState } from 'react';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { useUser } from '../context/userContext';
import { userType } from '../types/user';
import axios, { AxiosResponse } from 'axios';
import { ProjectInput } from '../types/project';
import cookie from 'js-cookie';
const useCreateNewProject = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { user } = useUser();
	const createNewProject = async (projectData: ProjectInput, toast: any) => {
		if (!user || !cookie.get('user_id')) {
			toast.error('You must signup/login to do this action', {
				position: 'bottom-center',
			});
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
				toast.error(
					`${
						err.response.data.message
							? err.response.data.message
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
