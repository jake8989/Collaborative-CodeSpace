import Editor from '@monaco-editor/react';
import { Paper } from '@mui/material';
import { useRef } from 'react';
import { useFile } from '../../../context/fileContext';
const CodeEditor = () => {
  const { file } = useFile();
  const content = file?.file.content;
  let extention = file?.file.extention as string;
  if (extention == undefined) extention = 'javascript';
  type MyValueType = string;
  const languageMap: { [key: string]: MyValueType } = {};
  languageMap['py'] = 'python';
  languageMap['js'] = 'javascript';
  languageMap['jsx'] = 'javascript';
  languageMap['ts'] = 'typescript';
  languageMap['tsx'] = 'typescript';
  languageMap['html'] = 'html';
  languageMap['HTML'] = 'html';
  languageMap['css'] = 'css';
  languageMap['CSS'] = 'css';
  languageMap['cpp'] = 'cpp';
  languageMap['c++'] = 'cpp';
  languageMap['go'] = 'go';
  languageMap['jav'] = 'java';
  languageMap['java'] = 'java';
  languageMap['json'] = 'json';
  languageMap[''] = 'javascript';
  console.log(file);
  const editorRef = useRef(null);

  return (
    <Paper
      elevation={0}
      sx={{
        width: '80%',
        display: 'flex',
        overflowY: 'hidden',
        justifyContent: 'center',
        margin: '0px',
      }}
    >
      <Editor
        theme="vs-dark"
        height="100vh"
        width={'100%'}
        language={languageMap[extention.trim().toLowerCase()]}
        value={content}
        options={{
          readOnly: false,
          formatOnType: true,
          wordWrap: 'on',
          showUnused: false,
          fontSize: 15,
        }}
      ></Editor>
    </Paper>
  );
};
export default CodeEditor;
