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

import {useEffect} from 'react';
import * as types from '../types';

const useLocalStorage = (config, dispatch) => {
  useEffect(() => {
    if (typeof localStorage != 'undefined') {
      const variant = localStorage.getItem(types.LS_MENU_VARIANT);
      if (variant && variant !== config.variant) {
        dispatch({type: types.SET_MENU_VARIANT, variant, init: true});
      }
      const opened = localStorage.getItem(types.LS_MENU_OPENED);
      if (opened && opened === "true") {
        dispatch({type: types.SET_MENU_OPEN});
      }
    }
  // eslint-disable-next-line
  }, []);
}

export default useLocalStorage;