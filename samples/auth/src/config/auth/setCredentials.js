// pepares authValues consumed in src/config/menu/items/getItemVisibility or src/config/routing/getItemVisibility 
export const setCredentials = ({credentials}) => {
  if (credentials.username && credentials.password && ['user','admin'].indexOf(credentials.username) > -1){
    return credentials.username;
  }
  throw new Error('Wrong username or empty password.');
}

export const clearCredentials = () => {}
