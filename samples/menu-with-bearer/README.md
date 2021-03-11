# Menu with JSON web Tokens authorization

## Using this example:
```
git clone git@github.com:bbakunowicz/insulo.git
cd insulo/sample/menu-with-bearer
yarn install && yarn client-install && yarn start
```
or
```
git clone git@github.com:bbakunowicz/insulo.git
cd insulo/sample/menu-with-bearer
yarn install && yarn client-install && yarn run client-build && yarn run server
```
## Basic information about JSON Web tokens:
* Bearer token obtained as a result of authentication contains information about user rights necessary to perform the authorization, i.e. access to the resource.
* The backend does not have to query the database for the current user session permissions each time the API is called.
* There is no need to query the authorization database, which increases the scalability of the solution.
* There is no need to maintain authorization information about the session state on the backend server and query the authorization database with each request, which increases the scalability of the solution and makes the application stateless - there is no need to transfer the session state between the nodes of the backend infrastructure.
* It is not possible to revoke the token before its expiry.
* It is possible to use solutions that allow the token to be invalidated during its validity, but they make the application stateful.
* A good compromise between the security of the solution and its scalability is the use of access tokens with a shorter validity period and refresh tokens with a longer validity period.
* The validity period of refresh tokens should depend on the permissible session idle time.
* The validity of the access token should depend on the permissible propagation time of user privilege changes.
* It is unacceptable to store tokens in the browser’s local storage, due to the possibility of an XSS attack, due to the availability of local storage for javascript code launched as part of the web application.
* In order to prevent XSS attacks, it is recommended to use cookies to store tokens, but the cookie token must have at least the HttpOnly attribute.

## JSON Web tokens implementation in menu-with-bearer:
* The example includes the bearer tokens server, based on the [Express web application framework](https://expressjs.com) and the client, using the insulo-menu and insulo-route packages.
* The client's source code is located in the client subdirectory.
* The authorization mechanism uses access tokens (AT) and refresh tokens (RT)
* Access tokens validity time and refresh tokens validity time are defined in the .env file.
* The access tokens validity time is controlled by the AT_PERIOD parameter (default 30 sec.).
* The refresh tokens validity time is controlled by the RT_PERIOD parameter (default 90 sec.).
* The RT_RENEW parameter specifies the time after which a given refresh token can be extended its validity, by default it is 60 seconds (value 0 means that RT is refreshed with every request).
* The tokens are transferred as HttpOnly cookies.
* Authorization mechanism in menu-with-bearer from the client's side:
    * The client application uses the insulo-route packet for authorization.
    * The configuration of insulo-route is located in two configuration files:
        * *client/src/config/auth/initial.js* – authorization configuration,
        * *client/src/config/routing/initial.js* – routing configuration,
    * In the submit event on *client/pages/LoginPage.js*, the setCredentials action helper of the *insulo-route* package is called.
    * Action helper **setCredentials** calls the method indicated by the property *setCredentials* of the athorization configuration file.
    * This method is a user-defined method, taking an input parameter of type object, containing property *credentials* (user-defined type) and *additionalProps* (user-defined type), and returning a user-defined value
    * In the current example *setCredentials* property points to *client/src/config/auth/setCredentials.js*.
    * The value (let's call it "*authValues*") returned from above method is used in:
        * *ProtectedRoute* components (example in *client/pages/routing/Routes.js*) - to determine the availability of a given route,
        * in the menu component to define the visibility of the menu item.
    * For comparison with *authValues* are taken:
        * property *authProps* of the *ProtectedRoute* component,
        * property *authProps* of individual items, defined in the *items* object, which is a property of the menu component configuration object, defined in the menu configuration file (*client/src/config/menu/initial.js*).
    * The following functions are responsible for the comparison *authValues* and *authProps*:
        * for the *ProtectedRoute* component it is the function indicated in property *getPageVisibility* of routing configuration file (in menu-with-bearer it is the function defined in */client/src/config/routing/getPageVisibility.js*) - returned value true means that the specific *ProtectedRoute* is available,
        * for the menu component it is the function indicated in the property *getItemVisibility* of the menu configuration file (in menu-with-bearer example it is the function defined in *client/src/config/menu/getItemVisibility.js*) - returned value true means that the specific menu item is visible.
* Server-side authorization is responsible for access to resources made available via the server API.
* Authorization mechanism in menu-with-bearer from the server side:
    * The client invokes the authorization action by providing credentials.
    * If they are correct, the AuthValues object is returned as a payload and the response contains acces token (AT) and refresh token (RT) in the form of cookies.
    * AuthValues contains user privileges for the needs of the client application.
    * AT contains information about the permissions of a given user used on the server side.
    * During a request directed to the REST API (other than the authorization request), the validity of AT and RT is verified in the authentication middleware:
        * if AT is correct, the request service goes to the next middleware,
        * if AT has expired then:
            * if the RT has expired or the permissions transferred within AT have changed, an authentication error is returned
            * otherwise:
                * AT is generated for the next validity period,
                * if the time since generating the RT is greater than the value of the RT_RENEW parameter, a new RT is generated.
                * handling the request goes to the next middleware.
        * if other middleware does not reject the request, the client will get the requested data.
* An example of an API using JWT authorization is defined in routes/api.js.
*  User identification and authorization takes place in the action available by calling POST to http://localhost/api/auth, with email and password parameters 
* You should use https in a production solution.
* An example of calling auth action from the client side you can find in /client/src/src/config/auth/setCredentials.js
* Axios automatically sends cookies on every request, including cookies containing an access token and a refresh token.
* The following middleware is responsible for the access to the individual API methods of the server: 
    * authentication – verification of the validity of the access token and refresh token and, if possible and reasonable, their regeneration,
    * authorization – verification of the validity of the current authorizations to the requests sent using the access token.
* An example of an action with access verified using authentication and authorization middleware is action available at http://localhost/api/test using a GET request.
* The http://localhost/api/test action is defined in routes/api.js.

