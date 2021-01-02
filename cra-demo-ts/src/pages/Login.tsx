// Credit to:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
import React, {useState, useContext, Fragment} from 'react';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InfoIcon from '@material-ui/icons/Info';
import { Alert, AlertTitle } from '@material-ui/lab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import {AuthContext, authTypes} from 'insulo-route';
import LoginSuspense from './LoginSuspense';
import type { History, LocationState } from 'history';

type AuthValues = {roles: string[], asyncSignIn?: boolean}|undefined;

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

function CustomControl({children, controlId, popoverId, label, type, autocomplete, value, onChange, classes, ariaLabel}:
  {
    children: JSX.Element[] | JSX.Element;
    controlId: string;
    popoverId: string;
    label: string;
    type: string;
    autocomplete: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    classes: any;
    ariaLabel: string;
  }): JSX.Element {
  const [anchor, setAnchor] = React.useState<EventTarget & HTMLButtonElement | null>(null);

  const popoverOpen = Boolean(anchor);
  
  const popoverIdCnv = popoverOpen ? popoverId : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <FormControl className={clsx(classes.margin)} variant="outlined" fullWidth >
        <InputLabel htmlFor={controlId}>{label}</InputLabel>
        <OutlinedInput
          id={controlId}
          type={type}
          fullWidth
          autoComplete={autocomplete}
          value={value}
          onChange={e => onChange(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                color='primary'
                aria-label={ariaLabel}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                edge="end"
              >
                <InfoIcon />
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>
      <Popover
        id={popoverIdCnv}
        open={popoverOpen}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </Popover>
    </React.Fragment>
  )
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
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  formWithoutMargin: {
    width: '100%',
    marginTop: theme.spacing(-2),
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
  margin: {
    marginBottom: theme.spacing(1),
  },
  popover: {
    padding: theme.spacing(2),
  },
}));


