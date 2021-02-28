const getPageVisibility = (authValues, authProps) => {
      if (!authProps || authProps.unauthenticated === true) {
        return true; 
      }
    
      const roles = authProps.roles;
      if (Array.isArray(roles) && typeof authValues == 'object' && Array.isArray(authValues.roles) && authValues.roles.length > 0) {
        for (let i=0; i<roles.length; i++){
          if (authValues.roles.find((role)=>{return role === roles[i]})) {
            return true;
          }
        }
      }
      return false;
    
  }

export default getPageVisibility;