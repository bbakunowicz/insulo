import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Subitem from '../Subitem';
import Dashboard from '../Dashboard';
import Calories from '../Calories';
// #Authentication(start)
// import Login from '../Login';
// import Logout from '../Logout';
// import {ProtectedRoute} from 'insulo-route';
// #Authentication(stop)

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/calories" component={Calories} />
      <Route exact path="/subitem1-1" render={(props) => <Subitem {...props} title="Item 1-1" title_id='item_1_1' />} />
      <Route exact path="/subitem1-2-1" render={(props) => <Subitem {...props} title="Item 1-2-1" title_id='item_1_2_1' />} />
      <Route exact path="/subitem1-2-2" render={(props) => <Subitem {...props} title="Item 1-2-2" title_id='item_1_2_2' />} />
      <Route exact path="/subitem1-3" render={(props) => <Subitem {...props} title="Item 1-3" title_id='item_1_3' />} />
      {/* #Authentication(start) */}
{/*               
      <ProtectedRoute exact path="/useritem" component={Subitem} componentProps={{title:'User Page', title_id: 'item_user'}} 
        authProps={{roles:['user', 'admin']}} authError="&quot;User's Page&quot; requires an user role."/>
      <ProtectedRoute exact path="/userhiddenitem" component={Subitem} componentProps={{title:"User's Hidden Item", title_id: 'item_user_hidden'}}
        authProps={{roles:['user', 'admin']}} />
      <ProtectedRoute exact path="/adminitem" component={Subitem} componentProps={{title: 'Admin Page', title_id: 'item_admin'}}
        authProps={{roles:['admin']}} authError="&quot;Admin's Page&quot; requires an admin role." authErrorId="autherr_adminitem"/>
      <ProtectedRoute exact path="/subitem2-1" component={Subitem} componentProps={{title: 'Item 2-1', title_id: 'item_2_1'}} 
        authProps={{roles:['admin']}} authError="&quot;Subitem 2-1&quot; requires an admin role." authErrorId="autherr_adminitem"/>
      <ProtectedRoute exact path="/subitem2-2-1" component={Subitem} componentProps={{title: 'Item 2-2-1', title_id: 'item_2_2_1'}} 
        authProps={{roles:['admin']}} authError="&quot;Subitem 2-2-1&quot; requires an admin role." authErrorId="autherr_adminitem"/>
      <ProtectedRoute exact path="/subitem2-2-2" component={Subitem} componentProps={{title: 'Item 2-2-2', title_id: 'item_2_2_2'}} 
        authProps={{roles:['admin']}} authError="&quot;Subitem 2-2-2&quot; requires an admin role." authErrorId="autherr_adminitem"/>
      <ProtectedRoute exact path="/subitem2-3" component={Subitem} componentProps={{title: 'Item 2-3', title_id: 'item_2_3'}} 
        authProps={{roles:['admin']}} authError="&quot;Subitem 2-3&quot; requires an admin role." authErrorId="autherr_adminitem"/>
      <ProtectedRoute exact path="/login" component={Login} forwardAuthorizedRoute="/" 
        authProps={{unauthenticated: true}} />
      <ProtectedRoute exact path="/logout" component={Logout} forwardUnauthorizedRoute="/" 
        authProps={{roles:['user']}} />  */}
      
      {/* #Authentication(stop) */}
      <Route component={Dashboard} />
    </Switch>
  );
};

export default Routes;
