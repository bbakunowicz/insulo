import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import CssBaseline from '@material-ui/core/CssBaseline';
import {MenuLanding, ApplicationBar} from 'insulo-menu';
import Routes from '../pages/routing/Routes';
import {Menu} from 'insulo-menu';

const history = createBrowserHistory();

function Layout() {
  return (
    <Fragment>
      <CssBaseline />
      <ApplicationBar position="fixed">
          Test Application
      </ApplicationBar>
      <Router history={history}>
        <Fragment>
          <Menu history={history} />
          <MenuLanding>
            <Switch>
              <Route render={(props) => <Routes {...props} />} />
            </Switch>
          </MenuLanding>
        </Fragment>
      </Router>
    </Fragment>
  )
}

export default function MainLayout() {

  return (
    <Fragment>
      <Layout />
    </Fragment>
  );
}
