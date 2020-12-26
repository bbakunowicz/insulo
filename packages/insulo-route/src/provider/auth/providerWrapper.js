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

const setCredentialsFunc = (dispatch, setCredentialsWrk) => ({credentials, history, route, additionalProps}) => {
  if (window._INSULO_DEBUG_ === true) {
    console.log(`setCredentialsFunc: route=${route}, credentials:`);
    console.log(credentials);
    console.log(`setCredentialsFunc: additionalProps:`);
    console.log(additionalProps);
  }

  const setAuthStateSet = (result) => {
    if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: setAuthStateSet, authValues:`);
    if (window._INSULO_DEBUG_ === true) console.log(result);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: result, authState: authTypes.AUTH_STATE_SET});

    if (typeof route == 'string' && typeof history == 'object') {
      if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: history.push: route=${route}`);
      history.push(route);
    } 
  }

  const setAuthStateError = (error) => {
    if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: setAuthStateError, error = ${error}`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, authError: error});
  }

  if (typeof setCredentialsWrk != 'function') {
    if (window._INSULO_DEBUG_ === true) console.error(`setCredentialsFunc: setCredentialsWrk is not a function`);
    console.error(`setCredentialsFunc: setCredentialsWrk is not a function`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, 
      authError: {message: 'setCredentials is not a function'}});
    return;
  }

  try {
    const retval = setCredentialsWrk({credentials, additionalProps});

    if (retval && typeof retval.then === 'function' && retval[Symbol.toStringTag] === 'Promise') {
      if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: AUTH_STATE_LOGINPROGRESS`);
      dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_LOGINPROGRESS});
    
      retval
      .then(result => {
        setAuthStateSet(result);
      })
      .catch(error => {
        // async exceptions
        setAuthStateError(error);
      });
    }
    else {
      setAuthStateSet(retval);
    }
  }
  catch (error) {
    // sync exceptions
    setAuthStateError(error);
  }
}

const clearCredentialsFunc = (dispatch, initValue) => ({history, route, additionalProps}) => {
  if (window._INSULO_DEBUG_ === true) console.log(`clearCredentialsFunc: route=${route}, additionalProps:`);
  if (window._INSULO_DEBUG_ === true) console.log(additionalProps);

  const setAuthStateUnset = () => {
    if (window._INSULO_DEBUG_ === true) console.log(`clearCredentialsFunc: setAuthStateUnset`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_UNSET});

    if (typeof route == 'string' && typeof history == 'object') {
      if (window._INSULO_DEBUG_ === true) console.log(`clearCredentialsFunc: history.push: route=${route}`);
      history.push(route);
    }
  }

  const setAuthStateError = (error) => {
    if (window._INSULO_DEBUG_ === true) console.log(`clearCredentialsFunc: setAuthStateError, error = ${error}`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, authError: error});
  }

  const clearCredentialsWrk = initValue.clearCredentials;

  if (initValue.clearCredentialsImmediately === true) {
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_UNSET});
  }

  if (typeof clearCredentialsWrk != 'function') {
    if (window._INSULO_DEBUG_ === true) console.error(`clearCredentialsFunc: clearCredentials is not a function`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, 
      authError: {message: 'clearCredentials is not a function'}});
    return;
  }

  try {
    const retval = clearCredentialsWrk({additionalProps});

    if (retval && typeof retval.then === 'function' && retval[Symbol.toStringTag] === 'Promise') {
      if (window._INSULO_DEBUG_ === true) console.log(`clearRoles: AUTH_STATE_LOGOUTPROGRESS`);
      dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_LOGOUTPROGRESS});
        
      retval
      .then(result => {
        setAuthStateUnset(result);
      })
      .catch(error => {setAuthStateError(error)});
    }
    else {
      setAuthStateUnset(retval);
    }
  }
  catch (error) {
    setAuthStateError(error)
  }
}

export const AuthConfigProvider = ({ children, initValue }) => {
  const [value, dispatch] = useReducer(reducer, {...initValue, authValues: undefined, authState: authTypes.AUTH_STATE_UNSET});

  const setCredentials = setCredentialsFunc(dispatch,initValue.setCredentials);
  const clearCredentials = clearCredentialsFunc(dispatch,initValue);

  return Provider({children, Context, value, dispatch, actions: {setCredentials, clearCredentials}});
}
