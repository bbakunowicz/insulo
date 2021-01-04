import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {menuTypes} from 'insulo-menu';

export default () => { 
  return [
    {
      caption: "Menu variants",
      icon: <MenuIcon />,
      items: [
        {
          caption: "Temporary",
          icon: <MenuOpenIcon />,
          dispatcherProps: {type: menuTypes.SET_MENU_VARIANT, variant: menuTypes.TEMPORARY},
          configProp: ['variant'],
          configValue: menuTypes.TEMPORARY
        },
        {
          caption: "Persistent",
          icon: <MenuIcon />,
          dispatcherProps: {type: menuTypes.SET_MENU_VARIANT, variant: menuTypes.PERSISTENT},
          configProp: ['variant'],
          configValue: menuTypes.PERSISTENT,
        },
        {
          caption: "Minimized",
          icon: < MoreVertIcon />,
          dispatcherProps: {type: menuTypes.SET_MENU_VARIANT, variant: menuTypes.MINIMIZED},
          configProp: ['variant'],
          configValue: menuTypes.MINIMIZED,
        },
      ],
    },
  ];
}
