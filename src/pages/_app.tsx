import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import '../styles/globals.css';
import { UserProvider } from '../../context/userContext';
import { toast, ToastContainer } from 'react-toastify';
// pages/_app.js or pages/_app.tsx
import { FileProvider } from '../../context/fileContext';
import 'monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css';
// import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <FileProvider>
      <UserProvider>
        {/* <ToastContainer></ToastContainer> */}
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </UserProvider>
    </FileProvider>
  );
}
