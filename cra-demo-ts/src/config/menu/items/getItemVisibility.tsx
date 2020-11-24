// The authValues format is up to you, there is no obligation to use the roles property, 
// The value of authValues is prepared in the setRoles function defined in /src/app/config/auth/initial
const getItemVisibility = (authValues:{roles?:string[]}, item:{visibleParams: {roles?:string[],except?:string[]}}):boolean => {
  if (typeof item != 'object' || typeof item.visibleParams != 'object') return true;
  
  let ret = true;
  const roles = item.visibleParams.roles;
  const except = item.visibleParams.except;

  if (Array.isArray(except)) {
    if (typeof authValues == 'object' && Array.isArray(authValues.roles) && authValues.roles.length > 0) {
      for (let i=0; i<except.length; i++){
        if (authValues.roles.find((role)=>{return role === except[i]})) {
          return false;
        }
      }
    }
  }
  else {
    ret = false
    if (Array.isArray(roles) && typeof authValues == 'object' && 
      Array.isArray(authValues.roles) && authValues.roles.length > 0) {
      for (let i=0; i<roles.length; i++){
        if (authValues.roles.find((role)=>{return role === roles[i]})) {
          return true;
        }
      }
    }
  }

  return ret;
}

export default getItemVisibility;