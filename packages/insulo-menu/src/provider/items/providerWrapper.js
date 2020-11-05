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

import { createContext } from "react";
import Provider from '../provider';
import { reducer } from "./reducer";

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

export const MenuItemsProvider = ({ children, initValue }) => {
  const settings = typeof initValue == 'object' && typeof initValue.getSettingsItems == 'function' && 
    (initValue.settings ? initValue.settings : addId(initValue.getSettingsItems()));
  const items = typeof initValue == 'object' && typeof initValue.getMenuItems == 'function' && 
    (initValue.items ? initValue.items : addId(initValue.getMenuItems()));

  const provider = Provider({children, initValue: {...initValue, contexts: {}, 
    items: items||[], settings: settings||[], currentSettingsKeys: {}}, Context, reducer});

  return provider;
};

