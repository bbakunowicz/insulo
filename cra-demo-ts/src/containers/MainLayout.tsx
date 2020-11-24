import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import CssBaseline from '@material-ui/core/CssBaseline';
import {MenuLanding, ApplicationBar} from 'insulo-menu';
import Routes from '../pages/routing/Routes';
import MenuWrapper from './MenuWrapper';
import type { History, LocationState } from 'history';

// #Theming(start)
import { useContext } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ThemeContext from 'insulo-theme-provider';
// #Theming(stop)

const history:History<LocationState> = createBrowserHistory();

function Layout() {
  return (
    <Fragment>
      <CssBaseline />
      <ApplicationBar position="fixed">
          Test Application
      </ApplicationBar>
      <Router history={history}>
        <Fragment>
          <MenuWrapper history={history} />
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

  // #Theming(start)
  const { value:themeConfig, actions: themeActions } = useContext(ThemeContext);
  const theme = React.useMemo(() => createMuiTheme(themeActions.getProps(themeConfig.current, themeConfig.type)), [themeConfig, themeActions]);
  // #Theming(stop)

  return (
    <Fragment>
    {/* #Theming(start) */}
    <ThemeProvider theme={theme}>
    {/* #Theming(stop) */}
      <Layout />
    {/* #Theming(start) */}
    </ThemeProvider>
    {/* #Theming(stop) */}
    </Fragment>
  );
}
