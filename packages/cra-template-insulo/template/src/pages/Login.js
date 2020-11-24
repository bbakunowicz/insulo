// Credit to:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
import React, {useState, useContext, Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert, AlertTitle } from '@material-ui/lab';
import {AuthContext, AuthStateContext, authTypes} from 'insulo-route';
import LoginSuspense from './LoginSuspense';

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
  alerts: {
    width: '100%',
    '& > *': {
        marginTop: theme.spacing(2),
    },
  },
}));

// In order to use custom Authentication & Authorization without helper method "setCredentials" you can dispatch actions like: 
// dispatchState({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_LOGINPROGRESS});
// authDispatch({type: authTypes.SET_AUTH_VALUES, authValues: {roles: ['user', 'admin']}});
// dispatchState({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_SET});
// history.push(location.state.forward);

const handleSubmit = (actions, username, password, authDispatch, dispatchState, location, history) => (evt) => {
  evt.preventDefault();
  if (window._INSULO_DEBUG_ === true) console.log(`Login, (handleSubmit): forward=${location.state.forward}`);
  
  const route = (typeof location == 'object' && typeof location.state == 'object' && typeof location.state.forward == 'string')?
    location.state.forward : undefined;
  actions.setCredentials({credentials: {username, password}, dispatchState, history, route});

  if (window._INSULO_DEBUG_ === true) console.log('Login, (handleSubmit): end');
}

export default function SignIn({history, location, ...params}) {

  const classes = useStyles();  
  const {value: authConfig, actions: authActions, dispatch: authDispatch} = useContext(AuthContext);
  const {value: authStateConfig, dispatch: authStateDispatch} = useContext(AuthStateContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (authStateConfig.authState === authTypes.AUTH_STATE_LOGINPROGRESS || authStateConfig.authState === authTypes.AUTH_STATE_LOGOUTPROGRESS) {
    return (
      <LoginSuspense />
    )
  }

  const roles = (typeof authConfig.authValues == 'object' && Array.isArray(authConfig.authValues.roles))?authConfig.authValues.roles:[]; 
  return (
    <Fragment>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(
            authActions, username, password, authDispatch, authStateDispatch, location, history)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    <Container component="main" maxWidth="md">
      <div className={classes.alerts}>
      { authStateConfig.authState === authTypes.AUTH_STATE_ERROR &&
        <Alert severity="error">
          Autorization error - wrong username or empty password.<br />
          Use: <strong>user</strong> or <strong>admin</strong> as username and <strong>any string</strong> as password.
        </Alert>
      } 
      <Alert severity="info">
        <AlertTitle>Use for authorization:</AlertTitle>
          Username: <strong>user</strong>, Password: <strong>{"<any_string>"}</strong> or
          Username: <strong>admin</strong>, Password: <strong>{"<any_string>"}</strong>
      </Alert>
      { (roles.length > 0) && (
        <Alert severity="warning">
          <AlertTitle>User is already authenticated</AlertTitle>
            Current roles are: "<strong>{`${roles.join(', ')}`}</strong>".
            {typeof location.state.authError === 'string' && location.state.authError}
        </Alert>
      )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </Fragment>
  );
}