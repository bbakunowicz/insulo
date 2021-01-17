import React, { Fragment, useContext } from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApplicationBar, Landing } from 'insulo-menu';
import { AuthContext } from 'insulo-route';
import Routes from '../pages/routing/Routes';

export default function MainLayout() {
  const { value: authConfig } = useContext(AuthContext);

  return (
    <Fragment>
      <CssBaseline />
      <ApplicationBar position="fixed">
          Test Application
      </ApplicationBar>
      <Landing itemVibilityValues={authConfig.authValues} >
        <Route render={(props) => <Routes {...props} />} />
      </Landing>
    </Fragment>
  );
}
