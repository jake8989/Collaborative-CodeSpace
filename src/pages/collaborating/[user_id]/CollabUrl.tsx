import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useVerifyAndProjects from '../../../../hooks/useVerifyUserAndProject';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';
import { ToastContainer } from 'react-toastify';
import { Typography, Button, Box } from '@mui/material';
import { useUser } from '../../../../context/userContext';
import CodeEditor from '../../../components/CodeEditor/Editor';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const CollabUrl = () => {
  const router = useRouter();
  const { user_id, project_id } = router.query;
  const { logoutUser } = useUser();
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
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
            User Not Verified
            <Button
              onClick={() => {
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
            Project Id is not verified please check project id
            <Button
              onClick={() => {
                logoutUser();
                router.push('/login');
              }}
            >
              Click Here to continue
            </Button>
          </Typography>
        )}
        {verifiedProject && verifiedUser && (
          <>
            <Box display={'flex'}>
              <CodeEditor></CodeEditor>

              <Box marginTop={'50px'} marginLeft={'20px'}>
                <Typography textAlign={'center'}>
                  Add Collaborators and viewers to this project
                </Typography>
                <div>
                  <Button
                    onClick={handleClick}
                    variant="contained"
                    sx={{ background: '#6C63FF' }}
                  >
                    Get Project Link
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Note archived"
                    action={action}
                  />
                </div>
              </Box>
            </Box>
          </>
        )}
      </>
    </>
  );
};
