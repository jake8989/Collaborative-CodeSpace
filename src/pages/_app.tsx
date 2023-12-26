import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import '../styles/globals.css';
import { UserProvider } from '../../context/userContext';
import { toast, ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<ThemeProvider theme={theme}>
				<ToastContainer></ToastContainer>
				<Component {...pageProps} />
			</ThemeProvider>
		</UserProvider>
	);
}
