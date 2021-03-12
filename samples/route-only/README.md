# Route only sample

This example shows the routing functionality. The example does not include the user interface. To verify the routing functionality use the paths defined in the example.

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with *npx create-react-app route-only --template insulo*.

## Using this example:
```
git clone https://github.com/bbakunowicz/insulo.git
cd insulo/samples/route-only
yarn install && yarn start
```
or
```
git clone https://github.com/bbakunowicz/insulo.git
cd insulo/samples/route-only
yarn install && yarn build && serve -s build
```

# Acceptable paths when using yarn start (and the appication has been started on default port):
* http://localhost:3000
* http://localhost:3000/item1 - public route
* http://localhost:3000/item2 - protected route, accessible when authenticated as *user3*
* http://localhost:3000/item3 - protected route, accessible when authenticated as *user3*, with redirection to http://localhost:3000/login page
* http://localhost:3000/item4 - protected route, accessible when authenticated as *user4*, with redirection to http://localhost:3000/login page
* http://localhost:3000/login - protected route, accessible when unauthenticated
* http://localhost:3000/logout - protected route, accessible when authenticated as *user3* or *user4*

# Acceptable paths when using yarn build && serve -s build (and the application has been started on default port):
* http://localhost:5000
* http://localhost:5000/item1 - public route
* http://localhost:5000/item2 - protected route, accessible when authenticated as *user3*
* http://localhost:5000/item3 - protected route, accessible when authenticated as *user3*, with redirection to http://localhost:5000/login page
* http://localhost:5000/item4 - protected route, accessible when authenticated as *user4*, with redirection to http://localhost:5000/login page
* http://localhost:5000/login - protected route, accessible when unauthenticated
* http://localhost:5000/logout - protected route, accessible when authenticated as *user3* or *user4*
