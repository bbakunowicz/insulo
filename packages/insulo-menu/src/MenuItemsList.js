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
import { Context as MenuContext } from './provider/config/providerWrapper';
import { Context as ItemsContext } from './provider/items/providerWrapper';
import * as menuTypes from './provider/types';

const onItemChange = (item, history) => {
  if (item !== undefined && typeof item.route == 'string') {
      history.push(item.route)
  }
}

const renderItem = (item, classes, menuConfig, menuDispatch, itemsConfig, itemsDispatch, history, selectedClass, authConfig) => {

  if (item.type === 'divider') {
    return (
      <Divider key={item.key} classes={{root: classes.divider}}/>
    )
  }
  else {
    // const isItemVisible = (typeof itemsConfig.itemVisibilityCallback == 'function' && typeof item.visibleParams == 'object' )? 
    //   itemsConfig.itemVisibilityCallback(item.visibleParams): itemsConfig.defaultVisible === true;
    const isItemVisible = (item.key === itemsConfig.curentItemKey) || 
    ((typeof itemsConfig.getItemVisibility == 'function' && typeof item.visibleParams == 'object' )? 
      (typeof authConfig == 'object')?itemsConfig.getItemVisibility(authConfig.authValues)(item.visibleParams):false
      : true); //itemsConfig.defaultVisible === true;

    if (!isItemVisible) {
      return (
        <Fragment key={item.key}></Fragment>
      )
    }

    const itemCaption = (typeof itemsConfig.itemCaptionCallback == 'function' && item.captionId) && itemsConfig.itemCaptionCallback(item.captionId);
    const menuMaximized = menuConfig.variant !== menuTypes.MINIMIZED || menuConfig.open;

    return (
      <ListItem 
        button 
        // classes={ { root: clsx(classes.listItem, item.key === menuConfig.curentItemKey && classes.listItemSelected) }}
        classes={ { 
          root: clsx(classes.listItem), 
          selected: clsx(classes.listItemSelected, selectedClass && classes[selectedClass]) }}
        key={item.key}
        selected = {item.key === itemsConfig.curentItemKey}
        disableRipple = {item.key === itemsConfig.curentItemKey}
        disableTouchRipple = {item.key === itemsConfig.curentItemKey}
        onClick={e => {
          if (item.key !== itemsConfig.curentItemKey) {
            if (Array.isArray(item.items)) {
              itemsDispatch({type: menuTypes.SET_PARENT_ITEM, key: item.key, caption: itemCaption || item.caption});
            }
            else {
              itemsDispatch({type: menuTypes.SET_CURRENT_ITEM, item});
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
        {menuMaximized && (<ListItemText primary={itemCaption || item.caption} />)}
        {item.items && menuMaximized && (
            <ListItemIcon className={classes.listItemIconRight}><KeyboardArrowRightIcon /></ListItemIcon>
        )}
      </ListItem>
    ); 
  }
}

const MenuPanel = ({classes, history, selectedClass, authConfig}) => {
  const { value: menuConfig, dispatch: menuDispatch } = useContext(MenuContext);
  const { value: itemsConfig, dispatch: itemsDispatch } = useContext(ItemsContext);

  if (window._INSULO_DEBUG_ === true) console.log(`MenuItemsList, itemsConfig.curentItemKey: ${itemsConfig.curentItemKey}`);

  let items = itemsConfig.items && [ ...itemsConfig.items];
  let key = itemsConfig.parentItemKeyArr && [...itemsConfig.parentItemKeyArr];
  while (Array.isArray(key) && key.length>0){
    items = items[key[0]].items;
    key.shift();
  }

  return (
    <Fragment>
      { Array.isArray(items) && items.map((data) => {
        return renderItem( data, classes, menuConfig, menuDispatch, itemsConfig, itemsDispatch, history, selectedClass, authConfig);
      })}
    </Fragment>
  )
}

export default MenuPanel;