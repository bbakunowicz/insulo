import {setCredentials, clearCredentials} from './setCredentials';

export default { 
  setCredentials,         //You can use setCredentialsAsync or setCredentialsSync directly here
  clearCredentials,       //You can use clearCredentialsAsync or clearCredentialsSync directly here
  clearCredentialsImmediately: false,
  redirectWhenInvalidCredentails: false
}
