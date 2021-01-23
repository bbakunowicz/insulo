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
import * as types from './types';

const useLocalStorage = (config, dispatch, setCredentials) => {
  useEffect(() => {
    if (config.saveAuthValues === true && typeof localStorage == 'object') {
      const authValuesKey = config.authValuesKey || types.LS_AUTH_VALUES;
      const authValuesStr = localStorage.getItem(authValuesKey);
      if (typeof authValuesStr === 'string' && authValuesStr.length>0) {
        if (window._INSULO_DEBUG_ === true) console.log(`useLocalStorage, setCredentials: authValuesStr = ${authValuesStr}`);
        setCredentials({authValuesStr});
      }
    }
    dispatch({type: types.SET_LOADING_STATE, inloadingState: false});
  // eslint-disable-next-line
  }, []);
}

export default useLocalStorage;