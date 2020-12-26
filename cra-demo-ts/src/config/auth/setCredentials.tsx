type Credentials = {username:string, password:string};
type AdditionalProps = {async?: boolean};
type InputValues = {credentials: Credentials, additionalProps?: AdditionalProps};
type InputValuesClear = {additionalProps?: AdditionalProps};
type AuthValues = {roles: string[], asyncSignIn?: boolean}|undefined;

// The setCredentials function prepares authValues used in config/menu/items/getItemVisibility or in config/routing/getPageVisibility 
export const setCredentials = ({credentials, additionalProps}: InputValues):Promise<AuthValues>|AuthValues => {
  if (typeof additionalProps == 'object' && additionalProps.async === true ) {
    return setCredentialsAsync(credentials);
  }
  else {
    return setCredentialsSync(credentials);
  }
}

// You don't need to wrap this async function in a sync function, it's just for this example purpose
// You can use this function directly in config/auth/initial.js
export const setCredentialsAsync = async (credentials: Credentials):Promise<AuthValues> => {
  let promise = new Promise<AuthValues>((resolve, reject) => {
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

export const setCredentialsSync = (credentials: Credentials):AuthValues => {
  if (credentials.username && credentials.password) {
    if (credentials.username === 'user') {
      // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
      return {roles: ['user']};
    }
    else if (credentials.username === 'admin') {
      // authValues properties are at your choice, you can use for example: {groups: ['users', 'admins']}
      return {roles: ['user', 'admin']};
    }
  }
  else {
    throw new Error('Wrong username or empty password. (sync)');
  }
}

export const clearCredentials = ({additionalProps}:InputValuesClear): Promise<undefined>|undefined => {
  if (typeof additionalProps == 'object' && additionalProps.async === true ) {
    return clearCredentialsAsync();
  }
  else {
    return clearCredentialsSync();
  }
}

export const clearCredentialsAsync = async ():Promise<undefined> => {
  let promise = new Promise<undefined>((resolve, reject) => {
    setTimeout(() => { 
      resolve(undefined);
    }, 3000)
  });
  return promise;
}

export const clearCredentialsSync = (): undefined => {
  return undefined;
}
