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
import Box from '@material-ui/core/Box';
//import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Context as MenuContext } from './provider/config/providerWrapper';
import { Context as ItemsContext } from './provider/items/providerWrapper';
import * as menuTypes from './provider/types';

const renderItem = (item, classes, menuConfig, menuDispatch, itemsConfig, itemsDispatch, selectedClass, settingsVibilityValues) => {
  if (item.type === 'divider') {
    return (
      <Divider key={item.key} classes={{root: classes.divider}}/>
    )
  }
  else {

  let itemSelected = false;
  let configPropValue = undefined;

  if (Array.isArray(item.configProp) && item.configProp.length > 0) {
    if (item.context) {
      if (typeof itemsConfig.contexts[item.context] == 'object' && typeof itemsConfig.contexts[item.context].config == 'object') {
        configPropValue = itemsConfig.contexts[item.context].config[item.configProp[0]];
      }
    }
    else {
      configPropValue = menuConfig[item.configProp[0]];
    }
    if (configPropValue) {
      for (let i = 1; i< item.configProp.length; i++){
        if (typeof configPropValue == 'object'){
          configPropValue = configPropValue[item.configProp[i]];
        }
        else {
          configPropValue = undefined;
        }
      }
    }
  }

  // console.log(`item.configProp: ${item.configProp}, configPropValue: ${configPropValue}, item.configValue: ${item.configValue}, itemsConfig.contexts:`);
  // console.log(itemsConfig.contexts);

  if (configPropValue && configPropValue === item.configValue) {
    itemSelected = true;
  }

  let isItemVisible = itemSelected;
  if (!itemSelected) {
    try {
      isItemVisible = ((typeof itemsConfig.getSettingVisibility == 'function')? itemsConfig.getSettingVisibility(settingsVibilityValues, item): true);
    }
    catch (e) {
      console.error(`getSettingVisibility error: ${e.message}`);
    }
  }

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
        classes={ { 
          root: clsx(classes.listItem), 
          selected: clsx(classes.listItemSelected, selectedClass && classes[selectedClass]) }}
        key={item.key}
        selected = {itemSelected}
        disableRipple = {itemSelected}
        disableTouchRipple = {itemSelected}
        onClick={e => {
          if (!itemSelected) {
            if (Array.isArray(item.items)) {
              itemsDispatch({type: menuTypes.SET_PARENT_SETTING, key: item.key, caption: itemCaption || item.caption});
            }
            else {
              if (item.context) {
                itemsDispatch({type: menuTypes.CALL_DISPATCH, name: item.context, props: item.dispatcherProps});
              }
              else {
                if (typeof item.dispatcherProps == 'object' && item.dispatcherProps.type) {
                  itemsDispatch(item.dispatcherProps);
                  menuDispatch(item.dispatcherProps);
                }
              }
            }

            if (item.onClick) {
              item.onClick()
            }
          }

        }}>
        { item.icon && 
          <ListItemIcon style={{color: item.iconColor}} classes={{ root: clsx(classes.listItemIcon)}}>
            {itemSelected && item.iconSelected ? item.iconSelected : item.icon}
          </ListItemIcon>
        }
        { !item.icon &&
            <Box component="span" className={clsx(item.classes, classes.listItemSpan)}></Box>
        }
        { menuMaximized && (<ListItemText primary={itemCaption || item.caption} />)}
        {item.items && menuMaximized && (
            <ListItemIcon className={classes.listItemIconRight}><KeyboardArrowRightIcon /></ListItemIcon>
        )}
      </ListItem>
    ); 
  }
}

const MenuSettingsItems = ({classes, selectedClass, settingsVibilityValues}) => {

  const { value: menuConfig, dispatch: menuDispatch } = useContext(MenuContext);
  const { value: itemsConfig, dispatch: itemsDispatch } = useContext(ItemsContext);

  let items = itemsConfig.settings && [ ...itemsConfig.settings];
  let key = itemsConfig.parentSettingsKeyArr && [...itemsConfig.parentSettingsKeyArr];
  while (Array.isArray(key) && key.length>0){
    items = items[key[0]].items;
    key.shift();
  }

  return (
    <Fragment>
      { Array.isArray(items) && items.map((data) => {
          return renderItem( data, classes, menuConfig, menuDispatch, itemsConfig, itemsDispatch, selectedClass, settingsVibilityValues);
      })}
    </Fragment>
  )
}

export default MenuSettingsItems;