import {setCredentials, clearCredentials} from './setCredentials';
import type {AuthProviderInitValues} from 'insulo-route';

const init:AuthProviderInitValues = { 
  setCredentials,         
  clearCredentials,       
  redirectWhenInvalidCredentails: false,
  saveAuthValues: true,          // if you don't need to preserve the ceredentials after page refresh, set this value to false
  saveAuthValuesDecode: ({authValuesStr}:{authValuesStr: string}):any => JSON.parse(authValuesStr),
  saveAuthValuesEncode: ({authValues}:{authValues: any}):string => JSON.stringify(authValues)
}

export default init;
