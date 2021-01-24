import getPageVisibility from './getPageVisibility';
import AuthErrorPage from '../../pages/AuthError';

const init = { 
  defaultRedirect: "/login",
  AuthErrorPage,
  getPageVisibility
};

export default init;