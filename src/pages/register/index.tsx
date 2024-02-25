import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SiGoogle, SiGithub } from 'react-icons/si';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { registerFormInput } from '../../../types/user';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import useEmailPasswordSignup from '../../../hooks/useEmailPasswordSignup';
import useGoogleServices from '../../../hooks/useGoogleServices';
import useGitHubServices from '../../../hooks/useGitHubServices';
function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

const SignInSide = () => {
	const router = useRouter();
	const { emailPasswordSignup, loading } = useEmailPasswordSignup();
	const { GitHubServices, loadingWithGitHub } = useGitHubServices();
	const { googleServices, loadingWithGoogle } = useGoogleServices();
	const [formData, setFormData] = useState<registerFormInput>({
		user: {
			name: '',
			email: '',
			password: '',
			cpassword: '',
		},
	});

	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (formData.user.name.trim().length == 0) {
			toast.error('Name Cannot be empty!', {
				position: 'bottom-center',
			});
			return;
		}
		if (
			formData.user.email.trim() === '' ||
			!formData.user.email.trim().includes('@') ||
			!formData.user.email.trim().includes('.')
		) {
			toast.error('Wrong Email Format', {
				position: 'bottom-center',
			});
			return;
		}
		if (formData.user.name.trim() === '') {
			toast.error('Name Cannot be empty', {
				position: 'bottom-center',
			});
			return;
		}
		if (
			formData.user.password.trim() === '' ||
			formData.user.password.trim().length < 6
		) {
			// alert('password length should be 6');
			toast.error('Password length should be at least 6!', {
				position: 'bottom-center',
			});
			return;
		}

		if (formData.user.password.trim() !== formData.user.cpassword.trim()) {
			toast.error('Password and Confirm Passwords are not matching!', {
				position: 'bottom-center',
			});
			return;
		}
		//All set//

		console.log(formData);
		emailPasswordSignup(formData, setFormData, router, toast);
	};
	const handleChange = (event: any): void => {
		event.preventDefault();
		console.log('DP');
		setFormData({
			user: { ...formData.user, [event.target.name]: event.target.value },
		});
	};
	const handleGoogleAuthServices = (event: any) => {
		event.preventDefault();
		googleServices(router, toast);
	};
	const handleGitHubAuthServices = (event: any) => {
		event.preventDefault();
		GitHubServices(router, toast);
	};
	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="name"
							label="Name"
							name="name"
							autoComplete="name"
							autoFocus
							onChange={handleChange}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={handleChange}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={handleChange}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="cpassword"
							label="Confirm Password"
							type="cpassword"
							id="cpassword"
							autoComplete="current-cpassword"
							onChange={handleChange}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>

						<Button
							onClick={handleSubmit}
							variant="outlined"
							sx={{ mt: 3, mb: 2 }}
							fullWidth
							disabled={loading}
						>
							{loading ? 'Loading...' : 'Signup'}
						</Button>
						<Box display={'flex'} justifyContent={'space-evenly'}>
							<Button
								variant="outlined"
								color="primary"
								fullWidth
								startIcon={<SiGoogle />}
								onClick={handleGoogleAuthServices}
							>
								SignUp with Google
							</Button>
							{/* <Button
								variant="outlined"
								color="primary"
								startIcon={<SiGithub />}
								onClick={handleGitHubAuthServices}
							>
								SignUp with GitHub
							</Button> */}
						</Box>
						<Grid item xs={false} sm={4} md={7}></Grid>
						<Grid item>
							<Button onClick={() => router.push('/login')}>
								Already have an account?
							</Button>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
export default SignInSide;
