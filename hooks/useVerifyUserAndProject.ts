import { RestaurantRounded } from '@mui/icons-material';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
const useVerifyAndProjects = () => {
	const [verifiedUser, setVerifyUser] = React.useState<boolean>(false);
	const [verifiedProject, setVerifyProject] = React.useState<boolean>(false);
	const [loadingUser, setUserLoading] = React.useState<boolean>(false);
	const [loadingProject, setProjectLoading] = React.useState<boolean>(false);
	const verifyUser = async (user_id: string | string[] | undefined) => {
		//backend service
		if (!user_id) return;
		setUserLoading(true);
		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/users/verify-user`, {
				user_id,
			})
			.then((response: AxiosResponse) => {
				if (response.status === 200) {
					setUserLoading(false);
					setVerifyUser(true);
				}
			})
			.catch((err) => {
				setUserLoading(false);
			});
	};
	const verifyProjectId = async (
		project_id: string | string[] | undefined,
		user_id: string | string[] | undefined
	) => {
		//backend service
		if (!project_id || !user_id) return;
		setProjectLoading(true);
		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/users/verify-project`, {
				user_id,
				project_id,
			})
			.then((response: AxiosResponse) => {
				// setProjectLoading(false);
				if (response.status === 200) {
					setProjectLoading(false);
					setVerifyProject(true);
				}
			})
			.catch((err) => {
				setProjectLoading(false);
			});
	};
	return {
		verifyUser,
		verifyProjectId,
		verifiedUser,
		verifiedProject,
		loadingUser,
		loadingProject,
	};
};
export default useVerifyAndProjects;
