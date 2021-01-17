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
