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
import {ExtendedError} from '../../ExtendedError';

const prepareError = (error) => {
  if (error instanceof ExtendedError) {
    console.info('prepareError: ',error.extendedError);
    return error.extendedError;
  }
  else if (error instanceof Error) {
    return [{message: error.message}];
  }
  else if (typeof error == 'string' && error) {
    return [{message: error}]
  }
}

export const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_AUTH_VALUES: {
      const newIncarnation = state.authIncarnation + 1;
      if (action.authState) {
        if (typeof action.authValues == 'object') {
          return {...state, 
            authValues: {...action.authValues},
            authState: action.authState, 
            authError: prepareError(action.authError),
            authIncarnation: newIncarnation,
          }
        }
        if (Array.isArray(action.authValues)) {
          return {...state, 
            authValues: [...action.authValues],
            authState: action.authState, 
            authError: prepareError(action.authError),
            authIncarnation: newIncarnation,
          }
        }
        return {...state, 
          authValues: action.authValues, 
          authState: action.authState, 
          authError: prepareError(action.authError), 
          authIncarnation: newIncarnation,
        }
      }
      else {
        if (typeof action.authValues == 'object') {
          return {...state, 
            authValues: {...action.authValues},
            authIncarnation: newIncarnation,
          }
        }
        if (Array.isArray(action.authValues)) {
          return {...state, 
            authValues: [...action.authValues],
            authIncarnation: newIncarnation,
          }
        }
        return {...state, 
          authValues: action.authValues,
          authIncarnation: newIncarnation,
        }
      }
    }
    case types.SET_AUTH_STATE:
      return {...state, 
        authState: action.authState,
        authError: prepareError(action.authError)
    }
    case types.SET_LOADING_STATE: {
      return {...state, inloadingState: action.inloadingState}
    }
    default:
        return state;
    }
};
