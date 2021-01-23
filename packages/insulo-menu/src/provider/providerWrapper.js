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

import React, { createContext, useReducer } from "react";
import Provider from './provider';
import { reducer } from "./reducer";
import useLocalStorage from './localStorage';
import * as menuTypes from './types'
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const Context = createContext();

const addId = (inputData, baseKey) => {
  return inputData.map((data, idx) => { 
    const key = (baseKey)?`${baseKey}.${idx}`:`${idx}`
    if (data.items) {
      const items = addId(data.items, key);
      return {
        ...data, key, items
        };
    }
    else {
      return {
        ...data, key
        };
    }
  })
}

const getSettings = (initValue) => {
  if (window._INSULO_DEBUG_ === true) console.log('MenuProvider: getSettings');

  let settings = [];

  try {
    const menuVariants = {
      caption: "Menu variants",
      captionId: menuTypes.MENU_VARIANTS,
      icon: <MenuIcon />,
      items: []
    };
  
    const variantTemporary = {
      caption: "Temporary",
      captionId: menuTypes.MENU_TEMPORARY,
      icon: <MenuOpenIcon />,
      dispatcherProps: {type: menuTypes.SET_MENU_VARIANT, variant: menuTypes.TEMPORARY},
      configProp: ['variant'],
      configValue: menuTypes.TEMPORARY
    };
  
    const variantPersistent = {
      caption: "Persistent",
      captionId: menuTypes.MENU_PERSISTENT,
      icon: <MenuIcon />,
      dispatcherProps: {type: menuTypes.SET_MENU_VARIANT, variant: menuTypes.PERSISTENT},
      configProp: ['variant'],
      configValue: menuTypes.PERSISTENT,
      authProps: { persistentEnabled: true },
      authPropsType: 'persistent'
    };
  
    const variantMini = {
      caption: "Mini",
      captionId: menuTypes.MENU_MINIMIZED,
      icon: < MoreVertIcon />,
      dispatcherProps: {type: menuTypes.SET_MENU_VARIANT, variant: menuTypes.MINIMIZED},
      configProp: ['variant'],
      configValue: menuTypes.MINIMIZED,
    };
  
    let persistentFound = false;
    let temporaryFound = false;
    let miniFound = false;
  
    if (Array.isArray(initValue.availableVariants) && initValue.availableVariants.length > 1) {
      for (let i = 0; i< initValue.availableVariants.length; i++) {
        if (initValue.availableVariants[i] === menuTypes.TEMPORARY && !temporaryFound) {
          temporaryFound = true;
          menuVariants.items.push(variantTemporary);
        }
        else if (initValue.availableVariants[i] === menuTypes.PERSISTENT && !persistentFound) {
          persistentFound = true;
          menuVariants.items.push(variantPersistent);
        }
        else if (initValue.availableVariants[i] === menuTypes.MINIMIZED && !miniFound) {
          miniFound = true;
          menuVariants.items.push(variantMini);
        }
      }
    }

    if (menuVariants.items.length > 1) {
      settings.push(menuVariants);
    }
  
    if (Array.isArray(initValue.settings)) {
      settings.push.apply(settings, initValue.settings)
    }
    else if (typeof initValue.getSettingsItems == 'function') {
      const tmpSettings = initValue.getSettingsItems();
      if (Array.isArray(tmpSettings)) {
        settings.push.apply(settings, tmpSettings)
      }
    }

    return addId(settings);
  }
  catch (e) {
    console.error(`MenuItemsProvider error (settings): ${e.message}`);
  }
}

const getItems = (initValue) => {
  try {
    const items = Array.isArray(initValue.items)? addId(initValue.items) : addId(initValue.getMenuItems());
    if (window._INSULO_DEBUG_ === true) {
      console.log('MenuProvider.getItems, initValue:');
      console.log(initValue);
      console.log('MenuProvider.getItems, items:');
      console.log(items);
    }
    return items;
  }
  catch (e) {
    console.error(`MenuItemsProvider error (items): ${e.message}`);
  }
}

export const MenuProvider = ({ children, initValue }) => {
  const anchor = typeof initValue == 'object' && ((initValue.anchor === 'left' || initValue.anchor === 'right') ? initValue.anchor : 'left');

  if (window._INSULO_DEBUG_ === true) {
    console.log('MenuProvider (begin) -----------------------------------------------------------------------------');
    console.log(initValue);
  }

  const settings = React.useMemo(() => getSettings(initValue), [initValue]);
  const items = React.useMemo(() => getItems(initValue), [initValue]);
  const persistentEnabled = (!isNaN(initValue.persistentMenuMinWindowSize))? window.innerWidth > initValue.persistentMenuMinWindowSize : true;
  //const items = Array.isArray(initValue.items)? addId(initValue.items) : addId(initValue.getMenuItems());

  const [value, dispatch] = useReducer(reducer, {...initValue, open: false, settingsOpen: false, anchor: anchor||'left',
    contexts: {}, items: items||[], settings: settings||[], currentSettingsKeys: {}, persistentEnabled});

  useLocalStorage(value, dispatch);

  if (window._INSULO_DEBUG_ === true) {
    console.log('items:');
    console.log(items);
    console.log('settings:');
    console.log(settings);
    console.log('MenuProvider (end) -------------------------------------------------------------------------------');
  }

  return Provider({children, Context, value, dispatch});
};
