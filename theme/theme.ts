import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
const theme = createTheme({
	palette: {
		primary: {
			main: '#6C63FF',
		},
		// secondary: {
		// 	main: '#ffffff',
		// },
	},
	typography: {
		fontFamily: 'cursive',
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#ffffff',
				},
			},
		},
	},
});

export default theme;
