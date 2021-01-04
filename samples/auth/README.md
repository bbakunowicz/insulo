# Authorization Sample

The example shows the flexibility of the Insulo authorization mechanism, allowing for your own definition of authorization parameters, methods of establishing credentials and methods of determining access to routes and menu items.
- The function that sets the current permissions is defined in the *src/config/auth/setCredentials.js* file.
- Definitions of the authorization parameters required to access the specified path are defined in the file *src/pages/routing/Routes.js*, while the accessibility of a given path is verified in the *src/config/routing/getPageVisibility.js* file.
- Definitions of authorization parameters allowing the visibility of specific menu items are specified in the *src/config/menu/items/getMenuItems.js* file, while the visibility of a given menu item is verified in the *src/config/menu/items/getItemVisibility.js* file.
- The above file names can be changed as needed, using the *src/config/auth/initial.js*, *src/config/menu/items/initial.js* and *src/config/routing/initial.js* configuration files. The *src/pages/routing/Routes.js* file is imported in the *src/containers/MainLayout.js* file.


## Using this example:
```
git clone git@github.com:bbakunowicz/insulo.git
cd insulo/sample/auth
yarn install && yarn start
```
or
```
git clone git@github.com:bbakunowicz/insulo.git
cd insulo/sample/auth
yarn install && yarn build && serve -s build
```

## Building this example from scratch:

1. Bootstrap project with [Create React App](https://github.com/facebook/create-react-app) template with *--template insulo* option:
```sh
npx create-react-app auth-sample --template insulo
```
2. Remove all coments from lines between labels "*#Authentication(start)*" and "*#Authentication(stop)*". Verify changes by starting application with "yarn start". Features related to the authorization mechanisms should be available.
3. Modify the *src/config/auth/setCredentials.js* file by using a simple authorization mechanism that sets the **authorization values** to "user" or "admin" respectively.
4. Change the *src/pages/routing/Routes.js* file, by setting **authorization properties** (*authProps* properties) in the *ProtectedRoute* components, that define accessibility of specified route.
5. Modify the *src/config/routing/getPageVisibility.js* file, by customizing the route availability rules. 
6. Change the *src/config/menu/items/getMenuItems.js* file by setting menu items **authorization properties** (*authProps* properties), that determine the visibility of a specific menu item.
7. Modify the *src/config/menu/items/getItemVisibility.js* file, by adjusting the visibility rules for menu items.
8. Add some changes to *src/pages/Login.js* file, limiting its features to signing in with synchronuous authorization helper action, provided by the *insulo-route* package.


