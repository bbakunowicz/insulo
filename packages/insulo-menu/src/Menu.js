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

import React, {useContext, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Collapse from '@material-ui/core/Collapse';
import getItem from './utils/getItem';
import findItem from './utils/findItem';
import MenuHeaderLeft from './MenuHeaderLeft';
import MenuHeaderRight from './MenuHeaderRight';
import MenuItemsPanel from './MenuItemsPanel';
import MenuSettingsPanel from './MenuSettingsPanel';
import { Context as MenuContext } from './provider/config/providerWrapper';
import { Context as ItemsContext } from './provider/items/providerWrapper';
import * as menuTypes from './provider/types';


const useStyles = (drawerWidth, anchor) => makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    //width: drawerWidth,
    flexShrink: 0,
    // whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: (isNaN(drawerWidth))?drawerWidth:`${drawerWidth}px`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1,
    // },
  },
  drawerPaper: {
    // transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    width: (isNaN(drawerWidth))?drawerWidth:`${drawerWidth}px`,
  },
  drawerPaperMinimized: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    width: theme.spacing(7) + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1,
    // },
  },
  drawerPaperPrimaryLight: {
    backgroundColor: theme.palette.primary.light
  },
  drawerPaperPrimaryMain: {
    backgroundColor: theme.palette.primary.main
  },
  drawerPaperSecondaryLight: {
    backgroundColor: theme.palette.secondary.light
  },
  drawerPaperSecondaryMain: {
    backgroundColor: theme.palette.secondary.main
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  drawerThemes: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-evenly',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    // padding: theme.spacing(0, 1),
    justifyContent: 'space-between',
  },
  listItemIcon: {
    minWidth: 'auto',
    flexShrink: 0,
    flexGrow: 0,
    paddingRight: theme.spacing(1.5),
    margin: theme.spacing(0.5, 0),
    fontSize: `${theme.spacing(3)}px`,
  },
  listItemIconRight: {
    minWidth: 'auto',
    flexShrink: 0,
    flexGrow: 0,
    margin: theme.spacing(0.5, 0),
  },
  listItemSpan: {
    minWidth: 'auto',
    flexShrink: 0,
    flexGrow: 0,
    width: `${theme.spacing(2.5)}px !important`,
    height: theme.spacing(2.5),
    margin: theme.spacing(0.25, 1.75, 0.25, 0.25),
  },
  listItemSelected: {
    cursor: 'default',
  },
  listItemSelectedPrimaryMain: {
    backgroundColor: `${theme.palette.primary.main} !important`
  },
  listItemSelectedPrimaryDark: {
    backgroundColor: `${theme.palette.primary.dark} !important`
  },
  listItemSelectedSecondaryMain: {
    backgroundColor: `${theme.palette.secondary.main} !important`
  },
  listItemSelectedSecondaryDark: {
    backgroundColor: `${theme.palette.secondary.dark} !important`
  },
  divider: {
    margin: theme.spacing(1,0),
  },
  settingsApplied: {
    backgroundColor: 'rgba(0,0,0,0.08)'
  },
  langButton: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    minWidth: theme.spacing(6),
    borderRadius: '50%',
    padding: theme.spacing(1.5),
  },
  collapseEntered: {
    minHeight: "max-content !important"
  }
}));

const getBackgroundClass = (value) => {
  switch (value) {
    case 'primary-light':
      return 'drawerPaperPrimaryLight'
    case 'primary-main':
      return 'drawerPaperPrimaryMain'
    case 'secondary-light':
      return 'drawerPaperSecondaryLight'
    case 'secondary-main':
      return 'drawerPaperSecondaryMain'
    default:
      return undefined;
  }
}

const getSelectedClass = (value) => {
  switch (value) {
    case 'primary-dark':
      return 'listItemSelectedPrimaryDark'
    case 'primary-main':
      return 'listItemSelectedPrimaryMain'
    case 'secondary-dark':
      return 'listItemSelectedSecondaryDark'
    case 'secondary-main':
      return 'listItemSelectedSecondaryMain'
    default:
      return undefined;
  }
}

export function Menu({children, history, backgroundColor, selectedColor, authConfig}) {

  const { value: menuConfig, dispatch: menuDispatch } = useContext(MenuContext);
  const { value: itemsConfig, dispatch: itemsDispatch } = useContext(ItemsContext);
  
  const backgroundClass = getBackgroundClass(backgroundColor);
  const selectedClass = getSelectedClass(selectedColor);

  //const [settingsApplied, setSettingApplied] = useState(false);

  //console.log(menuConfig.width);


  const classes = useStyles(menuConfig.width)();
  const location = useLocation();

  useEffect(() => {
    //const searchParams = new URLSearchParams(location.search);
    if (typeof location == 'object' && location.pathname ) {
      // console.log(`New location: ${location.pathname}`);
      if (itemsConfig.currentItemRoute !== location.pathname || itemsConfig.currentItemAltRoute !== location.pathname){
        const item = findItem(itemsConfig.items, 'route', location.pathname) || findItem(itemsConfig.items, 'altRoute', location.pathname) ;
        if (typeof item == 'object' && item.key) {
          if (window._INSULO_DEBUG_ === true) console.log(`Menu, itemsConfig.curentItemKey: ${itemsConfig.curentItemKey}`);
          if (item.key !== itemsConfig.curentItemKey) {
            if (window._INSULO_DEBUG_ === true) console.log(`Menu, new itemsConfig.curentItemKey: ${item.key}`);
            itemsDispatch({type: menuTypes.SET_CURRENT_ROUTE, item, parentItem: getItem(itemsConfig.items, item.key.split('.'), true)});
          }
        }
      }
    }
  }, [location, itemsConfig.items, itemsConfig.curentItemKey, itemsConfig.currentItemRoute, itemsConfig.currentItemAltRoute, itemsDispatch ]);

  const toggleDrawer = (open) => (event) => {
    // if (
    //   event &&
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    if (!open) {
      menuDispatch({type: menuTypes.SET_MENU_CLOSE})
    }
  };

  return (
    <div style={{display: 'flex'}}>     
      <SwipeableDrawer
        variant={menuConfig.variant === 'minimized' ? 'permanent' : menuConfig.variant}
        anchor={menuConfig.anchor}
        open={menuConfig.open}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: menuConfig.variant !== menuTypes.MINIMIZED || menuConfig.open,
          [classes.drawerClose]: menuConfig.variant === menuTypes.MINIMIZED && !menuConfig.open,
        })}
        classes={{
          paper: clsx(
            backgroundClass && classes[backgroundClass], 
            {
              [classes.drawerPaper]: menuConfig.variant !== menuTypes.MINIMIZED || menuConfig.open,
              [classes.drawerPaperMinimized]: menuConfig.variant === menuTypes.MINIMIZED && !menuConfig.open
            }
          )
        }}
      >
        { menuConfig.anchor === 'right' ? 
          <MenuHeaderRight classes={classes} /> :
          <MenuHeaderLeft classes={classes} />
        }
        {
          itemsConfig.settings &&
          <Collapse in={menuConfig.settingsOpen} classes={{entered: classes.collapseEntered}}>
            <MenuSettingsPanel classes={classes} selectedClass={selectedClass}/>
          </Collapse>
        }
        { 
          itemsConfig.items && <MenuItemsPanel classes={classes} history={history} selectedClass={selectedClass} authConfig={authConfig} />
        } 
        {/* <button onClick={() => setState1(state1 + 1)}>
          Click
        </button>
        <div>
          State 1: {state1}
        </div> */}
      </SwipeableDrawer>
    </div>
  );
}
