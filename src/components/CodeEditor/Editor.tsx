import Editor from '@monaco-editor/react';
import { Paper } from '@mui/material';
const CodeEditor = () => {
	return (
		<Paper
			elevation={0}
			sx={{
				width: '67%',
				display: 'flex',
				overflowY: 'hidden',
				justifyContent: 'center',
			}}
		>
			<Editor
				theme="vs-dark"
				height="100vh"
				width={'100%'}
				language={'javascript'}
				options={{
					wordWrap: 'on',
					showUnused: false,
					fontSize: 15,
				}}
			></Editor>
		</Paper>
	);
};
export default CodeEditor;
