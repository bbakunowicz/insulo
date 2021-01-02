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
import getString, { supportedLocales, currentLocale } from './getLocales';
import useLocalStorage from './localStorage';

export const Context = createContext();

const ConfigProvider = ({ children, initValue }) => {
  const initValueCnv = {...initValue, open: false};
  if (!initValueCnv.lang) {
    initValueCnv.lang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
  } 
  initValueCnv.supportedLocales = supportedLocales(initValue.locales);

  initValueCnv.currentLocale = currentLocale(initValue.locales, initValueCnv.lang, initValueCnv.defaultLang);
  initValueCnv.currentLocaleMui = initValue.mappingsMui[initValueCnv.currentLocale];
  initValueCnv.currentLocaleHtml = initValue.mappingsHtml[initValueCnv.currentLocale];

  initValueCnv.getString = getString;

  if (window._INSULO_DEBUG_ === true) {
    console.log(`initValueCnv.lang: ${initValueCnv.lang}`);
    console.log(`initValueCnv.defaultLang: ${initValueCnv.defaultLang}`);
    console.log(`initValueCnv.currentLocale: ${initValueCnv.currentLocale}`);
    console.log(`ConfigProvider: supportedLocales: ${initValueCnv.supportedLocales}`);
    console.log(`ConfigProvider: currentLocale: ${initValueCnv.currentLocale}`);
  }

  const [value, dispatch] = useReducer(reducer, { ...initValueCnv });

  useLocalStorage(value, dispatch);

  return Provider({children, Context, value, dispatch});
};

export default ConfigProvider;
