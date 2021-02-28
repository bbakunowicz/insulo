import getPageVisibility from './getPageVisibility';
import AuthErrorPage from '../../pages/AuthError'
import type {RouteProviderInitValues} from 'insulo-route';

const init:RouteProviderInitValues = { 
  defaultRedirect: "/login",
  AuthErrorPage,
  getPageVisibility
}

export default init;
