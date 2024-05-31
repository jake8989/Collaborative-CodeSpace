import React, { FC, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Typography, Button, TextField } from '@mui/material';
import { ProjectInput } from '../../../types/project';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Position } from 'monaco-editor';
const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});
interface CustomModalProps {
	open: boolean;
	handleClose: () => void;
	title: string;
	handleProject: (project_name: string, project_description: string) => void;
}
const customModal: React.FC<CustomModalProps> = ({
	open,
	handleClose,
	title,
	handleProject,
}) => {
	const [projectName, setProjectName] = useState<string>('');
	const [projectDescription, setProjectDescription] = useState<String>('');
	const handleSave = async () => {
		if (projectName.trim().length == 0) return;
		if (projectName.trim().length > 15) {
			toast.error('Project Name Length Should be at most 15 character long', {
				position: 'bottom-center',
			});
			return;
		}
		console.log(projectDescription);
		if (projectDescription.trim().length > 50) {
			toast.error('Project Description should contain at most 50 character', {
				position: 'bottom-center',
			});
			return;
		}
		await handleProject(projectName.trim(), projectDescription.trim());
		handleClose();
		setProjectName('');
		setProjectDescription('');
	};
	return (
		<>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				sx={{ minHeight: '500px' }}
			>
				<ToastContainer></ToastContainer>
				<DialogTitle>Let's start with a name for your project </DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<TextField
							fullWidth
							type="text"
							name="project_name"
							id="project_name"
							value={projectName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								e.preventDefault();
								setProjectName(e.target.value);
							}}
							label="Enter the name of your project"
							variant="standard"
						/>
						<TextField
							fullWidth
							type="text"
							name="project_description"
							id="project_description"
							value={projectDescription}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								e.preventDefault();
								setProjectDescription(e.target.value);
							}}
							label="description"
							variant="standard"
						/>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleSave}>
						Continue
					</Button>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
export default customModal;
