
import React from 'react'
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';

// #Authentication(start)
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserTie, FaUserShield, FaUserSecret } from "react-icons/fa";
// #Authentication(stop)

import { FaHome } from "react-icons/fa";
import { ImTable2 } from "react-icons/im";

const items = [
  {
    caption: "Dashboard",
    captionId: "item_home",
    icon: <FaHome />,
    route: "/dashboard",
    altRoute: "/",
  },
  {
    caption: "Sample Data",
    captionId: "item_sample",
    icon: <ImTable2 />,
    route: "/calories",
  },
  {
    caption: "Submenu",
    captionId: "item_submenu",
    icon: <ViewStreamIcon />,
    items: [
      {
        caption: "Subitem 1-1",
        captionId: "item_1_1",
        route: "/subitem1-1",
        icon: <ViewColumnIcon />,
      },
      {
        caption: "Subitem 1-2",
        captionId: "item_1_2",
        icon: <ViewListIcon />,
        items: [
          {
            caption: "Subitem 1-2-1",
            captionId: "item_1_2_1",
            route: "/subitem1-2-1",
            icon: <ViewAgendaIcon />,
          },
          {
            caption: "Subitem 1-2-2",
            captionId: "item_1_2_2",
            route: "/subitem1-2-2",
            icon: <ViewArrayIcon />,
          },
        ]
      },
      {
        caption: "Subitem 1-3",
        captionId: "item_1_3",
        route: "/subitem1-3",
        icon: <ViewCarouselIcon />,
      },
    ],
  },
  // #Authentication(start)
  {
    caption: "User's Page",       
    captionId: "item_user",
    icon: <FaUser />,
    route: "/useritem",
  },
  {
    caption: "Admin's Page",
    captionId: "item_admin",
    icon: <FaUserTie />,
    route: "/adminitem",
  },
  {
    caption: "User's Hidden Page",       
    captionId: "item_user_hidden",
    authProps: {roles: ['user']},
    icon: <FaUserShield />,
    route: "/userhiddenitem",
  },
  {
    caption: "Admin's Hidden Submenu",
    captionId: "item_submenu_admin",
    authProps: {roles: ['admin']},
    icon: <FaUserSecret />,
    items: [
      {
        caption: "Subitem 2-1",
        captionId: "item_2_1",
        route: "/subitem2-1",
        icon: <ViewComfyIcon />,
      },
      {
        caption: "Subitem 2-2 with subitems",
        captionId: "item_2_2",
        icon: <ViewDayIcon />,
        items: [
          {
            caption: "Subitem 2-2-1",
            captionId: "item_2_2_1",
            route: "/subitem2-2-1",
            icon: <ViewCompactIcon />,
          },
          {
            caption: "Subitem 2-2-2",
            captionId: "item_2_2_2",
            route: "/subitem2-2-2",
            icon: <ViewModuleIcon />,
          },
        ]
      },
      {
        caption: "Subitem 2-3",
        captionId: "item_2_3",
        route: "/subitem2-3",
        icon: <ViewQuiltIcon />,
      },
    ],
  },
  {
    type: 'divider'
  },
  {
    caption: "Sign In",
    captionId: "item_sign_in",
    authProps: {except: ['user']},
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
  // #Authentication(stop)
];

export default items;