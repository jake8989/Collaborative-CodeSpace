import CodeEditor from '../../components/CodeEditor/Editor';
import { Paper, Box, Typography, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
const code = () => {
	const [age, setAge] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};
	return (
		<>
			<Box display={'flex'}>
				<CodeEditor></CodeEditor>
				<Box
					display={'flex'}
					alignItems={'center'}
					flexDirection={'column'}
					width={'33%'}
					marginTop={'3%'}
				>
					{/* <Box>
			<Typography>Select Language</Typography>
		</Box> */}
					<Box width={'70%'}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								Select Language
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={age}
								label="Age"
								onChange={handleChange}
							>
								<MenuItem value={10}>javaScript</MenuItem>
								<MenuItem value={20}>Python</MenuItem>
								<MenuItem value={30}>C</MenuItem>
								<MenuItem value={40}>C++</MenuItem>
								<MenuItem value={50}>TypeScript</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Button sx={{ width: '70%', marginTop: '3%' }} variant={'outlined'}>
						Run
					</Button>
				</Box>
			</Box>
		</>
	);
};
export default code;
