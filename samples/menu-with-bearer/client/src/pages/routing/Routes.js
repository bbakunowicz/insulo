import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {ProtectedRoute} from 'insulo-route';
import Page from '../Page';
import DataPage from '../DataPage';
import LoginPage from '../LoginPage';
import LogoutPage from '../LogoutPage';
// import DataRoutes from './DataRoutes'; 

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Page} />
      <Route exact path="/item1" render={(p) => <Page text='Item 1' linkText= 'Go to "Item 2"' link='/item2' {...p} />} />
      <ProtectedRoute exact path="/item2" component={Page} componentProps={{text:'Item 2', linkText: 'Go to "Item 1"', link: '/item1'}} 
          authProps={{roles: ['user']}} authError={'"Item 2" requires authorization.'}/>
      <ProtectedRoute exact path="/data" component={DataPage} 
            authProps={{roles: ['user']}} authError={'"Sample Data" requires authorization.'}/>
      <ProtectedRoute exact path="/item3" component={Page} componentProps={{text:'Item 3'}} redirectRoute="/login" 
        authProps={{roles: ['user']}} authError={'"Item 3" requires authorization.'}/>
      <ProtectedRoute exact path="/subitem1" component={Page} componentProps={{text:'Subtem 1'}} redirectRoute="/login" 
        authProps={{roles: ['user']}} authError={'"Subitem 1" requires authorization.'}/>
      <ProtectedRoute exact path="/subitem2-1" component={Page} componentProps={{text:'Subtem 2-1'}} redirectRoute="/login" 
        authProps={{roles: ['user']}} authError={'"Subitem 2-1" requires authorization.'}/>
      <ProtectedRoute exact path="/subitem2-2" component={Page} componentProps={{text:'Subtem 2-2'}} redirectRoute="/login" 
        authProps={{roles: ['user']}} authError={'"Subitem 2-2" requires authorization.'}/>
      <ProtectedRoute exact path="/subitem3" component={Page} componentProps={{text:'Subtem 3'}} redirectRoute="/login" 
        authProps={{roles: ['user']}} authError={'"Subitem 3" requires authorization.'}/>
      <ProtectedRoute exact path="/login" component={LoginPage} forwardRoute="/item1" 
        authProps={{unauthenticated: true}} />
      <ProtectedRoute exact path="/logout" component={LogoutPage} forwardUnauthorizedRoute="/item1" 
        authProps={{roles: ['user']}} />
      <Route render={() => <Page text="Default route"/>} />
    </Switch>
  )
};

export default Routes;
