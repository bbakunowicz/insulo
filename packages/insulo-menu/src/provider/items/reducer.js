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

import { SET_PARENT_ITEM, CLEAR_PARENT_ITEM, SET_CURRENT_ITEM, SET_CURRENT_ROUTE, SET_ITEMS, 
  REGISTER_CONTEXT, CALL_DISPATCH, 
  REGISTER_ITEM_VISIBILITY_CALLBACK, REGISTER_ITEM_CAPTION_CALLBACK, REGISTER_SETTING_VISIBILITY_CALLBACK,
  SET_PARENT_SETTING, SET_CURRENT_SETTING, CLEAR_PARENT_SETTING
} from "../types";

export const reducer = (state, action) => {
    switch (action.type) {
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
        if (window._INSULO_DEBUG_ === true) console.log(`SET_CURRENT_ITEM: ${action.item.key}`);
        return {...state, 
          curentItemKey: action.item.key,
          currentItemCaption: action.item.caption,
          currentItemRoute: action.item.route,
          currentItemAltRoute: action.item.altRoute
        }
      case SET_CURRENT_ROUTE:
        if (window._INSULO_DEBUG_ === true) console.log(`SET_CURRENT_ROUTE: ${action.item.key}`);
        return {...state, 
          curentItemKey: action.item.key,
          currentItemCaption: action.item.caption,
          currentItemRoute: action.item.route,
          currentItemAltRoute: action.item.altRoute,
          parentItemKeyArr: typeof action.parentItem == 'object' ? action.parentItem.key.split('.') : undefined,
          parentItemCaption: typeof action.parentItem == 'object' ? action.parentItem.caption : undefined,
        }
      case SET_ITEMS:
        //console.log(action.items);
        return {...state, 
          items: [...action.items], 
        }
      case SET_PARENT_SETTING:
        //console.log(`SET_PARENT_SETTING: ${action.key}, ${action.caption}`);
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
        // console.log(`DISPATCH: action.name = ${action.name}, action.props:`);
        // console.log(action.props);
        // console.log('typeof state.contexts[action.name].dispatch:');
        // console.log(typeof state.contexts[action.name].dispatch);
        if (typeof state.contexts[action.name] == 'object' && typeof state.contexts[action.name].dispatch == 'function'){
          state.contexts[action.name].dispatch(action.props);
        }
        return state;
      case REGISTER_ITEM_VISIBILITY_CALLBACK:
        console.log('REGISTER_ITEM_VISIBILITY_CALLBACK');
        if (typeof action.callback == 'function') {
          return {
            ...state,
            itemVisibilityCallback: action.callback
          }
        }
        else {
          return state;
        }
      case REGISTER_ITEM_CAPTION_CALLBACK:
        if (typeof action.callback == 'function') {
          return {
            ...state,
            itemCaptionCallback: action.callback
          }
        }
        else {
          return state;
        }
      case REGISTER_SETTING_VISIBILITY_CALLBACK:
        if (typeof action.callback == 'function') {
          return {
            ...state,
            settingVisibilityCallback: action.callback
          }
        }
        else {
          return state;
        }
      default:
        return state;
    }
  };
  