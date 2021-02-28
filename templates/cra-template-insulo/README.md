# cra-template-insulo

This is the official base template for [InsuloJS components](https://github.com/bbakunowicz/insulo).

InsuloJS components are a collection of components designed to rapidly build [React-based](https://reactjs.org/) applications. InsuloJS components are based on the [material-ui](https://material-ui.com/) library. They use [React hooks](https://reactjs.org/docs/hooks-intro.html), in terms of state management. 

More information can be found on the [InsuloJS project](https://github.com/bbakunowicz/insulo) website. Basic examples can also be found on the website of the [insulo-route](https://www.npmjs.com/package/insulo-route) package or on the website of the [insulo-menu](https://www.npmjs.com/package/insulo-menu) package.

# Installation

```sh
npx create-react-app test-app --template insulo
cd test-app
yarn start
```

# Usage

The application created with this template includes functionality limited to the basic menu functions. In order to use the other options of InsuloJS components, you need to uncomment the appropriate code fragments. To extend the functionality with the following options: authorization, templates or localization, delete appropriately marked comments. In order to use authorization, remove the comments from the lines delimited by the comments #Authentication (start) and #Authentication (stop) in all files. Similarly, in order to use templates, you should remove comments placed between #Theming (start) and #Theming (stop) in all files. To use localization you must remove comments between #Localization (start) and #Localization (stop) in all files. 

In addition to removing comments, you need to adjust the configuration of the components to your needs. Each of the components: RouteConfigProvider, LocaleConfigProvider, ThemeConfigProvider, AuthConfigProvider, MenuProvider has an initValue configuration parameter. Configuration is relatively intuitive and at the moment it is best described by example configuration files in the config directory. 

To see how the application files should look like after removing all comments and with full functionality unlocked, clone the [InsuloJS project](https://github.com/bbakunowicz/insulo) from the GitHub website, go to the cra-demo directory and run the sample application, that is:

```sh
git clone https://github.com/bbakunowicz/insulo.git
cd insulo/cra-demo
yarn install && yarn start
```
