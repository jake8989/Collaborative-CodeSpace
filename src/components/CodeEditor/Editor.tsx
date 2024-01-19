import Editor from '@monaco-editor/react';

const CodeEditor = () => {
	return (
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
	);
};
export default CodeEditor;
