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

import * as types from "./types";

export const reducer = (state, action) => {
    switch (action.type) {
      case types.SET_THEME_TYPE:
        if (!action.themeType) return state;
        if (!action.typeSetter || action.typeSetter !== 'init') {
          localStorage.setItem(types.LS_THEME_TYPE, action.themeType);
        }
        return {...state, 
          type: action.themeType,
          typeSetter: action.typeSetter || 'application'
        }
      case types.SET_THEME:
        if (!action.current) return state;
        localStorage.setItem(types.LS_THEME_CURRENT, action.current);
        return {...state, 
          current: action.current,
        }
      case types.SET_THEMES:
        return {...state, 
          themesCnv: {...action.themesCnv},
        }
      default:
        return state;
    }
  };
