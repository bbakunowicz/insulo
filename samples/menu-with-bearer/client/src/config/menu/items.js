import React from 'react';
import { ViewList, ViewCompact, ViewStream, ViewColumn } from '@material-ui/icons';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

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
    caption: "Sample Data",
    icon: <ViewCompact/>,
    route: "/data",
    //authProps: {roles: ['user']},
  },
  {
    caption: "Hidden Submenu",
    icon: <ViewStream/>,
    authProps: {roles: ['user']},
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
    caption: "Item 3",
    icon: <ViewColumn/>,
    route: "/item3",
    authProps: {roles: ['user']},
  },
  {
    type: 'divider'
  },
  {
    caption: "Sign In",
    captionId: "item_sign_in",
    authProps: {unauthenticated: true},
    icon: <FaSignInAlt />,
    route: "/login",
  },
  {
    caption: "Sign Out",
    captionId: "item_sign_out",
    authProps: {roles: ['user']},
    icon: <FaSignOutAlt />,
    route: "/logout",
  }
];

export default items;