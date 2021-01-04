import React from 'react'
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { FaHome } from "react-icons/fa";

export default () => { 
  return [
    {
      caption: "Dashboard",
      icon: <FaHome />,
      route: "/",
    },
    {
      caption: "Submenu",
      icon: <ViewStreamIcon />,
      items: [
        {
          caption: "Subitem 1-1",
          route: "/subitem1-1",
          icon: <ViewColumnIcon />,
        },
        {
          caption: "Subitem 1-2",
          icon: <ViewListIcon />,
          items: [
            {
              caption: "Subitem 1-2-1",
              route: "/subitem1-2-1",
              icon: <ViewAgendaIcon />,
            },
            {
              caption: "Subitem 1-2-2",
              route: "/subitem1-2-2",
              icon: <ViewArrayIcon />,
            },
          ]
        },
        {
          caption: "Subitem 1-3",
          route: "/subitem1-3",
          icon: <ViewCarouselIcon />,
        }
      ],
    },
    {
      caption: "Item 2",
      icon: <ViewCompactIcon />,
      route: "/item2",
    },
    {
      caption: "Item 3",
      icon: <ViewModuleIcon />,
      route: "/item3",
    }
  ];
}