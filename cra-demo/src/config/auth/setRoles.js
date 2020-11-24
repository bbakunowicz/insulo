import {authTypes} from 'insulo-route';

// The setRoles function prepares authValues used in /src/app/config/menu/items/getItemVisibility 
// or /src/app/config/routing/getPageVisibility 
export const setRoles = async (credentials, dispatch) => {
  if (window._INSULO_DEBUG_ === true) console.log('setRoles: start timeout 3000');
  let promise = new Promise((resolve, reject) => {
    if (typeof credentials != 'object' || typeof dispatch != 'function') return reject();

    const username = credentials.username;
    const password = credentials.password;

    setTimeout(() => { 
      if (typeof username == 'string' && typeof password == 'string' && password.length > 0){
        if (username === 'user') {
          dispatch({type: authTypes.SET_AUTH_VALUES, authValues: {roles: ['user']}});
          return resolve(undefined)
        }
        else if (username === 'admin') {
          dispatch({type: authTypes.SET_AUTH_VALUES, authValues: {roles: ['user', 'admin']}});
          return resolve(undefined)
        }
      }

      dispatch({type: authTypes.SET_AUTH_VALUES, authValues: {}});
      return reject();
      
    }, 3000)
  });
  return promise;
}

export const clearRoles = async (dispatch) => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => { 
      dispatch({type: authTypes.SET_AUTH_VALUES, authValues: {roles: []}})
      return resolve(undefined);
    }, 3000)
  });
  return promise;
}
