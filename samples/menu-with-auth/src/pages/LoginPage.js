import React, { useContext } from 'react';
import { AuthContext } from 'insulo-route';
import Button from '@material-ui/core/Button';

const LoginPage = () => {
  const {actions: authActions } = useContext(AuthContext);

  const onClick = (event, user) => {
    event.preventDefault();
    authActions.setCredentials({credentials: {username: user}});
  }

  return (
    <Button variant="contained" color="primary" onClick={(evt) => onClick(evt, 'user')} >Authorize as "user"</Button>
  )
}

export default LoginPage;