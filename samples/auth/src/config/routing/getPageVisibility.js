const isGranted = (authValues, authProps) => {
  console.log(`getItemVisibility: authValues=${authValues}`);
  console.log(`getItemVisibility: authProps:`);
  console.log(authProps);
  
  if (!authProps) return true;  //if authProps is undefined show the page

  if (typeof authProps != 'object') return false;

  if (authProps.unauthenticated === true) {
    if (!authValues) {
      return true;
    }
  }
  else if (typeof authValues == 'string' && Array.isArray(authProps) && authProps.indexOf(authValues) > -1) {
    return true;
  }

  return false;
}

export default isGranted;