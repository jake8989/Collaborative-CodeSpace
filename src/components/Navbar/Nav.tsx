import React, { FC, useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useUser } from '../../../context/userContext';

const drawerWidth: number = 240;
import Avatar from '@mui/material/Avatar';

function stringToColor(string: string) {
	let hash = 0;
	let i;
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = '#';
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	return color;
}
function stringAvatar(name: string) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	};
}
const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Nav1 = () => {
	const router = useRouter();

	const [mobileOpen, setMobileOpen] = React.useState(false);

	// const navigate = useNavigate();
	const { user, logoutUser } = useUser();
	const handleDrawerToggle = (): void => {
		setMobileOpen((prevState) => !prevState);
	};
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleLogout = () => {
		logoutUser();
	};
	const handleClose = () => {
		setOpen(false);
	};

	const drawer = (
		<Box
			onClick={handleDrawerToggle}
			sx={{
				textAlign: 'center',
				height: '100%',
				marginTop: '4rem',
			}}
		>
			<Typography variant="h6" component="div" letterSpacing={4}>
				Collaborative CodeSpace
			</Typography>
			{/* <Divider /> */}
			<List sx={{ display: 'flex', flexDirection: 'column' }}>
				<ListItem>
					<Button
						fullWidth
						variant={'outlined'}
						onClick={() => router.push('/code')}
					>
						IDE
					</Button>
				</ListItem>
				{user?.user ? (
					<React.Fragment>
						<Box display={'flex'} justifyContent={'center'}>
							<Avatar
								{...stringAvatar(`${user.user.name?.trim()} #`)}
								sx={{ cursor: 'pointer' }}
								component={'button'}
								onClick={handleClickOpen}
							/>
						</Box>

						<Dialog
							open={open}
							TransitionComponent={Transition}
							keepMounted
							onClose={handleClose}
							aria-describedby="alert-dialog-slide-description"
						>
							<DialogTitle>Profile</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-slide-description">
									<Typography>
										UserId: <strong> {user.user.uid}</strong>
									</Typography>
									<Typography>Name: {user.user.name}</Typography>
									{user.user?.email && (
										<Typography>Email: {user.user.email}</Typography>
									)}
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Close</Button>
								<Button onClick={handleLogout} variant="outlined">
									Logout
								</Button>
							</DialogActions>
						</Dialog>
					</React.Fragment>
				) : (
					<ListItem>
						<Button
							color="inherit"
							variant="outlined"
							fullWidth
							onClick={() => router.push('/login')}
						>
							Login
						</Button>
					</ListItem>
				)}
			</List>
		</Box>
	);

	const container = undefined;

	return (
		<div id="home">
			<Box sx={{ display: 'flex' }}>
				{/* <CssBaseline /> */}
				<AppBar
					component="nav"
					elevation={0}
					sx={{
						color: 'black',

						zIndex: '1000000',
					}}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							letterSpacing={4}
							sx={{
								flexGrow: 1,
								display: { xs: 'none', sm: 'block' },
								userSelect: 'none',
							}}
						>
							Collaborative CodeSpace
						</Typography>
						<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
							<Typography
								variant="h6"
								component="div"
								letterSpacing={4}
								sx={{
									flexGrow: 1,
									display: { xs: 'none', sm: 'block' },
									userSelect: 'none',
								}}
							>
								{/* <img height="60px" width="100px" src={'/next.svg'} />
								 */}
								Collaborative CodeSpace
							</Typography>
						</Box>
						<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
							<List sx={{ display: 'flex' }}>
								<ListItem>
									<Button
										fullWidth
										variant={'outlined'}
										onClick={() => router.push('/code')}
									>
										IDE
									</Button>
								</ListItem>
								{user?.user ? (
									<React.Fragment>
										<Avatar
											{...stringAvatar(`${user.user.name?.trim()} #`)}
											sx={{ cursor: 'pointer' }}
											component={'button'}
											onClick={handleClickOpen}
										/>
										<Dialog
											open={open}
											TransitionComponent={Transition}
											keepMounted
											onClose={handleClose}
											aria-describedby="alert-dialog-slide-description"
										>
											<DialogTitle>Profile</DialogTitle>
											<DialogContent>
												<DialogContentText id="alert-dialog-slide-description">
													<Typography>
														UserId: <strong> {user.user.uid}</strong>
													</Typography>
													<Typography>Name: {user.user.name}</Typography>
													{user.user?.email && (
														<Typography>Email: {user.user.email}</Typography>
													)}
												</DialogContentText>
											</DialogContent>
											<DialogActions>
												<Button onClick={handleClose}>Close</Button>
												<Button onClick={handleLogout} variant="outlined">
													Logout
												</Button>
											</DialogActions>
										</Dialog>
									</React.Fragment>
								) : (
									<ListItem>
										<Button
											color="inherit"
											variant="contained"
											onClick={() => router.push('/login')}
										>
											Login
										</Button>
									</ListItem>
								)}
							</List>
						</Box>
					</Toolbar>
				</AppBar>
				<Box
					component="nav"
					sx={{ background: 'rgb(30, 30, 30)', height: '100%' }}
				>
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: {
								xs: 'block',
								sm: 'none',
								// backgroundColor: 'rgb(29, 32, 38)',
							},
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
				</Box>
				<Box component="main">
					<Toolbar />
				</Box>
			</Box>
		</div>
	);
};

export default Nav1;
