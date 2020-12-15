import {setRoles, clearRoles} from './setRoles';
// sync version:
// import {setRolesSync, clearRolesSync} from './setRoles';

export default { 
  setCredentials: setRoles,
  clearCredentials: clearRoles,
  // sync version:
  // setCredentials: setRolesSync,
  // clearCredentials: clearRolesSync,
  clearCredentialsImmediately: false
}
