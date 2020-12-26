// Credit to:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
import React, {useContext, Fragment, Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import AuthConfigProvider, {AuthContext, authTypes} from 'insulo-route';
import LoginSuspense from './LoginSuspense';
import type { History, LocationState } from 'history';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignOut({history, location}:
  {history: History<LocationState>, location: any}) {

  const classes = useStyles();  
  const {actions: authActions, value: authConfig} = useContext(AuthContext);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
  
    const route = (typeof location == 'object' && typeof location.state == 'object' && typeof location.state.forward == 'string')?
      location.state.forward : undefined;
  
      authActions.clearCredentials({history, route, additionalProps: {async: authConfig.authValues.asyncSignIn}});
  }

  if (authConfig.authState === authTypes.AUTH_STATE_LOGINPROGRESS || authConfig.authState === authTypes.AUTH_STATE_LOGOUTPROGRESS) {
    return (
      <LoginSuspense />
    )
  }

  if (authConfig.authState === authTypes.AUTH_STATE_SET) {
    return (
      <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Out
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Out
            </Button>
          </form>
        </div>
      </Container>
      <Container component="main" maxWidth="lg">
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      </Fragment>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Alert severity="error">
        Authentication error.
      </Alert>
    </Container>
  );
}