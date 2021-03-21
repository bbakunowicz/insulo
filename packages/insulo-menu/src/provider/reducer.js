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

import { SET_MENU_OPEN, SET_MENU_CLOSE, SET_MENU_SETTINGS_STATE, SET_MENU_VARIANT, LS_MENU_VARIANT, LS_MENU_OPENED,
  SET_PARENT_ITEM, CLEAR_PARENT_ITEM, SET_CURRENT_ITEM, SET_CURRENT_ROUTE, SET_ITEMS, SET_PERSISTENT_ENABLED,
  REGISTER_CONTEXT, CALL_DISPATCH, 
  SET_PARENT_SETTING, SET_CURRENT_SETTING, CLEAR_PARENT_SETTING
} from "./types";

export const reducer = (state, action) => {
    switch (action.type) {
      case SET_MENU_OPEN:
        localStorage.setItem(LS_MENU_OPENED, true);
        return {...state, 
          open: true,
        }
      case SET_MENU_CLOSE:
        localStorage.setItem(LS_MENU_OPENED, false);
        return {...state, 
          open: false,
        }
      case SET_MENU_SETTINGS_STATE:
        return {...state, 
          settingsOpen: action.settingsOpen,
      }
      case SET_MENU_VARIANT:
        localStorage.setItem(LS_MENU_VARIANT, action.variant, action.init);
        return {...state, 
          variant: action.variant,
          open: action.variant === 'minimized' ? false : action.init ? state.open : true,
          settingsOpen: action.variant === 'minimized' ? false : action.init ? state.settingsOpen : true
        }
      case SET_PARENT_ITEM:
        return {...state, 
          parentItemKeyArr: action.key.split('.'),
          parentItemCaption: action.caption
        }
      case CLEAR_PARENT_ITEM:
        return {...state, 
          parentItemKeyArr: undefined,
          parentItemCaption: undefined
        }
      case SET_CURRENT_ITEM:
        if (window._INSULO_DEBUG_ === true) {
          console.info('SET_CURRENT_ITEM: ', action.item);
        }

        return {...state, 
          curentItemKey: (typeof action.item == 'object') ? action.item.key: undefined,
          currentItemCaption: (typeof action.item == 'object') ? action.item.caption: undefined,
          currentItemRoute:(typeof action.item == 'object') ?  action.item.route: undefined,
          currentItemAltRoute: (typeof action.item == 'object') ? action.item.altRoute: undefined
        }
      case SET_CURRENT_ROUTE:
        if (window._INSULO_DEBUG_ === true) {
          console.info('SET_CURRENT_ROUTE ', action.item);
        }

        return {...state, 
          curentItemKey: (typeof action.item == 'object') ? action.item.key: undefined,
          currentItemCaption: (typeof action.item == 'object') ? action.item.caption: undefined,
          currentItemRoute: (typeof action.item == 'object') ? action.item.route: undefined,
          currentItemAltRoute: (typeof action.item == 'object') ? action.item.altRoute: undefined,
          parentItemKeyArr: typeof action.parentItem == 'object' ? action.parentItem.key.split('.') : undefined,
          parentItemCaption: typeof action.parentItem == 'object' ? action.parentItem.caption : undefined,
        }
      case SET_ITEMS:
        return {...state, 
          items: [...action.items], 
        }
      case SET_PARENT_SETTING:
        return {...state, 
          parentSettingsKey: action.key,
          parentSettingsKeyArr: action.key.split('.'),
          parentSettingsCaption: action.caption
        }
      case CLEAR_PARENT_SETTING:
        return {...state, 
          parentSettingsKeyArr: undefined,
          parentSettingsCaption: undefined
        }
      case SET_CURRENT_SETTING:
        let currentSettingsKeys = {...state.currentSettingsKeys};
        currentSettingsKeys[state.parentSettingsKey] = action.item.key;
        return {...state, 
          currentSettingsKeys
        }
      case SET_PERSISTENT_ENABLED:
        return {...state,
          persistentEnabled: action.persistentEnabled
        }
      case REGISTER_CONTEXT:
        if (typeof action.name == 'string' && typeof action.config == 'object' && typeof action.dispatch == 'function') {
          let contexts = {...state.contexts};
          contexts[action.name] = {config: action.config, dispatch: action.dispatch};
          return {
            ...state,
            contexts
          }
        }
        else {
          return state;  
        }
      case CALL_DISPATCH:
        if (typeof state.contexts[action.name] == 'object' && typeof state.contexts[action.name].dispatch == 'function'){
          state.contexts[action.name].dispatch(action.props);
        }
        return state;
      default:
        return state;
    }
  };
  