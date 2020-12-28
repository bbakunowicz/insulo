import getPageVisibility from './getPageVisibility';
import AuthErrorPage from '../../pages/AuthError'

export default { 
  defaultRedirect: "/login",
  defaultForward: "/",
  AuthErrorPage,
  getPageVisibility
}
