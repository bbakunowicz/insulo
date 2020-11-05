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

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const findItem = (inputData, prop, value, baseKey) => {
  let lookupData = inputData;
  if (isNumeric(baseKey)) {
    lookupData = inputData[baseKey].items;
  }

  if (Array.isArray(lookupData)) {
    for (let i=0; i < lookupData.length; i++) {
      if (Array.isArray(lookupData[i].items) && lookupData[i].items.length > 0) {
        const ret = findItem(lookupData, prop, value, i);
        if (ret) {
          return ret;
        }
      }
      else {
        if (lookupData[i][prop] === value) {
          return lookupData[i];
        }
      }
    }
  }
}

export default findItem;