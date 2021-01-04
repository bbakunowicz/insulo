import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Subitem from '../Subitem';
import Dashboard from '../Dashboard';

const Routes = (props) => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/subitem1-1" render={(props) => <Subitem {...props} title="Item 1-1" />} />
        <Route exact path="/subitem1-2-1" render={(props) => <Subitem {...props} title="Item 1-2-1" />} />
        <Route exact path="/subitem1-2-2" render={(props) => <Subitem {...props} title="Item 1-2-2" />} />
        <Route exact path="/subitem1-3" render={(props) => <Subitem {...props} title="Item 1-3" />} />
        <Route exact path="/item2" render={(props) => <Subitem {...props} title="Item 2" />} />
        <Route exact path="/item3" render={(props) => <Subitem {...props} title="Item 3" />} />
        <Route component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;
