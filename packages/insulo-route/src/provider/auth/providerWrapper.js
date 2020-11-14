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

import { createContext, useReducer } from "react";
import Provider from '../provider';
import { reducer } from "./reducer";
import * as authTypes from "./types";

export const Context = createContext();

const setCredentialsFunc = (dispatch, setCredentialsWrk) => ({credentials, dispatchState, history, route}) => {
  if (window._INSULO_DEBUG_ === true) {
    console.log(`setCredentialsFunc: route=${route}, dispatchState = ${dispatchState}, credentials:`);
    console.log(credentials);
  }

  const dispatchStateSet = typeof dispatchState == 'function';

  if (typeof setCredentialsWrk != 'function' || setCredentialsWrk.constructor.name !== "AsyncFunction") {
    if (window._INSULO_DEBUG_ === true) console.error(`setCredentialsFunc: setCredentialsWrk is not an AsyncFunction`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: {}});
    dispatchStateSet && dispatchState({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_ERROR});
  }

  if (dispatchStateSet) {
    if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: AUTH_STATE_LOGINPROGRESS`);
    dispatchState({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_LOGINPROGRESS});
  }

  (async (credentials, dispatch) => {
    try {
      await setCredentialsWrk(credentials, dispatch);
      if (dispatchStateSet) {
        if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: AUTH_STATE_SET`);
        dispatchState({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_SET});
      }

      if (typeof route == 'string' && typeof history == 'object') {
        if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: history.push: route=${route}`);
        history.push(route);
      }
    }
    catch (err) {
      if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc, SET_AUTH_VALUES`);
      dispatch({type: authTypes.SET_AUTH_VALUES, authValues: {}});
      if (dispatchStateSet) {
        if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: AUTH_STATE_ERROR`);
        dispatchState({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_ERROR});
      }
    }
  })(credentials, dispatch);
}

const clearCredentialsFunc = (dispatch, initValue) => ({dispatchState, history, route}) => {
  if (window._INSULO_DEBUG_ === true) console.log(`clearRoles: route=${route}, dispatchState = ${dispatchState}`);

  const clearRolesWrk = initValue.clearCredentials;

  const dispatchStateSet = typeof dispatchState == 'function';

  if (initValue.clearCredentialsImmediately === true) {
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined});
  }

  if (typeof clearRolesWrk != 'function' || clearRolesWrk.constructor.name !== "AsyncFunction") {
    if (window._INSULO_DEBUG_ === true) console.error(`clearRoles: clearRolesWrk is not an AsyncFunction`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined});
    dispatchStateSet && dispatchState({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_ERROR});
  }

  if (dispatchStateSet) { 
    if (window._INSULO_DEBUG_ === true) console.log(`clearRoles: AUTH_STATE_LOGOUTPROGRESS`);
    dispatchState({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_LOGOUTPROGRESS});
  }

  try {
    (async (dispatch) => {
      await clearRolesWrk(dispatch);

      if (dispatchStateSet) { 
        if (window._INSULO_DEBUG_ === true) console.log(`clearRoles, AUTH_STATE_UNSET`);
        dispatchState({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_UNSET});
      }

      if (typeof route == 'string' && typeof history == 'object') {
        if (window._INSULO_DEBUG_ === true) console.log(`clearRoles: history.push: route=${route}`);
        history.push(route);
      }
      
    })(dispatch);
  }
  catch(err) {
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined});
    if (dispatchStateSet) { 
      if (window._INSULO_DEBUG_ === true) console.log(`clearRoles, AUTH_STATE_ERROR`);
      dispatchState({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_ERROR});
    }
  }
}

export const AuthConfigProvider = ({ children, initValue }) => {
  const [value, dispatch] = useReducer(reducer, {...initValue});

  const setCredentials = (typeof initValue.setCredentials == 'function')? setCredentialsFunc(dispatch,initValue.setCredentials) : undefined;
  const clearCredentials = (typeof initValue.clearCredentials == 'function') ? clearCredentialsFunc(dispatch,initValue) : undefined;

  return Provider({children, Context, value, dispatch, actions: {setCredentials, clearCredentials}});
}
