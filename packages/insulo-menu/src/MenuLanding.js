/*************************************************************************
   Copyright 2020 Bartosz Bakunowicz

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
***************************************************************************/

import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Context as MenuContext } from './provider/providerWrapper';
import * as menuTypes from './provider/types';

const useStyles = (drawerWidth) => makeStyles((theme) => {
  const themeSpacing = theme.spacing(3);
  return  {
  drawerHeader: {
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: `0px ${themeSpacing}px ${themeSpacing}px ${themeSpacing}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  contentShiftMinimized: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.spacing(7) + 1,
  },
  contentShiftLeft: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  contentShiftLeftMinimized: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: theme.spacing(7) + 1,
  },
}});

export function MenuLanding({children}) {
  const { value: menuConfig } = useContext(MenuContext);

  const classes = useStyles(menuConfig.width)();

    return (
        <main
        className={clsx(classes.content, {
          [classes.contentShift]: menuConfig.open && menuConfig.variant !== menuTypes.TEMPORARY && menuConfig.anchor !== 'right',
          [classes.contentShiftMinimized]: !menuConfig.open && menuConfig.variant === menuTypes.MINIMIZED && menuConfig.anchor !== 'right',
          [classes.contentShiftLeft]: menuConfig.open && menuConfig.variant !== menuTypes.TEMPORARY && menuConfig.anchor === 'right',
          [classes.contentShiftLeftMinimized]: !menuConfig.open && menuConfig.variant === menuTypes.MINIMIZED && menuConfig.anchor === 'right',
        })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
    );
}