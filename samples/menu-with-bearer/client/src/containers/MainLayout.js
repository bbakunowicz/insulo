import React, { Fragment, useContext } from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApplicationBar, Landing } from 'insulo-menu';
import { AuthContext } from 'insulo-route';
import Routes from '../pages/routing/Routes';
import DataProvider from '../contexts/DataProvider';
//import SampleData from '../contexts/SampleData';

export default function MainLayout() {
  const { value: authConfig, actions: authActions } = useContext(AuthContext);

  return (
    <Fragment>
      <CssBaseline />
      <ApplicationBar position="fixed">
          Test Application
      </ApplicationBar>
      <Landing itemVibilityValues={authConfig.authValues} >
        <DataProvider authActions={authActions}>
          <Route render={(props) => <Routes {...props} />} />
        </DataProvider>
      </Landing>
    </Fragment>
  );
}
