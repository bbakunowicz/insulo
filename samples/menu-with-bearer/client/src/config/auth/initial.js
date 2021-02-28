import setCredentials from './setCredentials';

export default { 
  redirectWhenInvalidCredentails: false,
  saveAuthValues: true,          // if you don't need to preserve the ceredentials after page refresh, set this value to false
  saveAuthValuesDecode: ({authValuesStr}) => JSON.parse(authValuesStr),
  saveAuthValuesEncode: ({authValues}) => JSON.stringify(authValues),
  setCredentials,
  authValuesKey: "insulo:auth:menu-with-bearer"
}
  