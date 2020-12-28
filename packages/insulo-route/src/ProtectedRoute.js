/*************************************************************************
   Copyright 2020 Bartosz Bakunowicz

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
***************************************************************************/

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context as RoutingContext } from './provider/route/providerWrapper';
import AuthError from './AuthError';

export function ProtectedRoute({authProps, authValues, getPageVisibility, component: Component, componentProps, redirectRoute,  
  forwardRoute, authError, AuthErrorPage, path, ...rest}) {

    if (window._INSULO_DEBUG_ === true) {
      console.log('ProtectedRoute (start) ------------------------------------------------------------------------------------');
      console.log(`ProtectedRoute: path = ${path}, authValues = `);
      console.log(authValues);
      console.log(`ProtectedRoute: authProps = `);
      console.log(authProps);
      console.log(`ProtectedRoute: rest = `);
      console.log(rest);
    }

    const { value: routeConfig } = useContext(RoutingContext);
    const getPageVisibilityCnv = getPageVisibility || routeConfig.getPageVisibility;
    const AuthErrorCnv = AuthErrorPage || routeConfig.AuthErrorPage || AuthError;
    
    let isAuthenticated = false;
    if (typeof getPageVisibilityCnv == 'function') {
        try {
          isAuthenticated = getPageVisibilityCnv(authValues, authProps);
        }
        catch (e) {
          console.error(`getPageVisibility error: ${e.message}`);
        }

      if (typeof isAuthenticated != 'boolean') {
        isAuthenticated = false;
      }
    }

    const redirectCnv = redirectRoute || routeConfig.defaultRedirect;
    const forwardCnv = forwardRoute || path || routeConfig.defaultForward;
    let redirectProps = {
      to: {
        state: {forward: forwardCnv, authError}
      }
    };
    if (redirectCnv !== path) {
      redirectProps.to.pathname = redirectCnv;
    }

    const props = {path, ...rest};

    return (
      <Route {...props} render={(props) => {
        let mergedProps = {...componentProps, ...props};
        if (forwardCnv){
          if (typeof mergedProps.location == 'object') {
            if (typeof mergedProps.location.state == 'undefined') {
              mergedProps.location.state = {};
            }
            if (!mergedProps.location.state.forward) {
              mergedProps.location.state.forward = forwardCnv;
            }
          }    
        }

        if (window._INSULO_DEBUG_ === true) {
          console.log(`ProtectedRoute: isAuthenticated = ${isAuthenticated}`);

          if (isAuthenticated ) {
              console.log('ProtectedRoute, invoking: Component {...mergedProps}, mergedProps =');
            console.log(mergedProps);
          }
          else if (redirectProps.to.pathname) {
            console.log('ProtectedRoute, invoking: Redirect {...redirectProps}, redirectProps =');
            console.log(redirectProps);
          }
          else {
            console.log('ProtectedRoute, invoking: <AuthError></AuthError>, authError =');
            console.log((authError) ? authError: (rest.location.state.authError) && rest.location.state.authError);
          }
          console.log('ProtectedRoute (end) ------------------------------------------------------------------------------------');
        }

        return (isAuthenticated) ? 
          <Component {...mergedProps}/> :
          redirectProps.to.pathname ?
            <Redirect {...redirectProps} /> :
            <AuthErrorCnv authError={(authError) ? authError: (rest.location.state.authError) && rest.location.state.authError} />
        }
      } />
    );
}
