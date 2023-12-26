import React from 'react';
import { Paper, Box, Button, Typography, Card } from '@mui/material';
import Image from 'next/image';
const LandingPage = () => {
	return (
		<>
			<Paper
				elevation={0}
				sx={{ marginTop: '5%', display: 'flex', flexWrap: 'wrap' }}
			>
				<Box>
					<Box>
						<Box>
							<Image src="Landing.svg" height={800} width={800} alt=""></Image>
						</Box>
					</Box>
				</Box>
				<Box
					display={'flex'}
					justifyContent={'center'}
					marginLeft={'8%'}
					flexDirection={'column'}
				>
					<Box>
						<Typography fontSize={'5rem'}>Code</Typography>
					</Box>
					<Box>
						<Typography fontSize={'5rem'}>Compile</Typography>
					</Box>
					<Box>
						<Typography fontSize={'5rem'} color={'#6C63FF'}>
							Collaborate
						</Typography>
					</Box>
				</Box>
			</Paper>
			<Box
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				marginTop={'3rem'}
				marginBottom={'4rem'}
			>
				<Button variant="outlined">Start Collaborating</Button>
			</Box>
		</>
	);
};
export default LandingPage;
