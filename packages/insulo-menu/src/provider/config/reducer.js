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

import { SET_MENU_OPEN, SET_MENU_CLOSE, SET_MENU_SETTINGS_STATE, SET_MENU_VARIANT, SET_MENU_WIDTH, LS_MENU_VARIANT, LS_MENU_OPENED
} from "../types";

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
      case SET_MENU_WIDTH:
        return {...state, 
          width: action.width,
        }
      default:
        return state;
    }
  };
  