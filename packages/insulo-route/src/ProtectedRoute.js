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
import { Context as AuthContext } from './provider/auth/providerWrapper';
import * as authTypes from "./provider/auth/types";

export function ProtectedRoute({authProps, getPageVisibility, component: Component, componentProps, redirectRoute,  
  forwardRoute, forwardAuthorizedRoute, forwardUnauthorizedRoute, authError, authErrorId, authErrorSeverity, AuthErrorPage, path, location, ...rest}) {

  const { value: authConfig } = useContext(AuthContext);
  const { authValues, authIncarnation, redirectWhenInvalidCredentails } = authConfig;
  const { value: routeConfig } = useContext(RoutingContext);
  const redirectCnv = redirectRoute || routeConfig.defaultRedirect;
  const isInvoker = location && typeof location == "object" && location.state && typeof location.state == "object" && location.state.invoker === path;
  const forwardAuthorizedRouteCnv = forwardAuthorizedRoute || forwardRoute;
  const forwardUnauthorizedRouteCnv = forwardUnauthorizedRoute;


  if (window._INSULO_DEBUG_ === true) {
    console.log('ProtectedRoute (start) ----------------------------------------------------------------------------');
    console.log(`ProtectedRoute: path=${path}`);
    console.log(`ProtectedRoute: redirectRoute=${redirectCnv}, forwardAuthorizedRoute=${forwardAuthorizedRouteCnv}, forwardUnauthorizedRoute=${forwardUnauthorizedRoute}, redirectWhenInvalidCredentails=${redirectWhenInvalidCredentails}`);
    console.log(`ProtectedRoute: authIncarnation=${authIncarnation}, isInvoker=${isInvoker}`);
    console.log(`ProtectedRoute: location = `);
    console.log(location);
    console.log(`ProtectedRoute: authProps = `);
    console.log(authProps);
    console.log(`ProtectedRoute: authValues = `);
    console.log(authValues);
    console.log(`ProtectedRoute: rest = `);
    console.log(rest);
  }

  const getPageVisibilityCnv = getPageVisibility || routeConfig.getPageVisibility;
  const AuthErrorCnv = AuthErrorPage || routeConfig.AuthErrorPage || AuthError;

  if (authConfig.inloadingState) {
    const errorProps = {
      authError: "Initializing the authorization values ...",
      authErrorId: authTypes.AUTH_ERROR_INITIALIZING,
      authErrorSeverity: authTypes.AUTH_SEVERITY_INFO
    }

    if (window._INSULO_DEBUG_ === true) {
      console.log(`ProtectedRoute: Initializing the authorization values ...`);
      console.log(errorProps);
      console.log('ProtectedRoute (end) ------------------------------------------------------------------------------');
    }

    return <AuthErrorCnv {...errorProps} />;
  }
  
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

  let redirectProps = { to: {} };

  if (isInvoker && authValues && location.state.return !== path && location.state.incarnation !== authIncarnation) {
    redirectProps =  {
      to: {
        state: undefined,
        pathname: location.state.return
      }
    }
  }

  if (!isAuthenticated && !isInvoker && redirectCnv && redirectCnv !== path && (!authValues || redirectWhenInvalidCredentails)) {
    redirectProps =   {
      to: {
        state: {
          authError, authErrorId, authErrorSeverity,
          return: path,
          invoker: redirectCnv,
          incarnation: authIncarnation
        },
        pathname: redirectCnv
      }
    }
  }

  const props = {path, location, ...rest};

  return (
    <Route {...props} render={(props) => {

      const mergedProps = {...componentProps, ...props};

      if (window._INSULO_DEBUG_ === true) {
        console.log(`ProtectedRoute: redirectProps.to.pathname = ${redirectProps.to.pathname}, `);
        console.log('ProtectedRoute: redirectProps =');
        console.log(redirectProps);
        console.log(`ProtectedRoute: isAuthenticated = ${isAuthenticated}`);

        if (forwardUnauthorizedRouteCnv && forwardUnauthorizedRouteCnv !== path && !isInvoker && !authValues) {
          console.log(`ProtectedRoute, forwarding unauthorized: props.history.push(${forwardUnauthorizedRouteCnv})`);
        }
        else if (redirectProps.to.pathname) {
          console.log('ProtectedRoute, redirecting: Redirect {...redirectProps}');
        }
        else if (forwardAuthorizedRouteCnv && forwardAuthorizedRouteCnv !== path && !isInvoker && authValues) {
          console.log(`ProtectedRoute, forwarding authorized: props.history.push(${forwardAuthorizedRouteCnv})`);
        }
        else if (isAuthenticated ) {
          console.log('ProtectedRoute, invoking: Component {...mergedProps}, mergedProps =');
          console.log(mergedProps);
        }
        else {
          console.log('ProtectedRoute, invoking: <AuthError></AuthError>, authError =');
          console.log((authError) ? authError: (location.state) && location.state.authError);
          console.log('authErrorId =');
          console.log((authErrorId) ? authErrorId: (location.state) && location.state.authErrorId);
          console.log('authErrorSeverity =');
          console.log((authErrorSeverity) ? authErrorSeverity: (location.state) && location.state.authErrorSeverity);
        }
        console.log('ProtectedRoute (end) ------------------------------------------------------------------------------');
      }

      if (forwardUnauthorizedRouteCnv && forwardUnauthorizedRouteCnv !== path && !isInvoker && !authValues) {
        return <Redirect to={{pathname: forwardUnauthorizedRouteCnv}} />;  
      }

      if (redirectProps.to.pathname) {
        return <Redirect {...redirectProps} />;  
      }

      if (forwardAuthorizedRouteCnv && forwardAuthorizedRouteCnv !== path && !isInvoker && authValues) {
        return <Redirect to={{pathname: forwardAuthorizedRouteCnv}} />;  
      }
      
      if (isAuthenticated) {
        return <Component {...mergedProps}/>;
      }

      const errorProps = {
        authError: (authError) ? authError : (location && location.state) ? location.state.authError : undefined,
        authErrorId: (authErrorId) ? authErrorId : (location && location.state) ? location.state.authErrorId : undefined,
        authErrorSeverity: (authErrorSeverity) ? authErrorSeverity : (location && location.state) ? location.state.authErrorSeverity : undefined
      }
  
      return <AuthErrorCnv {...errorProps} />;
    }}/>
  )
}
