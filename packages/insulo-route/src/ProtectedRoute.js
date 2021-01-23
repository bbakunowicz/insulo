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
  }

  const getPageVisibilityCnv = getPageVisibility || routeConfig.getPageVisibility;
  const AuthErrorCnv = AuthErrorPage || routeConfig.AuthErrorPage || AuthError;

  if (authConfig.inloadingState) {
    if (window._INSULO_DEBUG_ === true) {
      console.log(`ProtectedRoute: AuthErrorCnv (Loading the authorization values)`);
      console.log('ProtectedRoute (end) ------------------------------------------------------------------------------');
    }
    return <AuthErrorCnv authError={"Initializing the authorization values ..."} //authErrorId={authTypes.AUTH_ERROR_INITIALIZING} 
      authErrorSeverity={authTypes.AUTH_SEVERITY_INFO}/>;
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

  let redirectProps = (isInvoker) ?
  {
    to: {
      state: undefined,
      pathname: (location.state.return !== path && location.state.incarnation !== authIncarnation)? location.state.return : undefined
    }
  }:
  {
    to: {
      state: {
        authError, authErrorId, authErrorSeverity,
        return: (redirectCnv !== path) ? path : undefined, 
        invoker: (redirectCnv !== path) ? redirectCnv: undefined,
        incarnation: authIncarnation
      }
    }
  };

  if (!isInvoker && redirectCnv !== path) {
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

  const props = {path, location, ...rest};

  return (
    <Route {...props} render={(props) => {

      let mergedProps = {...componentProps, ...props};
  
      if (window._INSULO_DEBUG_ === true) {
        console.log(`ProtectedRoute: redirectProps.to.pathname = ${redirectProps.to.pathname}, `);
        console.log('ProtectedRoute: redirectProps =');
        console.log(redirectProps);
        console.log(`ProtectedRoute: isAuthenticated = ${isAuthenticated}`);

        if (forwardUnauthorizedRouteCnv && forwardUnauthorizedRouteCnv !== path && !isInvoker && !authValues) {
          console.log(`ProtectedRoute, invoking forward unauthorized: props.history.push(${forwardUnauthorizedRouteCnv})`);
        }
        else if (redirectProps.to.pathname) {
          console.log('ProtectedRoute, invoking redirect: Redirect {...redirectProps}');
        }
        else if (forwardAuthorizedRouteCnv && forwardAuthorizedRouteCnv !== path && !isInvoker && authValues) {
          console.log(`ProtectedRoute, invoking forward authorized: props.history.push(${forwardAuthorizedRouteCnv})`);
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
      else if (isAuthenticated) {
        return <Component {...mergedProps}/>;
      }
      else {
        const authErrorCnv = (authError) ? authError : (location && location.state) ? location.state.authError : undefined;
        const authErrorIdCnv = (authErrorId) ? authErrorId : (location && location.state) ? location.state.authErrorId : undefined;
        const authErrorSeverityCnv = (authErrorSeverity) ? authErrorSeverity : (location && location.state) ? location.state.authErrorSeverity : undefined;
        return <AuthErrorCnv authError={authErrorCnv} authErrorId={authErrorIdCnv} authErrorSeverity={authErrorSeverityCnv}/>;
      }
    }}/>
  )
}
