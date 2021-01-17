import React, { useContext } from 'react';
import { AuthContext } from 'insulo-route';
import Button from '@material-ui/core/Button';

const LogoutPage = () => {
  const {actions: authActions } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    authActions.clearCredentials({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Button type="submit" variant="contained" color="primary" >Clear credentials</Button>
    </form>);
}

export default LogoutPage;