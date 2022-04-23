# InsuloJS components
InsuloJS components are a collection of components designed to rapidly build [React-based](https://reactjs.org/) applications. InsuloJS components are based on the [material-ui](https://material-ui.com/) library. They use [React hooks](https://reactjs.org/docs/hooks-intro.html), in terms of state management.

The main InsuloJS library items are: the Menu component and the ProtectedRoute component. 

The Menu component offers three operating modes (persistent, temporary and minimized) and provides the functionality of many sub-menu levels. It also allows to create [themes](#theming) and [language versions](#loc).

The ProtectedRoute component provides an interface for applying a user-defined [authentication and authorization](#auth) mechanism.

# Demo

* [Menu Sample](https://insulo-menu.vercel.app/) - an example showing the functionality of the Menu component and the ProtectedRoute component 
* [Code sandbox](https://codesandbox.io/s/2uplh)- the above example presented in the sandbox
* [DataTable Sample](https://insulo-datatable.vercel.app/) - an example of the DataTable component. The DataTable component is under development and is likely to be part of the InsuloJS library.

# Getting started

The best way to learn about InsuloJS components is to run test applications. To run a test application, you must have the [Node.js](https://nodejs.org) environment prepared. 

Plain JavaScript example:
```sh
git clone https://github.com/bbakunowicz/insulo.git
cd insulo/cra-demo
npm install && npm start
```
The TypeScript version (do not use yarn because of problems with some Material UI components compilation):
```sh
git clone https://github.com/bbakunowicz/insulo.git
cd insulo/cra-demo-ts
npm install && npm start
```
Additional examples can be found in the *samples* catalog of cloned repository. Each example has its own README file, with some usage information.

# Installation

The easiest way of using InsuloJS components is to apply the [Create React App](https://create-react-app.dev/docs/getting-started/) with **insulo** template:

```
npx create-react-app insulo-test --template insulo
cd insulo-test
npm start
```
or with **insulo-full** template:
```
npx create-react-app insulo-test-full --template insulo-full
cd insulo-test-full
npm start
```
Insulo template prepares the project structure and installs appropriate packages:_insulo-menu_, _insulo-route_, _insulo-theme-provider_ and _insulo-locale-provider_. The **insulo-full** template contains full functionality of the Insulo library. The **insulo** template is limited to the basic functionality, but you can enable individual functionalites by removing the appropriate comments. Some code parts are commented out with comments like **#Theming(start)** / **#Theming(stop)**. In order to use the selected functionality, you will have to delete the comments in between. 



# Contents of the InsuloJS npm packages
| Package | Contents|
|---|---|
| insulo-menu| <ins>Components:</ins> <br />**Menu** – a component that supports three variants of behavior, hiding menu items according to authorization, theming, localization,<br />**ApplicationBar** – an application bar component with menu button and user-defined title,<br />**MenuLanding** – a page placement area compatible with the Menu component, <br />**Landing** – a helper component combinig the *Menu* and *MenuLanding* components,<br /><ins>Context Providers:</ins><br />**MenuProvider** – a context provider that provides menu configuration, including menu operation mode, available modes, lists of items and settings and their visibility and their visibility,|
|insulo-route| <ins>Components:</ins> <br />**ProtectedRoute** – a component that supports the use of routes requiring authorization,<br /><ins>Context Providers:</ins><br />**AuthConfigProvider** – a context provider that provides an authorization context for the ProtectedRoute component and for Menu component, as well as providing helper methods for authorization,<br />**RouteConfigProvider** – an context provider of the routing configuration used by ProtectedRoute components |
|insulo-theme-provider | <ins>Context Providers:</ins><br /> **ThemeConfigProvider** – an optional context provider that supports themes,|
|insulo-locale-provider|<ins>Context Providers:</ins><br />**LocaleConfigProvider** – an optional context provider supporting localization.|
<br />

# Repository structure
* **cra-demo** is a javascript demo project,
* **cra-demo-ts** is a typescript demo project,
* **packages** directory contains source code of InsuloJS packages,
* **samples** directory contains:
    * [menu-only-flat](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-only-flat/) – an example of Menu component with minimal functionality, structured as single file,
    * [menu-only](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-only/) – equivalent to [menu-only-flat](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-only-flat/), organized as separate files,
    * [route-only](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-only/) – an example example of routing with *insulo-route* package,
    * [menu-with-auth-flat](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-with-auth-flat/) – an example [menu-only-flat](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-only-flat/) extended with an authorization, structured as single file, 
    * [menu-with-auth](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-with-auth/) – equivalent to [menu-with-auth-flat](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-with-auth-flat/), organized as separate files,
    * [menu-with-bearer](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-with-bearer/) – an example of the operation of insulin components using JSON Web Tokens (JWT); it contains a bearer tokens server, based on the Express framework,
    * [class-components](https://github.com/bbakunowicz/insulo/tree/main/samples/class-components/) – an example of React Class Components usage with InsuloJS components,
* **templates** directory contains source code of insulo template.

    
# Default project structure

In general, the structure of the project is flexible and it depends on you what you will ultimately use. The **insulo** / **insulo-full** template will generate the following directory hierarchy: 

```
src
├── config
│   └── ...
├── containers
│   ├── App.js
│   └── MainLayout.js
└── pages
    ├── routing
    │   └── Routes.js
    ├── Dashboard.js
    └── ...
```

The starting point of the application is *App.js*, where InsuloJS providers are defined. Providers' configuration files are located in the config directory, but you can put them in a different location. *Routes.js* contains the configuration of routing including protected routes, more information in the section [Authorization](#auth).

# <a id="auth"></a>Authorization

InsuloJS components do not provide any authentication or authorization mechanisms. Instead, insulo-route packet provides an interface for user authorization. An example of JWT (bearer tokens) authorization using insulo-route can be found in the [menu-with-bearer](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-with-bearer/) example.

## How the insulo-route authorization interface works
* The configuration of insulo-route is located in two configuration files by default:
    * *src/config/auth/initial.js* – authorization configuration,
    * *src/config/routing/initial.js* – routing configuration,
* The first step is to set the authorization value for the current session, which can be done by:
    * directly - using action SET_AUTH_VALUES of AuthContext from insulo-route package,
    * indirectly (which is the preferred way) - using **setCredentials** action helper from the insulo-route package,
* Comparision of both methods you can find in the [cra-demo project](https://github.com/bbakunowicz/insulo/tree/main/cra-demo).
* Action helper **setCredentials** calls the method indicated by the property *setCredentials* of the athorization configuration file.
* This method is a user-defined method, taking an input parameter of type object, containing property *credentials* (user-defined type) and *additionalProps* (user-defined type), and returning a user-defined value
* The value (let's call it "*authValues*") returned from above method is used in:
    * *ProtectedRoute* components - to determine the availability of a given route,
    * in the menu component to define the visibility of the menu item.
* For comparison with *authValues* are taken:
    * property *authProps* of the *ProtectedRoute* component,
    * property *authProps* of individual items, defined in the *items* object, which is a property of the menu component configuration object, defined in the menu configuration file (*src/config/menu/initial.js* by default).
* The following functions are responsible for the comparison *authValues* and *authProps*:
    * for the *ProtectedRoute* component it is the function indicated in property *getPageVisibility* of the routing configuration file - returned value true means that the specific *ProtectedRoute* is available,
    * for the menu component it is the function indicated in the property *getItemVisibility* of the menu configuration file - returned value true means that the specific menu item is visible.

For authorized access to individual pages, use the **ProtectedRoute** component from the **insulo-route** package.

```jsx
<ProtectedRoute exact path="/item1" 
    component={SampleComponent} 
    componentProps={SampleComponentProps} 
    authProps={authProps} 
    getPageVisibility={getPageVisibility} />
```          

**ProtectedRoute** uses following parameters to configure authorized access to a given route:
* **component** – the target React functional or class component,
* **componentProps** – (optional) properties passed to the target component,
* **authProps** – user-defined route access conditions; the type of authProps parameter is defined by the user, according to the authorization mechanisms used, for example it could be a string or an object or an array,
* **getPageVisibility** – (optional) user-defined function which returns true for athorized access to the route or false when access is denied; *ProtectedRoute* pass *authProps* and *authValues* to the *getPageVisibility* function as input parameters. It's an optional parameter. Te use of **RouteConfigProvider** eliminates the need to specify the *getPageVisibility* parameter in **ProtectedRoute** components. **RouteConfigProvider** injects the *getPageVisibility* value to all **ProtectedRoute** components. User-defined permission validation function is passed to the **RouteConfigProvider** via the property *getPageVisibility* of the *initValue* parameter.

Example of using providers needed for authorization:

```jsx
<RouteConfigProvider initValue={routingConfig}>
    <AuthConfigProvider initValue={authConfig}>
        <MenuProvider initValue={menuConfig}>
            <MainLayout />
        </MenuProvider>
    </AuthConfigProvider>
</RouteConfigProvider>
```
**AuthConfigProvider** provides an action SET_AUTH_VALUES, by which InsuloJS components obtain information about current user's credentials. Values set by SET_AUTH_VALUES are used in *ProtectedRoute* component to determine availability of specify private route. The authorization values, set by the  SET_AUTH_VALUES action, are compared to the authProps ProtectedRoute's property in the *getPageVisibility* function, which returns true for an available route and false for an unavailable route.

**AuthConfigProvider** allows using authorization helpers *setCredentials* and *clearCredentials*, which simplify authorization management. An example of using authorization helpers can be found in the *Login.js* file in *cra-demo* project.

Authorization in InsuloJS components is shown in the example *samples/route-only* or *samples/menu-with-auth*. You can also test the authorization with the **Insulo template** as shown in [Authorization provider functionality test](#test_auth).

# Hiding menu items

Authorization values set by the action SET_AUTH_VALUES, in addition to being used by the ProtectedRoute component, are used by the Menu component to determine the visibility of individual menu items.

Menu items may be hidden according to the application user's credentials. Equivalent to parameter *authProps* from **ProtectedRoute** component is property *authProps* of **MenuProvider** *initValue* parameter, assigned to a given menu item. Values provided by the authorization mechanism are provided to Menu component by **AuthConfigProvider** SET_AUTH_VALUES action, in the same way as used in **ProtectedRoute**. Permission verification function is defined as *getItemVisibility* property of **MenuItemsProvider** *initValue* parameter.

Managing the visibility of menu items in Menu component is shown in the example *samples/menu-with-auth*. You can also test the menu item visibility management with the **Insulo template** as shown in [Authorization provider functionality test](#test_auth).


# <a id="theming"></a>Theming
InsuloJS theming is based on [material-ui theming](https://material-ui.com/customization/theming/). The **insulo-theme-provider** is responsible for theming. Theming parameters are defined in **insulo-theme-provider** *initValue* parameter. You can define array of several themes. The *props* property of the items in this array corresponds to the *material-iu* theme properties. The **insulo-theme-provider** *initValue* parameter has the *type* property influencing the presentation of the menu. Is sets the current theme type to dark or light. The theme array elements have *backgroud* and *selected* properties which affect menu colors.

Theming in InsuloJS components is shown in the cra-demo project. You can also test theming with the **Insulo template** as shown in [Theming provider functionality test](#test_theming).

# <a id="loc"></a>Localization
The **insulo-locale-provider** context provider is responsible for the localization functionality of the InsuloJS components. The *initValue* parameter of the **insulo-locale-provider** defines appropriate strings used in **Menu** component for selected language. 
The *initValue* also contains locales symbol conversion tables between used in InsuloJS components and symbols known from HTML or symbols used in the material-ui. The **insulo-locale-provider** context provider uses javascript navigator object to determine the language used. If the value of the language property is in the format "en-US", then **insulo-locale-provider** looks for string definitions first in the *US* property, then in the *en* property, and then uses the default language.

You can test the language management with the **Insulo template** as shown in [Localization provider functionality test](#test_lang).


# Licensing
The project is generally licensed under the MIT license, with the exception of the InsuloJS packages located in the *packages* directory, which are licensed under the Apache-2.0 license.
