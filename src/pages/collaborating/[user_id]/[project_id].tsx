import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useVerifyAndProjects from '../../../../hooks/useVerifyUserAndProject';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Typography, Button, Box } from '@mui/material';
import { useUser } from '../../../../context/userContext';
const CollabUrl = () => {
	const router = useRouter();
	const { user_id, project_id } = router.query;
	const { logoutUser } = useUser();
	const {
		verifyUser,
		verifyProjectId,
		verifiedUser,
		verifiedProject,
		loadingUser,
		loadingProject,
	} = useVerifyAndProjects();
	// if (loadingUser || loadingProject) return <LoadingScreen></LoadingScreen>;

	useEffect(() => {
		const verify = async () => {
			try {
				await verifyUser(user_id);
				await verifyProjectId(project_id, user_id);
			} catch (error) {
				console.log(error);
			}
		};
		verify();
	}, [router.query]);
	return (
		<>
			<ToastContainer></ToastContainer>
			<Box display={'flex'} justifyContent={'center'} marginTop={'4rem'}>
				{!verifiedUser && !verifiedProject && (
					<Typography>
						<Button
							onClick={() => {
								logoutUser();
								router.push('/login');
							}}
						>
							Url Not verified Click Here to continue!
						</Button>
					</Typography>
				)}
				{!verifiedUser && verifiedProject && (
					<Typography>
						User Not Verified
						<Button
							onClick={() => {
								logoutUser();
								router.push('/login');
							}}
						>
							Click Here to continue
						</Button>
					</Typography>
				)}
				{!verifiedProject && verifiedUser && (
					<Typography>
						Project Id is not verified please check project id
						<Button
							onClick={() => {
								logoutUser();
								router.push('/login');
							}}
						>
							Click Here to continue
						</Button>
					</Typography>
				)}
			</Box>
		</>
	);
};
export default CollabUrl;
