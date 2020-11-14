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

import React, { Fragment, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context as RoutingContext } from './provider/route/providerWrapper';

export function ProtectedRoute({authProps, authId, authValues, component: Component, componentProps, redirectRoute, publicRoute, 
  forwardRoute, authError, path, ...rest}) {
    const RedirectComponent=Redirect;
    const { value: routeConfig } = useContext(RoutingContext);
    
    let isAuthenticated = false;
    let authPropsCnv = typeof authProps == 'object' ? {...authProps}: undefined;
    if (typeof routeConfig.getPageVisibility == 'function' && typeof authValues != 'undefined') {
      if (typeof authPropsCnv == 'undefined') {
        if (typeof routeConfig.authRoute == 'object') {
          if (typeof path == 'string') {
            if (typeof routeConfig.authRoute[path] != 'undefined') {
              authPropsCnv = {...routeConfig.authRoute[path]}
            }
          }
        }
      }

      if (typeof authPropsCnv == 'undefined') {
        if (window._INSULO_DEBUG_ === true) {
          console.log(`ProtectedRoute: authId = ${authId}, routeConfig:`);
          console.log(routeConfig);
        }
        if (typeof routeConfig.authId == 'object' && typeof authId == 'string') {
          if (typeof routeConfig.authId[authId] == 'object' && typeof routeConfig.authId[authId].authProps == 'object') {
            authPropsCnv = {...routeConfig.authId[authId].authProps}
          }
        }
      }

      if (window._INSULO_DEBUG_ === true) {
        console.log(`ProtectedRoute: authValues:`);
        console.log(authValues);
        console.log(`ProtectedRoute: authPropsCnv:`);
        console.log(authPropsCnv);
      }

      if (typeof authPropsCnv != 'undefined') {
        try {
          isAuthenticated = routeConfig.getPageVisibility(authValues, authPropsCnv);
        }
        catch (e) {
          console.error(`getPageVisibility error: ${e.message}`);
        }
      }

      if (typeof isAuthenticated != 'boolean') {
        isAuthenticated = false;
      }

    }

    const redirectCnv = redirectRoute || routeConfig.defaultRedirect;
    const forwardCnv = forwardRoute || path || routeConfig.defaultForward;
    const redirectProps = {
      to: {
        pathname: redirectCnv,
        state: {forward: forwardCnv, authError}
      }
    };

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
          //console.log(`ProtectedRoute: publicRoute = ${publicRoute}, isAuthenticated = ${isAuthenticated}, unauthenticatedRoute = ${unauthenticatedRoute}`);
          console.log(`ProtectedRoute: publicRoute = ${publicRoute}, isAuthenticated = ${isAuthenticated}, authValues:`);
          console.log(authValues);

          // if (publicRoute === true || (isAuthenticated && unauthenticatedRoute !== true) || (!isAuthenticated && unauthenticatedRoute === true)) {
          if (publicRoute === true || isAuthenticated ) {
              console.log('ProtectedRoute, invoking: Component {...mergedProps}, mergedProps:');
            console.log(mergedProps);
          }
          else if (redirectProps.to.pathname) {
            console.log('ProtectedRoute, invoking: RedirectComponent {...redirectProps}, redirectProps:');
            console.log(redirectProps);
          }
          else {
            console.log('ProtectedRoute, invoking: <Fragment></Fragment>');
          }
          console.log('------------------------------------------------------------------------------------');
        }

        // return (publicRoute === true || (isAuthenticated && unauthenticatedRoute !== true) || (!isAuthenticated && unauthenticatedRoute === true)) ? 
        return (publicRoute === true || isAuthenticated) ? 
          <Component {...mergedProps}/> :
          redirectProps.to.pathname ?
            <RedirectComponent {...redirectProps} /> :
            <Fragment></Fragment>
        }
      } />
    );
}
