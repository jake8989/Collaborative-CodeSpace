import React from 'react';
import { Paper, Box, Button, Typography, Card } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
const LandingPage = () => {
	const router = useRouter();
	return (
		<>
			<Paper
				elevation={0}
				sx={{
					marginTop: '5%',
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
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
					flexDirection={'column'}
					marginTop={'3.4%'}
				>
					<Box>
						<Typography fontSize={'2rem'} textAlign={'center'}>
							Code
						</Typography>
					</Box>
					<Box>
						<Typography fontSize={'2rem'} textAlign={'center'}>
							Compile
						</Typography>
					</Box>
					<Box>
						<Typography
							fontSize={'2rem'}
							textAlign={'center'}
							color={'#6C63FF'}
						>
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
				<Button
					variant="outlined"
					onClick={() => router.push('/collaborating')}
				>
					Start Collaborating
				</Button>
			</Box>
		</>
	);
};
export default LandingPage;
