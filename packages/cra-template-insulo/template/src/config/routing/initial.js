import getPageVisibility from './getPageVisibility';

export default { 
  defaultRedirect: "/login",
  defaultForward: "/",
  authId: {
    "user": {
      authProps: {
        roles:['user']
      },
    },
    "admin": {
      authProps: {
        roles:['admin']
      },
    }, 
  },
  getPageVisibility
}
