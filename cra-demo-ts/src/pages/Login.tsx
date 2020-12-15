// Credit to:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
import React, {useState, useContext, Fragment} from 'react';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
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
  margin: {
    marginBottom: theme.spacing(1),
  },
  popover: {
    padding: theme.spacing(2),
  },
}));


export default function SignIn({history, location}:{history: History<LocationState>, location: any}) {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const classes = useStyles();  
  const {value: authConfig, actions: authActions} = useContext(AuthContext);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (window._INSULO_DEBUG_ === true) console.log(`Login, (handleSubmit): forward=${location.state.forward}`);
    
    const route = (typeof location == 'object' && typeof location.state == 'object' && typeof location.state.forward == 'string')?
      location.state.forward : undefined;
      authActions.setCredentials({credentials: {username, password}, history, route});
  
    if (window._INSULO_DEBUG_ === true) console.log('Login, (handleSubmit): end');
  }


  if (authConfig.authState === authTypes.AUTH_STATE_LOGINPROGRESS || authConfig.authState === authTypes.AUTH_STATE_LOGOUTPROGRESS) {
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
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <CustomControl controlId="username-with-info" popoverId="username-popover" label="Username" type="text" 
            autocomplete="username" value={username} onChange={setUsername} classes={classes} 
            ariaLabel="acceptable values are: user or admin" >
            <Typography className={classes.popover}>
              Use one of the predefined username values:<br />"<strong>user</strong>"" or "<strong>admin</strong>".
            </Typography>
          </CustomControl>
          <CustomControl controlId="password-with-info" popoverId="password-popover" label="Password" type="password" 
            autocomplete="current-password" value={password} onChange={setPassword} classes={classes} 
            ariaLabel="enter any non-empty (preferably complicated) string" >
            <Typography className={classes.popover}>
              Enter any non-empty (preferably complicated) string.
            </Typography>
          </CustomControl>
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
    <Container component="main" maxWidth="xs">
      <div className={classes.alerts}>
      { authConfig.authState === authTypes.AUTH_STATE_ERROR &&
        <Alert severity="error">
          Autorization error - wrong username or empty password.<br />
          Use: <strong>user</strong> or <strong>admin</strong> as username and <strong>any string</strong> as password.
        </Alert>
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