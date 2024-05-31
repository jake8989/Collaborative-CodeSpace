import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useVerifyAndProjects from '../../../../hooks/useVerifyUserAndProject';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Typography, Button, Box } from '@mui/material';
import { useUser } from '../../../../context/userContext';
import CodeEditor from '../../../components/CodeEditor/Editor';
import Snackbar from '@mui/material/Snackbar';
import { useFile } from '../../../../context/fileContext';
import { fileType } from '../../../../types/file';
import AddMembers from '../../../components/AddMembers/AddMembers';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '10px solid #000',
  boxShadow: 24,
  p: 4,
};
const CollabUrl = () => {
  const router = useRouter();
  const { user_id, project_id } = router.query;
  const { logoutUser } = useUser();
  const { setFileDefault } = useFile();
  const { file, defaultFileSetting } = useFile();
  const [fileName, setFileName] = useState<string>('');
  const {
    verifyUser,
    verifyProjectId,
    verifiedUser,
    verifiedProject,
    loadingUser,
    loadingProject,
  } = useVerifyAndProjects();
  //checking url for user_id and project_id
  useEffect(() => {
    const verify = async () => {
      try {
        await verifyUser(user_id);
        await verifyProjectId(project_id, user_id);
      } catch (error) {
        console.log(error);
      }
    };
    verify();
  }, [router.query]);
  const [open, setOpen] = React.useState(false);
  const [codeFile, setCodeFile] = useState<any>();
  const [fileContent, setFileContent] = useState<string>('');
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const uploadedCodeFile = event.target?.files?.[0] as File;
    if (!uploadedCodeFile) return;
    const fileName = uploadedCodeFile.name;
    setFileName(fileName);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string; // Read only the first 100 characters
      // console.log('File preview:', content);
      // setFileContent(content);
      const FileToBeSetted: fileType = {
        file: {
          content: content,
          extention: fileName.split('.')[1],
        },
      };
      setFileDefault(FileToBeSetted);

      // HideImageOutlined();
      // Display the preview in your UI
    };
    reader.readAsText(uploadedCodeFile);
    console.log(fileContent);
  };
  const action = (
    <>
      <ToastContainer></ToastContainer>
      <React.Fragment>
        <Button size="small" onClick={handleClose}>
          Close
        </Button>
      </React.Fragment>
    </>
  );
  return (
    <>
      <ToastContainer></ToastContainer>
      <>
        {(loadingUser || loadingProject) && <LoadingScreen></LoadingScreen>}
        {!verifiedUser && !verifiedProject && (
          <Typography>
            <Button
              onClick={() => {
                logoutUser();
                router.push('/login');
              }}
            >
              Url Not verified Click Here to continue!
            </Button>
          </Typography>
        )}
        {!verifiedUser && verifiedProject && (
          <Typography>
            User Not Verified Login agina to continue
            <Button
              onClick={() => {
                defaultFileSetting();
                logoutUser();
                router.push('/login');
              }}
            >
              Click Here to continue
            </Button>
          </Typography>
        )}
        {!verifiedProject && verifiedUser && (
          <Typography>
            You are not Collaborator/Viewer to this Project
            <Button
              onClick={() => {
                // logoutUser();
                defaultFileSetting();
                router.push('/collaborating');
              }}
            >
              Click Here to continue
            </Button>
          </Typography>
        )}
        {verifiedProject && verifiedUser && (
          <>
            {/* <ToastContainer></ToastContainer>
             */}

            <Box display={'flex'}>
              <CodeEditor></CodeEditor>

              <Box marginTop={'50px'} marginLeft={'20px'}>
                <Box marginBottom={'1%'}>
                  <Typography>
                    Upload the file you want to collaborate
                    <br />
                    {Boolean(file) && 'file name: ' + fileName}
                  </Typography>
                </Box>
                <Box
                  className="Get File-Name- and send it to the code editor"
                  marginBottom={'30%'}
                >
                  {/* <ButtonGroup> */}

                  <Button
                    variant="contained"
                    component="label"
                    disabled={Boolean(file)}
                  >
                    Upload File
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: '1%' }}
                    disabled={Boolean(!file)}
                    onClick={() => {
                      defaultFileSetting();
                    }}
                  >
                    Delete File
                  </Button>
                </Box>
                <Box>
                  <Button variant="contained" sx={{ marginBottom: '5%' }}>
                    Save To Cloud
                  </Button>
                </Box>
                <Typography textAlign={'center'}>
                  Add Collaborators and viewers to this project
                </Typography>
                <div>
                  <Button
                    onClick={handleClick}
                    variant="contained"
                    sx={{ background: '#6C63FF' }}
                  >
                    Add Members
                  </Button>
                  {/* <Snackbar
                    open={open}
                    autoHideDuration={8000}
                    onClose={handleClose}
                    message={`${user_id}/${project_id}`}
                    action={action}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                  /> */}
                </div>
              </Box>
            </Box>
            <AddMembers
              open={open}
              handleClose={handleClose}
              title="Modal"
            ></AddMembers>
          </>
        )}
      </>
    </>
  );
};
export default CollabUrl;
