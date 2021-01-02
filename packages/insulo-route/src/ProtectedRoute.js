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

import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context as RoutingContext } from './provider/route/providerWrapper';
import AuthError from './AuthError';
import { Context as AuthContext } from './provider/auth/providerWrapper';
import * as authTypes from "./provider/auth/types";

export function ProtectedRoute({authProps, getPageVisibility, component: Component, componentProps, redirectRoute,  
  forwardRoute, authError, AuthErrorPage, path, ...rest}) {

    const { value: authConfig, dispatch: authDispatch } = useContext(AuthContext);
    const { authValues, authReturnRoute, redirectWhenInvalidCredentails } = authConfig;

    // useEffect(() => {
    //   if (authReturnRoute === path) {
    //     authDispatch({type: authTypes.SET_RETURN_ROUTE, authReturnRoute: undefined});
    //   }
    // },[authDispatch, authReturnRoute, path]);

    if (window._INSULO_DEBUG_ === true) {
      console.log('ProtectedRoute (start) ------------------------------------------------------------------------------------');
      console.log(`ProtectedRoute: path = ${path}, authProps = `);
      console.log(authProps);
      console.log(`ProtectedRoute: authConfig = `);
      console.log(authConfig);
      console.log(`ProtectedRoute: authReturnRoute = ${authReturnRoute}, forwardRoute = ${forwardRoute}`);
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
    const forwardCnv = forwardRoute || routeConfig.defaultForward;
    let redirectProps = {
      to: {
        state: {forward: forwardCnv, authError, return: (forwardRoute !== path) && path}
      }
    };

    if (authReturnRoute && authReturnRoute !== path) {
      redirectProps.to.pathname = authReturnRoute;
    }
    else {
      if (redirectWhenInvalidCredentails) {
        if (!isAuthenticated && redirectCnv && redirectCnv !== path) {
          redirectProps.to.pathname = redirectCnv;
        }
      }
      else {
        if (!authValues && redirectCnv && redirectCnv !== path) {
          redirectProps.to.pathname = redirectCnv;
        }
      }
    }

    useEffect(() => {
      if (authReturnRoute) {
        authDispatch({type: authTypes.CLEAR_RETURN_ROUTE});
      }
    },[authDispatch, authReturnRoute]);

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

          if (redirectProps.to.pathname) {
            console.log('ProtectedRoute, invoking: Redirect {...redirectProps}, redirectProps =');
            console.log(redirectProps);
          }
          else if (isAuthenticated ) {
              console.log('ProtectedRoute, invoking: Component {...mergedProps}, mergedProps =');
            console.log(mergedProps);
          }
          else {
            console.log('ProtectedRoute, invoking: <AuthError></AuthError>, authError =');
            console.log((authError) ? authError: (rest.location.state.authError) && rest.location.state.authError);
          }
          console.log('ProtectedRoute (end) ------------------------------------------------------------------------------------');
        }

        return (redirectProps.to.pathname)?<Redirect {...redirectProps} />:
          (isAuthenticated)?<Component {...mergedProps}/> :
          <AuthErrorCnv authError={(authError) ? authError: (rest.location.state.authError) && rest.location.state.authError} />;
        }
      } />
    );
}
