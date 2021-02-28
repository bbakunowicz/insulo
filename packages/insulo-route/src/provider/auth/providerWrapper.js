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
import useLocalStorage from './localStorage';

export const Context = createContext();

const saveInLocalStorage = (authValuesKey, authValuesStr) => {
  if (window._INSULO_DEBUG_ === true) {
    console.log(`saveInLocalStorage: authValuesKey=${authValuesKey}, authValuesStr=${authValuesStr}`);
  }

  localStorage.setItem(authValuesKey, authValuesStr);
}
const removeFromLocalStorage = (authValuesKey) => {
  if (window._INSULO_DEBUG_ === true) {
    console.log(`removeFromLocalStorage`);
  }

  localStorage.removeItem(authValuesKey);
}

const setCredentialsFunc = (dispatch, initValue) => ({authValuesStr, credentials, additionalProps}={}) => {
  if (window._INSULO_DEBUG_ === true) {
    console.log(`setCredentialsFunc: authValuesStr=${authValuesStr}, credentials:`);
    console.log(credentials);
    console.log(`setCredentialsFunc: additionalProps:`);
    console.log(additionalProps);
  }

  const authValuesKey = initValue.authValuesKey || authTypes.LS_AUTH_VALUES;
  
  const setAuthStateError = (error) => {
    if (window._INSULO_DEBUG_ === true) {
      console.error('setCredentialsFunc: setAuthStateError, authError = ',error);
    }
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, authError: error});
    removeFromLocalStorage(authValuesKey);
  }

  const saveAuthValues = (authValues) => {
    try {
      const saveAuthValuesEncodeWrk = typeof initValue == 'object' && initValue.saveAuthValuesEncode;
  
      if (typeof saveAuthValuesEncodeWrk != 'function') {
        if (window._INSULO_DEBUG_ === true) console.error(`setCredentialsFunc: saveAuthValuesEncode is not a function`);
        return;
      }
  
      const retval = saveAuthValuesEncodeWrk({authValues});
  
      if (retval && typeof retval.then === 'function' && retval[Symbol.toStringTag] === 'Promise') {
        retval
        .then(result => {
          saveInLocalStorage(authValuesKey, result);
        })
        .catch(error => {
          // async exceptions
          console.error(`setCredentialsFunc: saveAuthValues error: ${error.message}`);
        });
      }
      else {
        saveInLocalStorage(authValuesKey, retval);
      }
    }
    catch (error) {
      // sync exceptions
      console.error(`setCredentialsFunc: saveAuthValues error: ${error.message}`);
    }
  }

  const setAuthStateSet = (result) => {
    if (window._INSULO_DEBUG_ === true) { 
      console.log(`setCredentialsFunc: setAuthStateSet, authValues = `);
      console.log(result);
    }

    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: result, authState: authTypes.AUTH_STATE_SET});

    if (!authValuesStr && initValue.saveAuthValues === true) {
      if (result) {
        saveAuthValues(result);
      }
      else {
        setAuthStateError({message: "Auth values undefined."})
      }
    }

  }

  try {
    const setCredentialsWrk = typeof initValue == 'object' && (authValuesStr)? initValue.saveAuthValuesDecode : initValue.setCredentials;
    const setCredentialsParams = (authValuesStr)? {authValuesStr} : {credentials, additionalProps};

    if (typeof setCredentialsWrk != 'function') {
      if (window._INSULO_DEBUG_ === true) {
        if (authValuesStr) {
          console.error(`setCredentialsFunc: saveAuthValuesDecode is not a function`);
        }
        else {
          console.error(`setCredentialsFunc: setCredentials is not a function`);
        }
      }
      dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, 
        authError: {message: 'setCredentials is not a function'}});
      removeFromLocalStorage(authValuesKey);
      return;
    }

    const retval = setCredentialsWrk(setCredentialsParams);

    if (retval && typeof retval.then === 'function' && retval[Symbol.toStringTag] === 'Promise') {
      if (window._INSULO_DEBUG_ === true) console.log(`setCredentialsFunc: AUTH_STATE_LOGINPROGRESS`);
      dispatch({type: authTypes.SET_AUTH_STATE, authState: authTypes.AUTH_STATE_LOGINPROGRESS});
    
      retval
      .then(result => {
        setAuthStateSet(result);
      })
      .catch(error => {
        if (window._INSULO_DEBUG_ === true) {
          console.error('setCredentialsFunc: async exception');
        }      
        setAuthStateError(error);
      });
    }
    else {
      setAuthStateSet(retval);
    }
  }
  catch (error) {
    // sync exceptions
    if (window._INSULO_DEBUG_ === true) {
      console.error('setCredentialsFunc: sync exception');
    }      
    setAuthStateError(error);
  }
}

const clearCredentialsFunc = (dispatch, initValue) => ({additionalProps}={}) => {
  if (window._INSULO_DEBUG_ === true) {
    console.log(`clearCredentialsFunc: additionalProps:`);
    console.log(additionalProps);
  }

  const authValuesKey = initValue.authValuesKey || authTypes.LS_AUTH_VALUES;

  const setAuthStateUnset = () => {
    if (window._INSULO_DEBUG_ === true) console.log(`clearCredentialsFunc: setAuthStateUnset`);

    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_UNSET});

    removeFromLocalStorage(authValuesKey);
  }

  const setAuthStateError = (error) => {
    if (window._INSULO_DEBUG_ === true) {
      console.error(`clearCredentialsFunc: setAuthStateError, error = `);
      console.error(error);
    }

    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, authError: error});
    removeFromLocalStorage(authValuesKey);
  }

  dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_UNSET});
  removeFromLocalStorage(authValuesKey);

  const clearCredentialsWrk = typeof initValue == 'object' && initValue.clearCredentials;

  if (typeof clearCredentialsWrk != 'function') {
    if (window._INSULO_DEBUG_ === true) console.info(`clearCredentialsFunc: clearCredentials is not a function`);
    dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined, authState: authTypes.AUTH_STATE_ERROR, 
      authError: {message: 'clearCredentials is not a function'}});
    removeFromLocalStorage(authValuesKey);
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
      .catch(error => {
        if (window._INSULO_DEBUG_ === true) {
          console.error('clearCredentialsFunc: async exception');
        }      
        setAuthStateError(error)
      });
    }
    else {
      if (window._INSULO_DEBUG_ === true) {
        console.error('clearCredentialsFunc: sync exception');
      }      
    setAuthStateUnset(retval);
    }
  }
  catch (error) {
    setAuthStateError(error)
  }
}

export const AuthConfigProvider = ({ children, initValue }) => {
  const [value, dispatch] = useReducer(reducer, {...initValue, authValues: undefined, authState: authTypes.AUTH_STATE_UNSET, 
    inloadingState: initValue.saveAuthValues === true, authIncarnation: 0});
    
  const setCredentials = setCredentialsFunc(dispatch,initValue);
  const clearCredentials = clearCredentialsFunc(dispatch,initValue);
  
  useLocalStorage(value, dispatch, setCredentials);

  return Provider({children, Context, value, dispatch, actions: {setCredentials, clearCredentials}});
}
