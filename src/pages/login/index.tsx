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
import Image from 'next/image';
import { loginFormInput } from '../../../types/user';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useEmailPasswordLogin from '../../../hooks/useEmailPasswordLogin';
import useForgotPassword from '../../../hooks/useForgotpassword';
import { useRouter } from 'next/router';
import { SiGoogle, SiGithub } from 'react-icons/si';
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

export default function SignInSide() {
	const [formData, setFormData] = React.useState<loginFormInput>({
		user: {
			email: '',
			password: '',
		},
	});
	const { googleServices } = useGoogleServices();
	const { emailPasswordLogin, loading } = useEmailPasswordLogin();
	const { GitHubServices, loadingWithGitHub } = useGitHubServices();
	const { forgotPassword } = useForgotPassword();
	const router = useRouter();
	const handleSubmit = (event: any) => {
		event.preventDefault();
		// console.log(formData);
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
		///all set-----
		emailPasswordLogin(formData, setFormData, router, toast);
	};
	const handleChange = (event: any): void => {
		event.preventDefault();
		setFormData({
			user: { ...formData.user, [event.target.name]: event.target.value },
		});
	};
	const handleResetPassword = (event: any) => {
		event.preventDefault();
		forgotPassword(formData, setFormData, router, toast);
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

			<Grid item xs={false} sm={4} md={7} sx={{}} />

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
						Sign in
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
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="outlined"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleSubmit}
							disabled={loading}
						>
							{loading ? 'Loading...' : 'Sign In'}
						</Button>
						<Box display={'flex'} justifyContent={'space-evenly'}>
							<Button
								variant="outlined"
								color="primary"
								startIcon={<SiGoogle />}
								onClick={handleGoogleAuthServices}
							>
								SignIn with Google
							</Button>
							<Button
								variant="outlined"
								color="primary"
								startIcon={<SiGithub />}
								onClick={handleGitHubAuthServices}
							>
								SignIn with GitHub
							</Button>
						</Box>

						<Grid container>
							<Grid item xs>
								<Link
									variant="body2"
									component={'button'}
									onClick={handleResetPassword}
								>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						{/* <Copyright sx={{ mt: 5 }} /> */}
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}
