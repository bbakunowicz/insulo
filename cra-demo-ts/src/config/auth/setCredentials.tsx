import {authTypes} from 'insulo-route';

// The setCredentials function prepares authValues used in config/menu/items/getItemVisibility or in config/routing/getPageVisibility 
export const setCredentials = (credentials: {username:string, password:string}, 
  dispatch:({type,authValues}:{type: string, authValues: any})=>void, additionalProps: {async: boolean}):Promise<void>|void => {
  if (additionalProps.async === true ) {
    return setCredentialsAsync(credentials, dispatch);
  }
  else {
    return setCredentialsSync(credentials, dispatch);
  }
}

// You don't need to wrap this async function in a sync function, it's just for this example purpose
// You can use this function directly in config/auth/initial.js
export const setCredentialsAsync = async (credentials: {username:string, password:string}, 
  dispatch: ({type,authValues}:{type: string, authValues: any})=>void):Promise<void> => {
  let promise = new Promise<void>((resolve, reject) => {
    if (typeof credentials != 'object' || typeof dispatch != 'function') return reject();

    const username = credentials.username;
    const password = credentials.password;

    setTimeout(() => { 
      if (typeof username == 'string' && typeof password == 'string' && password.length > 0){
        if (username === 'user') {
          // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
          dispatch({type: authTypes.SET_AUTH_VALUES, authValues: {roles: ['user'], asyncSignIn: true}});
          return resolve(undefined)
        }
        else if (username === 'admin') {
          // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
          dispatch({type: authTypes.SET_AUTH_VALUES, authValues: {roles: ['user', 'admin'], asyncSignIn: true}});
          return resolve(undefined)
        }
      }

      return reject({message: 'Wrong username or empty password. (async)'});
      
    }, 3000)
  });
  return promise;
}

export const setCredentialsSync = (credentials: {username:string, password:string}, 
  dispatch: ({type,authValues}:{type: string, authValues: any})=>void):void => {
  if (typeof credentials != 'object' || typeof dispatch != 'function') return;

  const username = credentials.username;
  const password = credentials.password;

  if (typeof username == 'string' && typeof password == 'string' && password.length > 0){
    if (username === 'user') {
      // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
      dispatch({type: authTypes.SET_AUTH_VALUES, authValues: {roles: ['user']}});
    }
    else if (username === 'admin') {
      // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
      dispatch({type: authTypes.SET_AUTH_VALUES, authValues: {roles: ['user', 'admin']}});
    }
  }
  else {
    throw new Error('Wrong username or empty password. (sync)');
  }
}

export const clearCredentials = (dispatch: ({type, authValues}:{type: string, authValues: any})=>void, 
  additionalProps: {async?: boolean}): Promise<void>|void => {
  if (additionalProps.async === true ){
    return clearCredentialsAsync(dispatch);
  }
  else {
    return clearCredentialsSync(dispatch);
  }
}

export const clearCredentialsAsync = async (dispatch: ({type,authValues}:{type: string, authValues: any})=>void):Promise<void> => {
  let promise = new Promise<void>((resolve, reject) => {
    setTimeout(() => { 
      dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined})
      return resolve(undefined);
    }, 3000)
  });
  return promise;
}

export const clearCredentialsSync = (dispatch: ({type,authValues}:{type: string, authValues: any})=>void): void => {
  dispatch({type: authTypes.SET_AUTH_VALUES, authValues: undefined});
}
