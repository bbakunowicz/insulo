// Credit to:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
import React, {useState, useContext, useEffect, Fragment} from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import {AuthContext, authTypes} from 'insulo-route';
import AuthError from './AuthError';
import ErrorList from '../components/ErrorList';
import AlertMessage from '../components/AlertMessage';
import * as axiosConfig from '../config/axios/config';

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

function CustomControl({children, controlId, popoverId, label, type, autocomplete, value, onChange, classes, ariaLabel}) {
  const [anchor, setAnchor] = React.useState(null);

  const popoverOpen = Boolean(anchor);
  
  const popoverIdCnv = popoverOpen ? popoverId : undefined;

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleMouseDown = (event) => {
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

export default function SignIn() {
  const classes = useStyles();  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {value: authConfig, actions: authActions, dispatch: authDispatch} = useContext(AuthContext);
  
  useEffect(() => {
    authDispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_UNSET });
  },[authDispatch]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    authActions.setCredentials({credentials: {username, password}, additionalProps: {authURL: axiosConfig.authURL}});
  }

  if (authConfig.authState === authTypes.AUTH_STATE_LOGINPROGRESS) {
    const authErrorProps = {
      authError: "Authorization is in progress ...",
      authErrorId: "auth_login_inprogress", 
      authErrorSeverity: authTypes.AUTH_SEVERITY_INFO
    }
    return (
      <AuthError {...authErrorProps} />
    )
  }
  else if (authConfig.authState === authTypes.AUTH_STATE_LOGOUTPROGRESS) {
    const authErrorProps = {
      authError: "Logging out in progress ...",
      authErrorId: "auth_logout_inprogress", 
      authErrorSeverity: authTypes.AUTH_SEVERITY_INFO
    }
    return (
      <AuthError {...authErrorProps} />
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
          Sign In
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <CustomControl controlId="username-with-info" popoverId="username-popover" label="Username" type="text" 
            autocomplete="username" value={username} onChange={setUsername} classes={classes} 
            ariaLabel="acceptable values are: user or admin" >
            <Typography className={classes.popover}>
              Use one of the predefined username values:<br />"<strong>john@test.com</strong>" or "<strong>bob@test.com</strong>".
            </Typography>
          </CustomControl>
          <CustomControl controlId="password-with-info" popoverId="password-popover" label="Password" type="password" 
            autocomplete="current-password" value={password} onChange={setPassword} classes={classes} 
            ariaLabel="enter any non-empty (preferably complicated) string" >
            <Typography className={classes.popover}>
              Use the following password value: "<strong>fakepassword</strong>"
            </Typography>
          </CustomControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
     </div>
    </Container>
    {(Array.isArray(authConfig.authError) && authConfig.authError.length > 0) &&
      <Box mt={4}>
        <Container component="main" maxWidth="sm">
          { (roles.length > 0) && (
            <Box mt={1}>
              <AlertMessage severity="info" >
              <span>
                  User is already authenticated, current roles are: "<strong>{`${roles.join(', ')}`}</strong>"
                </span>
              </AlertMessage>
            </Box>)
          }
          {ErrorList("error", authConfig.authError)}
        </Container>
      </Box>
    }
    <Box mt={5}>
      <Copyright />
    </Box>
  </Fragment>
  );
}