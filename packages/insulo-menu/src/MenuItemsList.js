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

import React, {Fragment, useContext} from 'react';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Context as MenuContext } from './provider/providerWrapper';
import * as menuTypes from './provider/types';

const onItemChange = (item, history) => {
  if (item !== undefined && typeof item.route == 'string') {
      history.push(item.route)
  }
}

const renderItem = (item, classes, menuConfig, menuDispatch, history, selectedClass, itemVibilityValues, itemCaptionCallback) => {

  if (item.type === 'divider') {
    return (
      <Divider key={item.key} classes={{root: classes.divider}}/>
    )
  }
  else {
    let isItemVisible = (item.key === menuConfig.curentItemKey);
    if (!isItemVisible) {
      try {
        isItemVisible = ((typeof menuConfig.getItemVisibility == 'function')? menuConfig.getItemVisibility(itemVibilityValues, item.authProps) : true); 
      }
      catch (e) {
        console.error(`getItemVisibility error: ${e.message}`);
      }
    }

    if (!isItemVisible) {
      return (
        <Fragment key={item.key}></Fragment>
      )
    }

    let itemCaption = item.caption;
    
    if (typeof itemCaptionCallback == 'function' && item.captionId) {
      try {
        itemCaption = itemCaptionCallback(item.captionId);
      }
      catch (e) {
        console.error(`MenuItemsList.renderItem: itemCaptionCallback error: ${e.message}`);
      }
    }

    const menuMaximized = menuConfig.variant !== menuTypes.MINIMIZED || menuConfig.open;

    return (
      <ListItem 
        button 
        classes={ { 
          root: clsx(classes.listItem), 
          selected: clsx(classes.listItemSelected, selectedClass && classes[selectedClass]) }}
        key={item.key}
        selected = {item.key === menuConfig.curentItemKey}
        disableRipple = {item.key === menuConfig.curentItemKey}
        disableTouchRipple = {item.key === menuConfig.curentItemKey}
        onClick={e => {
          if (window._INSULO_DEBUG_ === true) {
            console.log('MenuItemsList.renderItem <onClick>, item:');
            console.log(item);
          }

          if (item.key !== menuConfig.curentItemKey) {
            if (Array.isArray(item.items)) {
              menuDispatch({type: menuTypes.SET_PARENT_ITEM, key: item.key, caption: itemCaption});
            }
            else {
              menuDispatch({type: menuTypes.SET_CURRENT_ITEM, item});
              onItemChange(item, history);
              if (menuConfig.variant === menuTypes.TEMPORARY) {
                menuDispatch({type: menuTypes.SET_MENU_CLOSE});
              }
            }

            if (item.onClick) {
              item.onClick()
            }
          }

        }}>
        {item.icon && <ListItemIcon classes={{ root: clsx(classes.listItemIcon)}}>{item.icon}</ListItemIcon>}
        {menuMaximized && (<ListItemText primary={itemCaption} />)}
        {item.items && menuMaximized && (
            <ListItemIcon className={classes.listItemIconRight}><KeyboardArrowRightIcon /></ListItemIcon>
        )}
      </ListItem>
    ); 
  }
}

const MenuItemsList = ({classes, history, selectedClass, itemVibilityValues, itemCaptionCallback}) => {
  const { value: menuConfig, dispatch: menuDispatch } = useContext(MenuContext);

  if (window._INSULO_DEBUG_ === true) console.log(`MenuItemsList, menuConfig.curentItemKey: ${menuConfig.curentItemKey}`);

  let items = menuConfig.items && [ ...menuConfig.items];
  let key = menuConfig.parentItemKeyArr && [...menuConfig.parentItemKeyArr];
  while (Array.isArray(key) && key.length>0){
    items = items[key[0]].items;
    key.shift();
  }

  return (
    <Fragment>
      { Array.isArray(items) && items.map((data) => {
        return renderItem( data, classes, menuConfig, menuDispatch, history, selectedClass, 
          itemVibilityValues, itemCaptionCallback);
      })}
    </Fragment>
  )
}

export default MenuItemsList;