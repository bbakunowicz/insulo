import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { menuTypes, MenuProvider, ApplicationBar, Landing } from 'insulo-menu';
import { ViewList, ViewCompact, ViewStream, ViewColumn } from '@material-ui/icons';

const Page = ({text}) => {
  return (<Fragment><h1>{text||"Item1"}</h1>{text||"Item 1"}</Fragment>);
}

const menuConfig = {
  variant: menuTypes.TEMPORARY,
  availableVariants: [menuTypes.PERSISTENT, menuTypes.TEMPORARY, menuTypes.MINIMIZED],
  width: "20em",
  anchor: menuTypes.MENU_LEFT,
  items: [
    {
      caption: "Item 1",
      icon: <ViewList/>,
      route: "/item1",
      altRoute: "/",
    },
    {
      caption: "Item 2",
      icon: <ViewCompact/>,
      route: "/item2",
    },
    {
      caption: "Submenu",
      icon: <ViewStream/>,
      items: [
        {
          caption: "Subitem 1",
          route: "/subitem1",
          icon: <ViewList/>,
        },
        {
          caption: "Submenu 2",
          icon: <ViewStream/>,
          items: [
            {
              caption: "Subitem 2-1",
              route: "/subitem2-1",
              icon: <ViewList/>,
            },
            {
              caption: "Subitem 2-2",
              route: "/subitem2-2",
              icon: <ViewCompact/>,
            },
          ]
        },
        {
          caption: "Subitem 3",
          route: "/subitem3",
          icon: <ViewColumn/>,
        },
      ],
    },
    {
      type: 'divider'
    },
    {
      caption: "Item 3",
      icon: <ViewColumn/>,
      route: "/item3",
    },
  ]
};

export default function App () {
  return (
    <MenuProvider initValue={menuConfig}>
      <Fragment>
        <ApplicationBar>
            Test Application
        </ApplicationBar>
        <Landing>
          <Switch>
            <Route exact path="/" component={Page} />
            <Route exact path="/item1" component={Page} />
            <Route exact path="/item2" render={(p) => <Page {...p} text="Item 2" />} />
            <Route exact path="/item3" render={(p) => <Page {...p} text="Item 3" />} />
            <Route exact path="/subitem1" render={(p) => <Page {...p} text="Subitem 1" />} />
            <Route exact path="/subitem2-1" render={(p) => <Page {...p} text="Subitem 2-1" />} />
            <Route exact path="/subitem2-2" render={(p) => <Page {...p} text="Subitem 2-2" />} />
            <Route exact path="/subitem3" render={(p) => <Page {...p} text="Subitem 3" />} />
            <Route render={() => <Page text="Default route"/>} />
          </Switch>
        </Landing>
      </Fragment>
    </MenuProvider>
  );
}
