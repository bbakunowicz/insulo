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

export const supportedLocales = (locales) => Object.keys(locales).map((key) => {
  const splittedKey = key.split(/[_-]+/);
  return splittedKey[1] ? splittedKey[1] : splittedKey[0];
});

export const currentLocale = (locales, locale, defaultLocale) => {
  if (locale) {
    if (locales[locale]){
      return locale;
    }

    const localeCnv = locale.split(/[_-]+/);

    if (localeCnv.length>0 && locales[localeCnv[1]]) {
      return localeCnv[1];
    }
    if (locales[localeCnv[0]]) {
      return localeCnv[0];
    }
  }
  if (defaultLocale) {
    if (locales[defaultLocale]) {
      return defaultLocale;
    }

    const localeCnv = defaultLocale.split(/[_-]+/);

    if (localeCnv.length>0 && locales[localeCnv[1]]) {
      return localeCnv[1];
    }
    if (locales[localeCnv[0]]) {
      return localeCnv[0];
    }
  }
};

export default ({locales, locale, id}) => locale && locales[locale][id];
