# Insulo components
Insulo components are a collection of components designed to rapidly build [React-based](https://reactjs.org/) applications. Insulo components are based on the [material-ui](https://material-ui.com/) library. They use [React hooks](https://reactjs.org/docs/hooks-intro.html), in terms of state management.

The main Insulo library items are: the menu component and the private route component. 

The menu component offers three operating modes (persistent, temporary and minimized) and provides the functionality of many sub-menu levels. It also allows to create [themes](#theming) and [language versions](#loc).

The private route component provides an interface for applying a user-defined [authentication and authorization](#auth) mechanism.

# Contents of the Insulo npm packages
| Package | Contents|
|---|---|
| insulo-menu| <ins>Components:</ins> <br />**Menu** – a component that supports three variants of behavior, hiding menu items according to authorization, theming, localization,<br />**ApplicationBar** – an application bar component with menu button and user-defined title,<br />**MenuLanding** – a page placement area compatible with the Menu component, <br />**Landing** – a helper component combinig the *Menu* and *MenuLanding* components,<br /><ins>Context Providers:</ins><br />**MenuProvider** – a context provider that provides menu configuration, including menu operation mode, available modes, lists of items and settings and their visibility and their visibility,|
|insulo-route| <ins>Components:</ins> <br />**PrivateRoute** – a component that supports the use of routes requiring authorization,<br /><ins>Context Providers:</ins><br />**AuthConfigProvider** – a context provider that provides an authorization context for the PrivateRoute component and for Menu component, as well as providing helper methods for authorization,<br />**RouteConfigProvider** – an context provider of the routing configuration used by ProtectedRoute components |
|insulo-theme-provider | <ins>Context Providers:</ins><br /> **ThemeConfigProvider** – an optional context provider that supports themes,|
|insulo-locale-provider|<ins>Context Providers:</ins><br />**LocaleConfigProvider** – an optional context provider supporting localization.|
<br />

# Repository structure
* **cra-demo** is a javascript demo project,
* **cra-demo-ts** is a typescript demo project,
* **packages** directory contains source code of insulo packages,
* **samples** directory contains:
    * [menu-only-flat](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-only-flat/) – an example of Menu component with minimal functionality, structured as single file,
    * [menu-only](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-only/) – equivalent to [menu-only-flat](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-only-flat/), organized as separate files,
    * [route-only](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-only/) – an example example of routing with *insulo-route* package,
    * [menu-with-auth-flat](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-with-auth-flat/) – an example [menu-only-flat](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-only-flat/) extended with an authorization, structured as single file, 
    * [menu-with-auth](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-with-auth/) – equivalent to [menu-with-auth-flat](https://github.com/bbakunowicz/insulo/tree/main/samples/menu-with-auth-flat/), organized as separate files,
    * [class-components](https://github.com/bbakunowicz/insulo/tree/main/samples/class-components/) – an example of React Class Components usage with Insulo components,
* **templates** directory contains source code of insulo template.

    
# Getting started

The best way to learn about Insulo components is to run test applications. To run a test application, you must have the [Node.js](https://nodejs.org/en/) environment prepared. Assuming the current repository is cloned to the insulo directory, follow the steps below (starting from insulo subdirectory):

for plain javascript example:
```sh
git clone https://github.com/bbakunowicz/insulo.git
cd insulo/cra-demo
yarn install && yarn start
```
for the Typescript version:
```sh
https://github.com/bbakunowicz/insulo.git
cd insulo/cra-demo-ts
yarn install && yarn start
```
Additional examples can be found in the *samples* catalog. Each example has its own README file, with some usage information.

# Installation

The easiest way of using Insulo components is to apply the [Create React App](https://create-react-app.dev/docs/getting-started/) with **Insulo template**:

```
npx create-react-app insulo-test --template insulo
cd insulo-test
yarn start
```
Insulo template prepares the project structure and installs appropriate packages:_insulo-menu_, _insulo-route_, _insulo-theme-provider_ and _insulo-locale-provider_.

Installation without template:

```sh
npx create-react-app insulo-test
cd insulo-test
yarn add @material-ui/core @material-ui/icons react-router-dom insulo-menu insulo-route insulo-theme-provider insulo-locale-provider
```
Adding optional packages (used in some samples):
```sh
yarn add @material-ui/lab clsx flag-icon-css react-icons react-intl
```

# Default project structure

In general, the structure of the project is flexible and it depends on you what you will ultimately use. The insulo template will generate the following directory hierarchy: 

```
insulo-test
└── src
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

After provisioning an application with the **Insulo template**, you get an application skeleton with minimal functionality of Insulo components. Some code parts are commented out with comments like **#Theming(start)** / **#Theming(stop)**. In order to use the selected functionality, you will have to delete the comments in between. 

The starting point of the application is *App.js*, where Insulo providers are defined. Providers' configuration files are located in the config directory, but you can put them in a different location. *Routes.js* contains the configuration of routing including private routes, more information in the section [Authorization](#auth).

# <a id="auth"></a>Authorization

Insulo components do not provide any authentication or authorization mechanisms. Instead, they provide an interface for user authorization. For authorized access to individual pages, use the **PrivateRoute** component from the **insulo-route** package.

```jsx
<ProtectedRoute exact path="/item1" 
    component={SampleComponent} 
    componentProps={SampleComponentProps} 
    authProps={authProps} 
    getPageVisibility={getPageVisibility} />
```          

**PrivateRoute** uses following parameters to configure authorized access to a given route:
* **component** – the target React functional or class component,
* **componentProps** – (optional) properties passed to the target component,
* **authProps** – user-defined route access conditions; the type of authProps parameter is defined by the user, according to the authorization mechanisms used, for example it could be a string or an object or an array,
* **getPageVisibility** – (optional) user-defined function which returns true for athorized access to the route or false when access is denied; *PrivateRoute* pass *authProps* and *authValues* to the *getPageVisibility* function as input parameters. It's an optional parameter. Te use of **RouteConfigProvider** eliminates the need to specify the *getPageVisibility* parameter in **PrivateRoute** components. **RouteConfigProvider** injects the *getPageVisibility* value to all **PrivateRoute** components. User-defined permission validation function is passed to the **RouteConfigProvider** via the property *getPageVisibility* of the *initValue* parameter.

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
**AuthConfigProvider** provides an action SET_AUTH_VALUES, by which Insulo components obtain information about current user's credentials. Values set by SET_AUTH_VALUES are used in *PrivateRoute* component to determine availability of specify private route. The authorization values, set by the  SET_AUTH_VALUES action, are compared to the authProps PrivateRoute's property in the *getPageVisibility* function, which returns true for an available route and false for an unavailable route.

**AuthConfigProvider** allows using authorization helpers *setCredentials* and *clearCredentials*, which simplify authorization management. An example of using authorization helpers can be found in the *Login.js* file in *cra-demo* project.

Authorization in Insulo components is shown in the example *samples/route-only* or *samples/menu-with-auth*. You can also test the authorization with the **Insulo template** as shown in [Authorization provider functionality test](#test_auth).

# Hiding menu items

Authorization values set by the action SET_AUTH_VALUES, in addition to being used by the PrivateRoute component, are used by the Menu component to determine the visibility of individual menu items.

Menu items may be hidden according to the application user's credentials. Equivalent to parameter *authProps* from **PrivateRoute** component is property *authProps* of **MenuProvider** *initValue* parameter, assigned to a given menu item. Values provided by the authorization mechanism are provided to Menu component by **AuthConfigProvider** SET_AUTH_VALUES action, in the same way as used in **PrivateRoute**. Permission verification function is defined as *getItemVisibility* property of **MenuItemsProvider** *initValue* parameter.

Managing the visibility of menu items in Menu component is shown in the example *samples/menu-with-auth*. You can also test the menu item visibility management with the **Insulo template** as shown in [Authorization provider functionality test](#test_auth).


# <a id="theming"></a>Theming
Insulo theming is based on [material-ui theming](https://material-ui.com/customization/theming/). The **insulo-theme-provider** is responsible for theming. Theming parameters are defined in **insulo-theme-provider** *initValue* parameter. You can define array of several themes. The property *props* of the elements in this table correspond to the properies of *material-iu* themes. The **insulo-theme-provider** *initValue* parameter has the *type* property influencing the presentation of the menu. Is sets the current theme type to dark or light. The theme array elements have *backgroud* and *selected* properties which affect menu colors.

Theming in Insulo components is shown in the cra-demo project. You can also test theming with the **Insulo template** as shown in [Theming provider functionality test](#test_theming).

# <a id="loc"></a>Localization
The **insulo-locale-provider** context provider is responsible for the localization functionality of the Insulo components. The *initValue* parameter of the **insulo-locale-provider** defines appropriate strings used in **Menu** component for selected language. 
The *initValue* also contains locales symbol conversion tables between used in Insulo components and symbols known from HTML or symbols used in the material-ui. The **insulo-locale-provider** context provider uses javascript navigator object to determine the language used. If the value of the language property is in the format "en-US", then **insulo-locale-provider** looks for string definitions first in the *US* property, then in the *en* property, and then uses the default language.

You can test the language management with the **Insulo template** as shown in [Localization provider functionality test](#test_lang).

# Functionality testing

For basic tests, install and run the application provisioned with the **Insulo template** (you will have to delete comments yourself):

```sh
npx create-react-app test-insulo-template --template insulo
cd test-insulo-template
yarn start
```
or use the cra-demo example (with all comments removed already):

```sh
git clone https://github.com/bbakunowicz/insulo.git
cd insulo/cra-demo
yarn install && yarn start
```

## Basic test

1. Click the Settings menu icon.
2. Choose menu variants and test menu behavior.
3. Test the functionality of the submenu.

## <a id="test_auth"></a>Authorization provider functionality test

1. To facilitate the tests, it is best to set menu variant "Persistent" (*Settings*, then *Menu variants*, then *Persistent*)
2. _(skip this step for cra-demo)_ Remove all comments between the lines marked **#Authentication(start)** and **#Authentication(stop)** in all project files and save all changes.
2. "User's Page", "Admin's Page", "Sign In" should appear in the menu.
2. Select "User's Page".
2. You should be redirected to the page "Sign In".
2. In "Sign In" enter: user = admin, password = <any_text> (but preferably random and quite long;) and use one of the buttons to sign in.
2. After successful authorization you should see "User's Page" and hidden menu items: "User's Hidden Page", "Admin's Hidden Submenu".
2. Select "Sign Out" and do sign out.
2. Select "User's Page".
2. Authenticate as user "user" (with any text as password).
2. "Admin's Hidden Submenu" should be unavailable.
2. Select "Admin's Page".
2. You should see an "Authorization Error" message. If you set the _redirectWhenInvalidCredentails_ option to _true_ (default is _false_) in the _AuthConfigProvider_ options, then you will be redirected to the Sign In page and after logging in as "admin" user, you will be redirected back to the "Admin's Page".

## <a id="test_theming"></a>Theming provider functionality test

1. _(skip this step for cra-demo)_ Uncomment all comments between the lines marked **#Theming(start)** and **#Theming(stop)** in all project files, except for the areas marked as **#Theming(start) and #Localization(start)**, which should be uncommented when theming is tested simultaneously with localization. Then save all changes.
2. Test various theming settings available in "Themes" and "Theme type" in the settings menu.

## <a id="test_lang"></a>Localization provider functionality test

1. _(skip this step for cra-demo)_ Remove all comments between the lines marked **#Localization(start)** and **#Localization(stop)** in all project files, including areas marked as **#Theming(start) and #Localization(start)**, which should be uncommented when theming is tested simultaneously with localization. Then save all changes.
2. _(skip this step for cra-demo)_ Comment out the **#No localization** area in the _src/pages/Dashboard.js_ file. Then save all changes.
2. Select "Home (EN)".
2. Choose: *Settings*, then *Languages* and select one of the available languages.
2. The menu language and the language of the Home Page should be changed.
2. Select "Sample Data".
2. The language of the TablePagination component under the table component should be changed.

# Licensing
The project is generally licensed under the MIT license, with the exception of the Insulo packages located in the *packages* directory, which are licensed under the Apache-2.0 license.
