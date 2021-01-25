# insulo-route

An **insulo-route** package is part of the Insulo components library. The other packages belonging to Insulo project are: **insulo-locale-provider**, **insulo-menu**, **insulo-theme-provider**.

Insulo components are a collection of components designed to rapidly build [React-based](https://reactjs.org/) applications. Insulo components are based on the [material-ui](https://material-ui.com/) library. They use [React hooks](https://reactjs.org/docs/hooks-intro.html), in terms of state management. 

More information can be found on the [Insulo project](https://github.com/bbakunowicz/insulo) website. Basic examples can also be found on the [insulo-menu page](https://www.npmjs.com/package/insulo-menu).

# Example #1 (route only)

## Installation

```
npx create-react-app test-route-only
cd test-route-only
yarn add @material-ui/core @material-ui/icons insulo-route react-router-dom
```

## Adding sample code

The contents of the *src/App.js* file should look like this:

```jsx
// src/App.js
import React, { Fragment, useContext } from 'react';
import {RouteConfigProvider, AuthConfigProvider, AuthContext,ProtectedRoute} from 'insulo-route';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

const getPageVisibility = (authValues, authProps) => {
  return authProps.unauthenticated === true || 
    ((authValues) && authValues.authorized === authProps.required) || 
    ((authValues) && Array.isArray(authProps.required) && authProps.required.findIndex((r)=>{return r === authValues.authorized}) > -1);
}

const routingConfig = { 
  // defaultRedirect: "/login",
  getPageVisibility
}

const authConfig = { 
  clearCredentialsImmediately: true,
  redirectWhenInvalidCredentails: false,
  saveAuthValues: true,          // if you don't need to preserve the ceredentials after page refresh, set this value to false
  saveAuthValuesDecode: ({authValuesStr}) => JSON.parse(authValuesStr),
  saveAuthValuesEncode: ({authValues}) => JSON.stringify(authValues),
  setCredentials: ({credentials, additionalProps}) => {
    return {authorized: credentials.username}
  },
}

const Page = ({text}) => {
  return (<Fragment><h1>{text}</h1>{text}</Fragment>);
}

const LoginPage = () => {
  const {actions: authActions } = useContext(AuthContext);

  const onClick = (event, user) => {
    event.preventDefault();
    authActions.setCredentials({credentials: {username: user}});
  }

  return (
    <div>
      <button onClick={(evt) => onClick(evt, 'user3')} style={{margin: '2em'}} >Authorize as "user3"</button>
      <button onClick={(evt) => onClick(evt, 'user4')} style={{margin: '2em'}} >Authorize as "user4"</button>
    </div>
  )
}

const LogoutPage = () => {
  const {actions: authActions } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    authActions.clearCredentials({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <button type="submit" style={{margin: '2em'}} >Clear credentials</button>
    </form>);
}

export default function App () {
  return (
    <RouteConfigProvider initValue={routingConfig}>
      <AuthConfigProvider initValue={authConfig}>
        <Router history={history}>
          <Switch>
            <Route exact path="/item1" render={() => <Page text="Item 1" />} />
            <ProtectedRoute exact path="/item2" component={Page} componentProps={{text:'Item 2'}} 
              authProps={{required: 'user3'}} authError={'"Item 2" requires authorization.'}/>
            <ProtectedRoute exact path="/item3" component={Page} componentProps={{text:'Item 3'}} redirectRoute="/login" 
              authProps={{required: 'user3'}} authError={'"Item 3" requires authorization.'}/>
            <ProtectedRoute exact path="/item4" component={Page} componentProps={{text:'Item 4'}} redirectRoute="/login" 
              authProps={{required: 'user4'}} authError={'"Item 4" requires authorization.'}/>
            <ProtectedRoute exact path="/login" component={LoginPage} forwardRoute="/item1" 
              authProps={{unauthenticated: true}} />
            <ProtectedRoute exact path="/logout" component={LogoutPage} forwardUnauthorizedRoute="/item1" 
              authProps={{required: ['user3','user4']}} />
            <Route render={() => <Page text="Default route"/>} />
          </Switch>
        </Router>
      </AuthConfigProvider>
    </RouteConfigProvider>
  );
}
```

## Usage

```
yarn start
```
Try the following urls in the browser's address bar:
- http://localhost:3000
- http://localhost:3000/item1
- http://localhost:3000/item2
- http://localhost:3000/item3
- http://localhost:3000/item4
- http://localhost:3000/login
- http://localhost:3000/logout




<br/>

# Example #2 (menu with ProtectedRoute component)

## Installation

```
npx create-react-app test-menu-with-auth
cd test-menu-with-auth
yarn add @material-ui/core @material-ui/icons insulo-menu insulo-route react-icons react-router-dom
```
## Adding sample code

The contents of the *src/App.js* file should look like this:

```jsx
// src/App.js
import React, { Fragment, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import {RouteConfigProvider, AuthConfigProvider, AuthContext,ProtectedRoute} from 'insulo-route';
import { menuTypes, MenuProvider, ApplicationBar, Landing } from 'insulo-menu';
import Button from '@material-ui/core/Button';
import { ViewList, ViewCompact, ViewStream, ViewColumn } from '@material-ui/icons';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const getPageVisibility = (authValues, authProps) => {
  return authProps.unauthenticated === true || 
    ((authValues) && authValues.authorized === authProps.required) || 
    ((authValues) && Array.isArray(authProps.required) && authProps.required.findIndex((r)=>{return r === authValues.authorized}) > -1);
}

const getItemVisibility = (authValues, authProps) => {
  if (typeof authProps != 'object') return true;
  if (authProps.unauthenticated === true && authValues) return false;
  return getPageVisibility(authValues, authProps);
}

const Page = ({text}) => {
  return (<Fragment><h1>{text}</h1>{text}</Fragment>);
}

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

const routingConfig = { 
  defaultRedirect: "/login",
  getPageVisibility
}

const authConfig = { 
  clearCredentialsImmediately: true,
  redirectWhenInvalidCredentails: false,
  saveAuthValues: true,          // if you don't need to preserve the ceredentials after page refresh, set this value to false
  saveAuthValuesDecode: ({authValuesStr}) => JSON.parse(authValuesStr),
  saveAuthValuesEncode: ({authValues}) => JSON.stringify(authValues),
  setCredentials: ({credentials, additionalProps}) => {
    return {authorized: credentials.username}
  },
}

const menuConfig = {
  variant: menuTypes.TEMPORARY,
  availableVariants: [menuTypes.PERSISTENT, menuTypes.TEMPORARY, menuTypes.MINIMIZED],
  width: "20em",
  anchor: menuTypes.MENU_LEFT,
  getItemVisibility, 
  items: [
    {
      caption: "Item 1",
      icon: <ViewList/>,
      route: "/item1",
      altRoute: "/",
    },
    {
      caption: "Item 2",
      icon: <ViewCompact/>,
      route: "/item2",
    },
    {
      caption: "Hidden Submenu",
      icon: <ViewStream/>,
      authProps: {required: ['user']},
      items: [
        {
          caption: "Subitem 1",
          route: "/subitem1",
          icon: <ViewList/>,
        },
        {
          caption: "Submenu 2",
          icon: <ViewStream/>,
          items: [
            {
              caption: "Subitem 2-1",
              route: "/subitem2-1",
              icon: <ViewList/>,
            },
            {
              caption: "Subitem 2-2",
              route: "/subitem2-2",
              icon: <ViewCompact/>,
            },
          ]
        },
        {
          caption: "Subitem 3",
          route: "/subitem3",
          icon: <ViewColumn/>,
        },
      ],
    },
    {
      caption: "Item 3",
      icon: <ViewColumn/>,
      route: "/item3",
      authProps: {required: ['user']},
    },
    {
      type: 'divider'
    },
    {
      caption: "Sign In",
      captionId: "item_sign_in",
      authProps: {unauthenticated: true},
      icon: <FaSignInAlt />,
      route: "/login",
    },
    {
      caption: "Sign Out",
      captionId: "item_sign_out",
      authProps: {required: ['user']},
      icon: <FaSignOutAlt />,
      route: "/logout",
    }
  ]
};

function Layout () {
  const { value: authConfig } = useContext(AuthContext);

  return (
    <Fragment>
      <ApplicationBar>
          Test Application
      </ApplicationBar>
      <Landing itemVibilityValues={authConfig.authValues} >
        <Switch>
          <Route exact path="/" render={() => <Page text="Item 1" />} />
          <Route exact path="/item1" render={() => <Page text="Item 1" />} />
          <ProtectedRoute exact path="/item2" component={Page} componentProps={{text:'Item 2'}} 
              authProps={{required: 'user'}} authError={'"Item 2" requires authorization.'}/>
          <ProtectedRoute exact path="/item3" component={Page} componentProps={{text:'Item 3'}} redirectRoute="/login" 
            authProps={{required: ['user']}} authError={'"Item 3" requires authorization.'}/>
          <ProtectedRoute exact path="/subitem1" component={Page} componentProps={{text:'Subtem 1'}} redirectRoute="/login" 
            authProps={{required: 'user'}} authError={'"Subitem 1" requires authorization.'}/>
          <ProtectedRoute exact path="/subitem2-1" component={Page} componentProps={{text:'Subtem 2-1'}} redirectRoute="/login" 
            authProps={{required: ['user']}} authError={'"Subitem 2-1" requires authorization.'}/>
          <ProtectedRoute exact path="/subitem2-2" component={Page} componentProps={{text:'Subtem 2-2'}} redirectRoute="/login" 
            authProps={{required: 'user'}} authError={'"Subitem 2-2" requires authorization.'}/>
          <ProtectedRoute exact path="/subitem3" component={Page} componentProps={{text:'Subtem 3'}} redirectRoute="/login" 
            authProps={{required: ['user']}} authError={'"Subitem 3" requires authorization.'}/>
          <ProtectedRoute exact path="/login" component={LoginPage} forwardRoute="/item1" 
            authProps={{unauthenticated: true}} />
          <ProtectedRoute exact path="/logout" component={LogoutPage} forwardUnauthorizedRoute="/item1" 
            authProps={{required: ['user']}} />
          <Route render={() => <Page text="Default route"/>} />
        </Switch>
      </Landing>
    </Fragment>
  );
}

export default function App () {

  return (
    <RouteConfigProvider initValue={routingConfig}>
      <AuthConfigProvider initValue={authConfig}>
        <MenuProvider initValue={menuConfig}>
          <Layout />
        </MenuProvider>
      </AuthConfigProvider>
    </RouteConfigProvider>
  );
}
```

## Usage

```
yarn start
```
