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

import AddIcon from '@mui/icons-material/Add';
import Modal from '../../components/CustomModal/Modal';
import { ProjectInput } from '../../../types/project';
import { nanoid } from 'nanoid';
import cookie from 'js-cookie';
import { useEffect } from 'react';
import CodeIcon from '@mui/icons-material/Code';
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
	const [projectDataList, setProjectDataList] = useState<ProjectInput[]>([]);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleProject = (project_name: string) => {
		if (project_name.trim().length == 0) return;
		console.log('Hiited');
		let sk = '';
		for (let i = 0; i < project_name.length; i++) {
			if (project_name[i] == ' ') continue;
			sk += project_name[i];
		}
		const project_id: string = sk + nanoid(7);
		const owner_id = cookie.get('user_id');
		const time: string = 'later i will change it';
		const newProjectData: ProjectInput = {
			project_id,
			owner_id,
			project_name,
			time,
		};
		setProjectDataList((prevProjectDataList) => [
			...prevProjectDataList,
			newProjectData,
		]);
	};
	useEffect(() => {
		// This effect will run whenever projectDataList changes
		console.log('Project Data List Updated:', projectDataList);
	}, [projectDataList]);
	return (
		<>
			<Nav1></Nav1>
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
								>
									<Card
										sx={{
											minWidth: '100%',
											minHeight: '150px',
										}}
									>
										<CardContent>
											<Typography textAlign={'left'}>
												{p.project_name}
											</Typography>
											<Typography
												fontSize={'10px'}
												marginTop={'4rem'}
												textAlign="left"
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
	);
};
export default Collaborating;
