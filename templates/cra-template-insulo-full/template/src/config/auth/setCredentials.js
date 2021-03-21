// The setCredentials function prepares authValues used in src/config/menu/items/getItemVisibility or in src/config/routing/getPageVisibility 
export const setCredentials = ({credentials, additionalProps}) => {
  if (typeof additionalProps == 'object' && additionalProps.async === true ) {
    return setCredentialsAsync(credentials);
  }
  else {
    return setCredentialsSync(credentials);
  }
}

// You don't need to wrap this async function in a sync function, it's just for this example purpose
// You can use this function directly in src/config/auth/initial.js
export const setCredentialsAsync = async (credentials) => {
  let promise = new Promise((resolve, reject) => {

    setTimeout(() => { 
      if (credentials.username && credentials.password) {
        if (credentials.username === 'user') {
          // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
          resolve({roles: ['user'], asyncSignIn: true});
        }
        else if (credentials.username === 'admin') {
          // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
          resolve({roles: ['user', 'admin'], asyncSignIn: true});
        }
      }

      reject(new Error('Wrong username or empty password. (async)'));
      
    }, 3000)
  });
  return promise;
}

export const setCredentialsSync = (credentials) => {
  if (credentials.password && credentials.username === 'user') {
    // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
    return {roles: ['user']};
  }
  else if (credentials.password && credentials.username === 'admin') {
    // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
    return {roles: ['user', 'admin']};
  }
  else {
    throw new Error('Wrong username or empty password. (sync)');
  }
}

export const clearCredentials = ({additionalProps}) => {
  if (typeof additionalProps == 'object' && additionalProps.async === true ) {
    return clearCredentialsAsync();
  }
  else {
    return clearCredentialsSync();
  }
}

// You don't need to wrap this async function in a sync function, it's just for this example purpose
// You can use this function directly in src/config/auth/initial.js
export const clearCredentialsAsync = async () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => { 
      resolve();
    }, 3000)
  });
  return promise;
}

export const clearCredentialsSync = () => {}
