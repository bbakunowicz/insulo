import getPageVisibility from '../routing/getPageVisibility'

const getItemVisibility = (authValues, authProps) => {
    if (typeof authProps != 'object') return true;
    if (authProps.unauthenticated === true && authValues) return false;
    return getPageVisibility(authValues, authProps);
  }

export default getItemVisibility;