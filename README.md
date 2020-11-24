# Insulo components
Insulo components are a collection of components designed to rapidly build [React-based](https://reactjs.org/) applications. Insulo components are based on the [material-ui](https://material-ui.com/) library. They use [React hooks](https://reactjs.org/docs/hooks-intro.html), in terms of state management.

Currently, the main Insulo library items are: menu component and private route component. 

The menu component allows you to create [themes](#theming) and [language versions](#loc). It also offers three operating modes and provides the functionality of multiple sub-menu levels. 

The  private route component provides an interface for applying a user-defined [authentication and authorization](#auth) mechanism.

# Getting started

The best way to learn about Insulo components is to run test applications. To run a test application, you must have the [Node.js](https://nodejs.org/en/) environment prepared. Assuming the current repository is cloned to the insulo directory, follow the steps below (starting from insulo subdirectory):

for plain javascript example:
```sh
cd cra-demo
npm start
```
or for the Typescript version:
```sh
cd cra-demo-ts
npm start
```

# Use of Insulo components

**The easiest way** of Insulo components is to use the [Create React App](https://create-react-app.dev/docs/getting-started/) template:

```sh
npx create-react-app insulo-test --template insulo
cd insulo-test
npm start
```
which prepares the project structure and installs the appropriate packages:_insulo-menu_, _insulo-route_, _insulo-theme-provider_ and _insulo-locale-provider_.


# Project structure

In general, the structure of the project is flexible and it depends on you what you will ultimately use. The insulo template will generate the following directory hierarchy: 
```
insulo-test
└── src
    ├── config
    │   └── ...
    ├── containers
    │   ├── App.js
    │   ├── MainLayout.js
    │   └── MenuWrapper.js
    └── pages
        ├── routing
        │   └── Routes.js
        ├── Dashboard.js
        └── ...
```
After provisioning an application with _--template insulo_, you get an application skeleton with minimal functionality of Insulo components. Some code parts are commented out with comments like **#Theming(start)** / **#Theming(stop)**. In order to use the selected functionality, you will have to delete the comments in between. 

The starting point of the application is App.js, where insulo providers are defined. Providers' configuration files are located in the config directory, but you can put them in a different location. Routes.js routes contains the configuration of routing and authentication, more information in the section [Authorization and Authentication](#auth).

# <a id="auth"></a>Authentication and Authorization

**AuthConfigProvider** provides an interface for authentication and authorization. Authorization methods are passed to the provider via property **initValue**:
```jsx
<AuthConfigProvider initValue={authConfig}>
    <AuthStateConfigProvider>
        ...
    </AuthStateConfigProvider>
</AuthConfigProvider>
```
Properties of the configuration object passed to the initValue:

| Property | Meaning |
|---|---|
| setCredentials | xxxxx |
| clearCredentials | xxxxx |
| clearCredentialsImmediately | xxxxx |



# <a id="theming"></a>Theming

# <a id="loc"></a>Localization

# Functionality testing

For basic tests, don't delete comments, just run the app:
```sh
npx create-react-app test-insulo-template --template insulo
cd test-insulo-template
npm start
```
## Basic test

1. Click the Settings menu icon.
2. Choose menu variants and test menu behavior.
3. Test the functionality of the submenu.

## Settings visibility test

An example of limiting the visibility of one option. You can define your own limitations.

1. Remove all comments between the lines marked **#Visibitity(start)** and **#Visibitity(stop)** in all project files.
2. Save all files.
3. Choose Settings -> Menu variants -> Temporary
4. Decrease the width of the browser window: the "Persistent" option should disappear. 
5. It should reappear after an appropriate increase of the browser window's width.

## Authentication and authorization provider fuctionality test

1. To facilitate the tests, it is best to set menu variant "Persistent" (Settings -> Menu variants -> Persistent)
2. Remove all comments between the lines marked **#Authentication(start)** and **#Authentication(stop)** in all project files.
3. Save all files.
4. "User's Page", "Admin's Page", "Sign In" should appear in the menu.
5. Select "User's Page".
6. You should be redirected to the page "Sign In".
7. In "Sign In" enter: user = admin, password = <any_text> (but preferably random and quite long;)
8. After authorization you should see "User's Page" and hidden menu items: "User's Hidden Page", "Admin's Hidden Submenu".
9. Select "Sign Out" and do sign out.
10. Select "User's Page".
11. Authorize as user "user".
12. "Admin's Hidden Submenu" should disappear
13. Select "Admin's Page".
14. You will be redirected to the Login Page, because the current user does not have the "admin" role.
15. After logging in as user "admin" you will be redirected to the "Admin's Page".

## Theming provider functionality test

1. Uncomment all comments between the lines marked **#Theming(start)** and **#Theming(stop)** in all project files, except for the areas marked as **#Theming(start) and #Localization(start)**, which should be uncommented when theming is tested simultaneously with localization.
2. Test various theming settings available in "Themes" and "Theme type" in the settings menu.

## Localization provider functionality test

1. Remove all comments between the lines marked **#Localization(start)** and **#Localization(stop)** in all project files, including areas marked as **#Theming(start) and #Localization(start)**, which should be uncommented when theming is tested simultaneously with localization.
2. Comment out the **#No localization** area in the _src/pages/Dashboard.js_ file.
3. Save all files.
4. Select "Home (EN)".
5. Choose: Settings menu, then Languages and select one of the available languages.
6. The menu language and the language of the Home Page should change.
7. Select "Sample Data".
8. The language of the TablePagination component under the table component should change.


# Future plans
There are plans to extend the library with middleware components enabling data access and components responsible for presenting data in the frontend layer. 









### An h3 header

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, _Italic_, **bold**, and `monospace`. 

Itemized lists
look like:

  * this one
  * that one
  * the other one

List #2
- item one
- item two
- item three


Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Here's a numbered list:

1. first item
2. second item
3. third item

Block of code:
```
define foobar() {
    print "Welcome to flavor country!";
}
```

```sh
npx create-react-app my-app
cd my-app
npm start
```

```js
function foobar() {
    print "Welcome to flavor country!";
}
```

~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print(i)
~~~

~~~js
function foobar() {
    print "Welcome to flavor country!";
}
~~~

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). 

A horizontal rule follows.

***

![example image](example-image.jpg "An exemplary image")

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.


<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/facebook/create-react-app@27b42ac7efa018f2541153ab30d63180f5fa39e0/screencast.svg' width='600' alt='npm start'>
</p>

<p align='center'>
<img src='screencast-error.svg' width='600' alt='npm start'>
</p>

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
    └── setupTests.js
```

### `npm start` or `yarn start`

