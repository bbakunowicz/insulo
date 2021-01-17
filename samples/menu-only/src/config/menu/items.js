import React from 'react';
import { ViewList, ViewCompact, ViewStream, ViewColumn } from '@material-ui/icons';

const items = [
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
];

export default items;