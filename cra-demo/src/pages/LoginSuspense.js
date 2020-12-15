// Credit to:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
import React, {useContext, Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import {AuthContext, authTypes} from 'insulo-route';

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


export default function LoginSuspense() {

  const classes = useStyles();  
  const {value: authConfig} = useContext(AuthContext);

  if (window._INSULO_DEBUG_ === true) console.log(`LoginSuspense, authConfig.authState = ${authConfig.authState}`);

  if (authConfig.authState !== authTypes.AUTH_STATE_SET && authConfig.authState !== authTypes.AUTH_STATE_UNSET && 
    authConfig.authState !== authTypes.AUTH_STATE_ERROR ) {
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {authConfig.authState === authTypes.AUTH_STATE_LOGINPROGRESS ?
              <LockOutlinedIcon /> :
              <LockOpenOutlinedIcon />
            }
          </Avatar>
          <Typography component="h1" variant="h5">
            {authConfig.authState === authTypes.AUTH_STATE_LOGINPROGRESS ? "Signing in" : "Signing out"}
          </Typography>
          <div style={{margin: "2em"}}>
            <CircularProgress color="secondary" />
          </div>
          <Typography component="h2" variant="h6">
          {authConfig.authState === authTypes.AUTH_STATE_LOGINPROGRESS ? 
            "Simulation of authorization (wait 3 seconds) ..." : "Simulation of signing out (wait 3 seconds) ..."}
          </Typography>
        </div>
      </Container>
    )
  }

  return (
    <Fragment>Error?</Fragment>
  )

}