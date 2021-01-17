const getPageVisibility = (authValues, authProps) => {
    return authProps.unauthenticated === true || 
      ((authValues) && authValues.authorized === authProps.required) || 
      ((authValues) && Array.isArray(authProps.required) && authProps.required.findIndex((r)=>{return r === authValues.authorized}) > -1);
  }

export default getPageVisibility;