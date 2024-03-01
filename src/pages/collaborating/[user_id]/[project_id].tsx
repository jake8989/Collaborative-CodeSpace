import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useVerifyAndProjects from '../../../../hooks/useVerifyUserAndProject';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Typography, Button, Box } from '@mui/material';
import { useUser } from '../../../../context/userContext';
import CodeEditor from '../../../components/CodeEditor/Editor';
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
	//checking url for user_id and project_id
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
			<>
				{(loadingUser || loadingProject) && <LoadingScreen></LoadingScreen>}
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
				{verifiedProject && verifiedUser && (
					<>
						<Box display={'flex'}>
							<CodeEditor></CodeEditor>

							<Box>
								<Typography textAlign={'center'}>
									Add Collaborators and viewers to this project
								</Typography>
							</Box>
						</Box>
					</>
				)}
			</>
		</>
	);
};
export default CollabUrl;
