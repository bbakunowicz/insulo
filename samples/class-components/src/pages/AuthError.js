// Credit to:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { authTypes } from "insulo-route";
// #Localization(start)
import {withLocale} from 'insulo-locale-provider';
// #Localization(stop)

const styles = theme => ({
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
});

class AuthError extends Component {
  render() {
    const {classes, authError, authErrorId, authErrorSeverity} = this.props;  

    let authErrorCnv = authError;
    let authTitleCnv = (authErrorSeverity === authTypes.AUTH_SEVERITY_INFO)?"Authorization Info":"Authorization Error";
  
    // #Localization(start)
    const {value: localeConfig} = this.props.localeContext;
    
    if (localeConfig.currentLocale && typeof localeConfig.locales == 'object' && 
      typeof localeConfig.locales[localeConfig.currentLocale] == 'object') {
      if (authErrorId && localeConfig.locales[localeConfig.currentLocale][authErrorId]) {
        authErrorCnv = localeConfig.locales[localeConfig.currentLocale][authErrorId];
      } 
  
      if (localeConfig.locales[localeConfig.currentLocale][authErrorSeverity || authTypes.AUTH_SEVERITY_ERROR]) {
        authTitleCnv = localeConfig.locales[localeConfig.currentLocale][authErrorSeverity || authTypes.AUTH_SEVERITY_ERROR];
      }
  
      console.log(`authTitleCnv = ${authTitleCnv}`);
    }
    // #Localization(stop)
  
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">{authTitleCnv}</Typography><br />
          { (authError) &&
          <Typography component="h2" variant="h6">{authErrorCnv}</Typography>
          }
        </div>
      </Container>
    )
  }
}

AuthError.propTypes = {
  classes: PropTypes.object.isRequired,
  authError: PropTypes.string, 
  authErrorId: PropTypes.string, 
  authErrorSeverity: PropTypes.string,
  localeContext: PropTypes.object.isRequired
};

export default withStyles(styles)(withLocale(AuthError));