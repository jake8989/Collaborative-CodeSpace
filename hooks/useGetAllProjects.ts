import { useState } from 'react';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { useUser } from '../context/userContext';
import { userType } from '../types/user';
import axios, { AxiosResponse } from 'axios';
import cookie from 'js-cookie';
import { ProjectInput } from '../types/project';
const useGetAllProjects = () => {
	const [loadingProjects, setLoading] = useState<boolean>(false);
	const [projectDataList, setProjectDataList] = useState<ProjectInput[]>([]);
	const getAllProjects = () => {
		setLoading(true);
		axios
			.get(
				`${process.env.NEXT_PUBLIC_BACKEND}/auth/v1/users/get-all-projects`,
				{
					params: {
						owner_id: cookie.get('user_id'),
					},
					headers: {
						Authorization: `Bearer ${cookie.get('token')}`,
					},
				}
			)
			.then((response: AxiosResponse) => {
				setLoading(false);
				///Projects List
				const data = response.data?.allProjects;

				console.log(data);
				setProjectDataList(data);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				return;
			});
	};
	return { getAllProjects, loadingProjects, projectDataList };
};
export default useGetAllProjects;
