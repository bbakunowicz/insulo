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

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import * as menuTypes from './provider/types';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  toolbarMinPadding: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }
 }));
  
export default function Content({children, menuConfig, menuDispatch}) {
  const classes = useStyles();

  return (
    <Toolbar className={clsx(menuConfig.variant === menuTypes.MINIMIZED && classes.toolbarMinPadding)}>
      {menuConfig.anchor === "right" &&
        <Typography variant="h6" noWrap className={classes.title}>
          {children}
        </Typography>
      }
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => menuDispatch({type: menuTypes.SET_MENU_OPEN})}
        edge= { menuConfig.anchor === "right" ? "end" : "start"}
        className={clsx(menuConfig.anchor !== "right" && classes.menuButton, menuConfig.open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>

      {menuConfig.anchor !== "right" &&
        <Typography variant="h6" noWrap className={classes.title}>
          {children}
        </Typography>
      }
    </Toolbar>
  );
}