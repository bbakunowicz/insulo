import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApplicationBar, Landing } from 'insulo-menu';
import Routes from '../pages/routing/Routes';

export default function MainLayout() {
  return (
    <Fragment>
      <CssBaseline />
      <ApplicationBar position="fixed">
          Test Application
      </ApplicationBar>
      <Landing >
        <Route render={(props) => <Routes {...props} />} />
      </Landing>
    </Fragment>
  );
}
