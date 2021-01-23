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
import { Context as MenuContext } from './provider/providerWrapper';
import * as menuTypes from './provider/types';

const renderItem = (item, classes, menuConfig, menuDispatch, selectedClass, settingsVibilityValues, itemCaptionCallback) => {
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
      if (typeof menuConfig.contexts[item.context] == 'object' && typeof menuConfig.contexts[item.context].config == 'object') {
        configPropValue = menuConfig.contexts[item.context].config[item.configProp[0]];
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

  if (configPropValue && configPropValue === item.configValue) {
    itemSelected = true;
  }

  let isItemVisible = itemSelected;
  if (!itemSelected) {
    try {
      if (item.authPropsType === 'persistent') {
        isItemVisible = menuConfig.persistentEnabled;
      }
      else {
        isItemVisible = ((typeof menuConfig.getSettingVisibility == 'function')? menuConfig.getSettingVisibility(settingsVibilityValues, item): true);
      }
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

  let itemCaption = item.caption;


  if (typeof itemCaptionCallback == 'function' && item.captionId) {
    try {
      itemCaption = itemCaptionCallback(item.captionId);
    }
    catch (e) {
      console.error(`MenuSettingsList.renderItem: itemCaptionCallback error: ${e.message}`);
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
        selected = {itemSelected}
        disableRipple = {itemSelected}
        disableTouchRipple = {itemSelected}
        onClick={e => {
          if (!itemSelected) {
            if (Array.isArray(item.items)) {
              menuDispatch({type: menuTypes.SET_PARENT_SETTING, key: item.key, caption: itemCaption});
            }
            else {
              try {
                if (typeof item.dispatcherProps == 'object' && item.dispatcherProps.type) {
                  if (item.context) {
                    menuDispatch({type: menuTypes.CALL_DISPATCH, name: item.context, props: item.dispatcherProps});
                  }
                  else {
                    menuDispatch(item.dispatcherProps);
                  }
                }
                else {
                  throw new Error('item.dispatcherProps.type is undefined');
                }
              }
              catch (e) {
                console.error(`MenuSettingsItems error (onClick): ${e.message}`);
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
        { menuMaximized && (<ListItemText primary={itemCaption} />)}
        {item.items && menuMaximized && (
            <ListItemIcon className={classes.listItemIconRight}><KeyboardArrowRightIcon /></ListItemIcon>
        )}
      </ListItem>
    ); 
  }
}

const MenuSettingsItems = ({classes, selectedClass, settingsVibilityValues, itemCaptionCallback}) => {

  const { value: menuConfig, dispatch: menuDispatch } = useContext(MenuContext);

  let items = menuConfig.settings && [ ...menuConfig.settings];
  let key = menuConfig.parentSettingsKeyArr && [...menuConfig.parentSettingsKeyArr];
  while (Array.isArray(key) && key.length>0){
    items = items[key[0]].items;
    key.shift();
  }

  return (
    <Fragment>
      { Array.isArray(items) && items.map((data) => {
          return renderItem( data, classes, menuConfig, menuDispatch, selectedClass, settingsVibilityValues, itemCaptionCallback);
      })}
    </Fragment>
  )
}

export default MenuSettingsItems;