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
import useLocalStorage from './localStorage';

export const Context = createContext();

export const MenuConfigProvider = ({ children, initValue }) => {
  const anchor = typeof initValue == 'object' && ((initValue.anchor === 'left' || initValue.anchor === 'right') ? initValue.anchor : 'left');

  const provider = Provider({children, initValue: {...initValue, open: false, settingsOpen: false, anchor: anchor||'left'}, Context, reducer});

  useLocalStorage(provider.props.value.value, provider.props.value.dispatch);

  return provider;
};

