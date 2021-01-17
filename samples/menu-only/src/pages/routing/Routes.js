import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from '../Page';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Page} />
      <Route exact path="/item1" component={Page} />
      <Route exact path="/item2" render={(props) => <Page {...props} text="Item 2" />} />
      <Route exact path="/item3" render={(props) => <Page {...props} text="Item 3" />} />
      <Route exact path="/subitem1" render={(props) => <Page {...props} text="Subitem 1" />} />
      <Route exact path="/subitem2-1" render={(props) => <Page {...props} text="Subitem 2-1" />} />
      <Route exact path="/subitem2-2" render={(props) => <Page {...props} text="Subitem 2-2" />} />
      <Route exact path="/subitem3" render={(props) => <Page {...props} text="Subitem 3" />} />
      <Route render={() => <Page text="Default route"/>} />
    </Switch>
  );
};

export default Routes;
