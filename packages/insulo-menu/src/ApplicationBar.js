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
import AppBar from '@material-ui/core/AppBar';
import { Context as MenuContext } from './provider/providerWrapper';
import * as menuTypes from './provider/types';
import Content from './ApplicationBarContent';

const useStyles = (drawerWidth) => makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarMinimized: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    // width: isNaN()?`calc(100% - ${drawerWidth})`:`calc(100% - ${drawerWidth}px)`,
    // marginLeft: isNaN()?`calc(100% - ${drawerWidth})`:`calc(100% - ${drawerWidth}px)`,
    width: (isNaN(drawerWidth))?`calc(100% - ${drawerWidth})`:`calc(100% - ${drawerWidth}px)`,
    marginLeft: (isNaN(drawerWidth))?`calc(100% - ${drawerWidth})`:`calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
 }));
  
export function ApplicationBar({position = "fixed", children, ApplicationBarContent}) {
  const { value: menuConfig, dispatch: menuDispatch } = useContext(MenuContext);
  const classes = useStyles(menuConfig.width)();

  const ApplicationBarContentCnv = ApplicationBarContent || menuConfig.ApplicationBarContent || Content;
  return (
    <div style={{display: 'flex'}}>
      <AppBar
          position={position}
          className={clsx(classes.appBar, {
          [classes.appBarShift]: menuConfig.open && menuConfig.anchor !== 'right',
          [classes.appBarMinimized]: menuConfig.variant === menuTypes.MINIMIZED && (menuConfig.anchor !== 'right' || !menuConfig.open),
          })}
      >
        <ApplicationBarContentCnv menuConfig={menuConfig} menuDispatch={menuDispatch}>
          {children}
        </ApplicationBarContentCnv>
      </AppBar>
    </div>
  );
}