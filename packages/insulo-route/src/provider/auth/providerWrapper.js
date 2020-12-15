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

const setCredentialsFunc = (dispatch, setCredentialsWrk) => ({credentials, history, route}) => {
  if (window._INSULO_DEBUG_ === true) {
    console.log(`setCredentialsFunc: route=${route}, credentials:`);
    console.log(credentials);
  }

  const setAuthStateSet = () => {
    if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: AUTH_STATE_SET`);
    dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_SET});

    if (typeof route == 'string' && typeof history == 'object') {
      if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: history.push: route=${route}`);
      history.push(route);
    } 
  }

  if (typeof setCredentialsWrk != 'function') {
    if (window._INSULO_DEBUG_ === true) console.error(`setCredentialsFunc: setCredentialsWrk is not a function`);
    console.error(`setCredentialsFunc: setCredentialsWrk is not a function`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, 
      authError: {message: 'setCredentials is not a function'}});
    //dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_ERROR});
    return;
  }

  try {
    const promise = setCredentialsWrk(credentials, dispatch);

    if (promise && typeof promise.then === 'function' && promise[Symbol.toStringTag] === 'Promise') {
      if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: AUTH_STATE_LOGINPROGRESS`);
      dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_LOGINPROGRESS});
    
      promise
      .then(result => {
        setAuthStateSet();
      })
      .catch(error => {throw error});
    }
    else {
      setAuthStateSet();
    }
  }
  catch (error) {
    if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: SET_AUTH_VALUES, AUTH_STATE_ERROR`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, authError: error});
    // if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: AUTH_STATE_ERROR`);
    // dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_ERROR, error});
  }
}

const clearCredentialsFunc = (dispatch, initValue) => ({history, route}) => {
  if (window._INSULO_DEBUG_ === true) console.log(`clearCredentialsFunc: route=${route}`);

  const setAuthStateUnset = () => {
    if (window._INSULO_DEBUG_ === true) console.log(`clearCredentialsFunc, AUTH_STATE_UNSET`);
    dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_UNSET});

    if (typeof route == 'string' && typeof history == 'object') {
      if (window._INSULO_DEBUG_ === true) console.log(`clearCredentialsFunc: history.push: route=${route}`);
      history.push(route);
    }
  }

  const clearRolesWrk = initValue.clearCredentials;

  if (initValue.clearCredentialsImmediately === true) {
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined});
  }

  if (typeof clearRolesWrk != 'function') {
    if (window._INSULO_DEBUG_ === true) console.error(`clearCredentialsFunc: clearCredentials is not a function`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, 
      authError: {message: 'clearCredentials is not a function'}});
    // dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_ERROR});
    return;
  }

  try {
    const promise = clearRolesWrk(dispatch);

    if (promise && typeof promise.then === 'function' && promise[Symbol.toStringTag] === 'Promise') {
      if (window._INSULO_DEBUG_ === true) console.log(`clearRoles: AUTH_STATE_LOGOUTPROGRESS`);
      dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_LOGOUTPROGRESS});
        
      promise
      .then(result => {
        setAuthStateUnset();
      })
      .catch(error => {throw error});
    }
    else {
      setAuthStateUnset();
    }
  }
  catch (error) {
    if (window._INSULO_DEBUG_ === true) console.log(`clearCredentialsFunc: SET_AUTH_VALUES, AUTH_STATE_ERROR`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, authError: error});
    // if (window._INSULO_DEBUG_ === true) console.log(`clearCredentialsFunc, AUTH_STATE_ERROR`);
    // dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_ERROR, error});
  }
}

export const AuthConfigProvider = ({ children, initValue }) => {
  const [value, dispatch] = useReducer(reducer, {...initValue, authValues: undefined, authState: authTypes.AUTH_STATE_UNSET});

  const setCredentials = setCredentialsFunc(dispatch,initValue.setCredentials);
  const clearCredentials = clearCredentialsFunc(dispatch,initValue);

  return Provider({children, Context, value, dispatch, actions: {setCredentials, clearCredentials}});
}
