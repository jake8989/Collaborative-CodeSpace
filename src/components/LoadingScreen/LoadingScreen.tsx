import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography } from '@mui/material';

const LoadingScreen = () => {
	return (
		<section>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				sx={{
					minHeight: '100vh',
					zIndex: 1000,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				direction="column"
			>
				<Grid item>
					<CircularProgress
						thickness={4}
						size={60}
						style={{ color: '#6C63FF' }}
					/>
				</Grid>
				<Grid item sx={{ marginTop: '2rem' }}>
					<Typography variant="h3" align="center">
						Loading...
					</Typography>
				</Grid>
			</Grid>
		</section>
	);
};

export default LoadingScreen;