export default function SignIn({history, location}:{history: History<LocationState>, location: any}) {
  const classes = useStyles();  
  
  const {value: authConfig, actions: authActions, dispatch: authDispatch} = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const forwardRoute = typeof location == 'object' && typeof location.state == 'object' && location.state.forward;
  const returnRoute = typeof location == 'object' && typeof location.state == 'object' && location.state.return;
    
  const roles = (typeof authConfig.authValues == 'object' && Array.isArray(authConfig.authValues.roles))?authConfig.authValues.roles:[]; 

  const handleSubmitUsingHelperAsync = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // credentials properties are at your choice, you can use for example: {credentials: "magic_string"}
    // acync: true is only needed for the purposes of this example in order to apply the async sign in version of the setCredentials 
    authActions.setCredentials({credentials: {username, password}, history, forwardRoute, returnRoute, additionalProps: {async: true}});
  }

  const handleSubmitUsingHelperSync = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // credentials properties are at your choice, you can use for example: {credentials: "magic_string"}
    authActions.setCredentials({credentials: {username, password}, history, forwardRoute, returnRoute});
  }

  const handleSubmitAsync = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    authDispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_LOGINPROGRESS});
    
    new Promise<AuthValues>((resolve, reject) => {
      setTimeout(() => { 
        if (password){
          if (username === 'user') {
            // The authValues prepared here are used in config/menu/items/getItemVisibility or in config/routing/getPageVisibility 
            // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
            // async: true is only needed for the purposes of this example in order to apply the async sing out version in the Logout page
            resolve({roles: ['user'], asyncSignIn: true});
          }
          else if (username === 'admin') {
            // The authValues prepared here are used in config/menu/items/getItemVisibility or in config/routing/getPageVisibility 
            // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
            // async: true is only needed for the purposes of this example in order to apply the async sing out version in the Logout page
            resolve({roles: ['user', 'admin'], asyncSignIn: true});
          }
        }
        
        reject(new Error('Wrong username or empty password. (async)'));
        
      }, 3000)
    })
    .then(result => {
      authDispatch({type: authTypes.SET_AUTH_VALUES, authValues: result, authState: authTypes.AUTH_STATE_SET, authReturnRoute: returnRoute});

      if (!returnRoute && forwardRoute) {
        history.push(forwardRoute);
      } 
    })
    .catch(error => {
      authDispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, authError: error});
    })
    
  }

  const handleSubmitSync = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    authDispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_LOGINPROGRESS});

    if (password){
      if (username === 'user') {
        // The authValues prepared here are used in config/menu/items/getItemVisibility or in config/routing/getPageVisibility 
        // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
        authDispatch({type: authTypes.SET_AUTH_VALUES, authValues: {roles: ['user']}, authState: authTypes.AUTH_STATE_SET,
          authReturnRoute: returnRoute});
        if (!returnRoute && forwardRoute) {
          history.push(forwardRoute);
        } 
      }
      else if (username === 'admin') {
        // The authValues prepared here are used in config/menu/items/getItemVisibility or in config/routing/getPageVisibility 
        // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
        authDispatch({type: authTypes.SET_AUTH_VALUES, authValues: {roles: ['user', 'admin']}, authState: authTypes.AUTH_STATE_SET,
          authReturnRoute: returnRoute});
        if (!returnRoute && forwardRoute) {
          history.push(forwardRoute);
        } 
      }
    }
    else {
      authDispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, 
        authError: {message: 'Wrong username or empty password. (sync)'}});
    }
  }

  if (authConfig.authState === authTypes.AUTH_STATE_LOGINPROGRESS || authConfig.authState === authTypes.AUTH_STATE_LOGOUTPROGRESS) {
    return (
      <LoginSuspense />
    )
  }

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
        <form className={classes.form} noValidate onSubmit={handleSubmitUsingHelperAsync}>
          <CustomControl controlId="username-with-info" popoverId="username-popover" label="Username" type="text" 
            autocomplete="username" value={username} onChange={setUsername} classes={classes} 
            ariaLabel="acceptable values are: user or admin" >
            <Typography className={classes.popover}>
              Use one of the predefined username values:<br />"<strong>user</strong> or "<strong>admin</strong>".
            </Typography>
          </CustomControl>
          <CustomControl controlId="password-with-info" popoverId="password-popover" label="Password" type="password" 
            autocomplete="current-password" value={password} onChange={setPassword} classes={classes} 
            ariaLabel="enter any non-empty (preferably complicated) string" >
            <Typography className={classes.popover}>
              Enter any non-empty (preferably complicated) string.
            </Typography>
          </CustomControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In Simulation (async)
          </Button>
        </form>
        <form className={classes.formWithoutMargin} noValidate onSubmit={handleSubmitUsingHelperSync}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In Simulation (sync)
          </Button>
        </form>
        <form className={classes.form} noValidate onSubmit={handleSubmitAsync}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In Simulation (async, without helper)
          </Button>
        </form>
        <form className={classes.formWithoutMargin} noValidate onSubmit={handleSubmitSync}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In Simulation (sync, without helper)
          </Button>
        </form>
     </div>
    </Container>
    <Container component="main" maxWidth="xs">
      <div className={classes.alerts}>
      { (authConfig.authState === authTypes.AUTH_STATE_ERROR && !(typeof authConfig.authError == 'object' && typeof authConfig.authError.message)) && (
          <Alert severity="error">
            <AlertTitle>Autorization error</AlertTitle>
          </Alert>
        )
      }
      { (authConfig.authState === authTypes.AUTH_STATE_ERROR && typeof authConfig.authError == 'object' && typeof authConfig.authError.message) && (
          <Alert severity="error">
            <AlertTitle>Autorization error</AlertTitle>{authConfig.authError.message}
          </Alert>
        )
      }
      { (roles.length > 0) && (
        <Alert severity="warning">
          <AlertTitle>User is already authenticated</AlertTitle>
            Current roles are: "<strong>{`${roles.join(', ')}`}</strong>".
            {typeof location.state.authError === 'string' && <br />}
            {typeof location.state.authError === 'string' && location.state.authError}
        </Alert>
      )}
      </div>
    </Container>
    <Box mt={8}>
      <Copyright />
    </Box>
  </Fragment>
  );
}