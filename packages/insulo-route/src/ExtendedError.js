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

export class ExtendedError extends Error {
    constructor(err) {
      let message="";

      if (err.message) {
        message = err.message;
      }
      else {
        if (typeof err == 'object' && typeof err.response == 'object' && typeof err.response.data == 'object' && Array.isArray(err.response.data.errors)){
          const errArr = err.response.data.errors;
          for (let i = 0; i<errArr.length; i++) {
            if (typeof errArr[i] == 'object' && errArr[i].message) {
              message = message + errArr[i].message + " ";
            }
            else if (typeof errArr[i] == 'object' && errArr[i].msg) {
              message = message + errArr[i].msg + " ";
            }
          }
        }
      }

      super(message);

      if (typeof err == 'object' && typeof err.response == 'object' && typeof err.response.data == 'object' && Array.isArray(err.response.data.errors)){
        const errArr = err.response.data.errors;
        for (let i = 0; i<errArr.length; i++) {
          if (typeof errArr[i] == 'object' && !errArr[i].message && errArr[i].msg) {
            errArr[i].message = errArr[i].msg;
          }
        }
        this.extendedError = errArr;
      }

      if (window._INSULO_DEBUG_ === true) {
        console.info(`ExtendedError: message = ${message}, extendedError =`, this.extendedError);
      }
  
      this.name = "ExtendedError";
      this.status = (typeof err == 'object' && typeof err.response == 'object') ? err.response.status : undefined;
      this.errcode = (typeof err == 'object' && typeof err.response == 'object' && typeof err.response.data == 'object') ? 
        err.response.data.errcode : undefined;
    }
  }
  