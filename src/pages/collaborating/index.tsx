import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Nav1 from '../../components/Navbar/Nav';
import {
	Paper,
	Box,
	Button,
	Card,
	Grid,
	CardContent,
	Typography,
} from '@mui/material';
import moment, { relativeTimeRounding } from 'moment';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../components/CustomModal/Modal';
import { ProjectInput } from '../../../types/project';
import { nanoid } from 'nanoid';
import cookie from 'js-cookie';
import { useEffect } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import useCreateNewProject from '../../../hooks/useCreateNewProject';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import useGetAllProjects from '../../../hooks/useGetAllProjects';
import { useUser } from '../../../context/userContext';
import SettingsIcon from '@mui/icons-material/Settings';
// import { useRouter } from 'next/router';
const dummyProjects = [
	{
		id: '1',
		name: 'Project1',
	},
	{
		id: '2',
		name: 'Project2',
	},
	{
		id: '3',
		name: 'Project3',
	},
];
const Collaborating = () => {
	const [open, setOpen] = React.useState(false);

	const { createNewProject, loading } = useCreateNewProject();
	const { getAllProjects, loadingProjects, projectDataList } =
		useGetAllProjects();
	const { logoutUser } = useUser();
	const router = useRouter();
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	let project_id__;
	const { user } = useUser();
	const handleProject = async (
		project_name: string,
		project_description: string
	) => {
		if (project_name.trim().length == 0) return;
		console.log('Hiited');
		let sk = '';
		for (let i = 0; i < project_name.length; i++) {
			if (project_name[i] == ' ') continue;
			sk += project_name[i];
		}
		const project_id: string = sk + nanoid(10);
		project_id__ = project_id;
		const owner_id = cookie.get('user_id');
		const time: string = moment().format('MMMM Do YYYY, h:mm:ss a');
		const newProjectData: ProjectInput = {
			project_id,
			owner_id,
			project_name,
			project_description,
			time,
		};

		try {
			console.log(project_id__);
			await createNewProject(newProjectData, toast);
			await getAllProjects(toast);
		} catch (error) {
			console.log(error);
		}
		await getAllProjects(toast);
		// setProjectDataList((prevProjectDataList) => [
		// 	...prevProjectDataList,
		// 	newProjectData,
		// ]);
	};
	useEffect(() => {
		getAllProjects(toast);
	}, [project_id__, user]);

	if (loadingProjects) return <LoadingScreen></LoadingScreen>;
	return (
		<>
			{loading ? (
				<>
					{' '}
					<ToastContainer></ToastContainer>
					<LoadingScreen></LoadingScreen>
				</>
			) : (
				<>
					<Nav1></Nav1>
					<ToastContainer></ToastContainer>
					<Paper
						elevation={0}
						sx={{
							marginTop: '3rem',
						}}
					>
						<Box sx={{ flexGrow: 1 }}>
							<Grid
								container
								// spacing={{ xs: 2, md: 3 }}
								columns={{ xs: 4, sm: 8, md: 12 }}
								padding={'2rem'}
								justifyContent={'center'}
								alignItems={'center'}
							>
								<Grid padding={'2rem'} item xs={12} sm={4} md={4}>
									<Button
										style={{ width: '100%', height: '100%', padding: '0px' }}
										fullWidth
										onClick={handleClickOpen}
									>
										<Card
											sx={{
												minWidth: '100%',
												minHeight: '150px',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<CardContent>
												<Typography color={'#6C63FF'} textAlign={'center'}>
													<AddIcon></AddIcon>
												</Typography>
												<Typography textAlign={'center'} color={'#6C63FF'}>
													Add Project
												</Typography>
											</CardContent>
										</Card>
									</Button>
								</Grid>

								{projectDataList.map((p, index) => (
									<Grid padding={'2rem'} item xs={12} sm={4} md={4} key={index}>
										<Button
											style={{ width: '100%', height: '100%', padding: '0px' }}
											fullWidth
											onClick={() => {
												let user = cookie.get('user_id');
												let token = cookie.get('token');
												if (!user || !token) {
													logoutUser();
													router.push('/login');
													toast.error(
														`Error: Please login/signup to continue`,
														{
															position: 'bottom-center',
														}
													);
													// return;
												} else {
													router.push(
														`/collaborating/${cookie.get('user_id')}/${
															p.project_id
														}`
													);
												}
											}}
										>
											<Card
												sx={{
													minWidth: '100%',
													minHeight: '150px',
												}}
											>
												<CardContent sx={{ position: 'relative' }}>
													<Typography textAlign={'left'}>
														{p.project_name}
														{/* <Button>
															<SettingsIcon></SettingsIcon>
														</Button> */}
													</Typography>
													<Typography textAlign={'left'} fontSize={'11px'}>
														{p.project_description}
													</Typography>
													<Typography
														fontSize={'10px'}
														textAlign="left"
														position={'absolute'}
														bottom={'-60px'}
													>
														{p.project_id}
														<CodeIcon
															fontSize="small"
															sx={{ marginLeft: '10px' }}
														></CodeIcon>
													</Typography>
												</CardContent>
											</Card>
										</Button>
									</Grid>
								))}
							</Grid>
						</Box>
						<Modal
							open={open}
							handleClose={handleClose}
							title={'Open'}
							handleProject={handleProject}
						></Modal>
					</Paper>
				</>
			)}
		</>
	);
};
export default Collaborating;
