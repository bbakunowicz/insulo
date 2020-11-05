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

import { createContext, useReducer } from "react";
import Provider from './provider';
import { reducer } from "./reducer";
import useLocalStorage from './localStorage';
import useThemeMediaQuery from './mediaQuery';

export const Context = createContext();

const normalize = (inputData) => {
  let outputData = {};
  for (let i = 0; i< inputData.length; i++){
    outputData[inputData[i].id] = {...inputData[i]};
  }
  return outputData;
}

const getProps = (themesCnv) => (current, type) => {
  if (typeof themesCnv == 'object' && typeof themesCnv[current] == 'object') {
    let props = {...themesCnv[current].props};
    if (typeof props != 'object') {
      props = {};
    }
    if (type) {
      if (typeof props.palette == 'object') {
        props.palette = {...props.palette, type};
      }
      else {
        props.palette = {type}
      }
    }
    return props;
  }
  else {
    return {};
  }

}

const ProviderWrapper = ({ children, initValue }) => {
  const themesCnv = normalize(initValue.themes);

  const [value, dispatch] = useReducer(reducer, {...initValue, themesCnv, typeSetter: 'init'});

  const provider = Provider({children, Context, value, dispatch, actions: {getProps: getProps(themesCnv)}});
  
  useLocalStorage(provider.props.value.value, provider.props.value.dispatch);
  useThemeMediaQuery(provider.props.value.value, provider.props.value.dispatch);

  return provider;
};

export default ProviderWrapper;
