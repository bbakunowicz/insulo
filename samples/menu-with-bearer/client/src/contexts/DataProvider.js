import React, {useReducer} from 'react';
import api from '../utils/axiosInvoker';
import formatServerError from '../utils/formatServerError';
import * as dataTypes from './types';

export const DataContext = React.createContext();

const initData = {
    state: dataTypes.FETCH_INIT,
    data: {},
    error: undefined
};

const reducer = (state, action) => {
  switch (action.type) {
    case dataTypes.FETCH_SUCCESS: {
      const newData = (Array.isArray(action.data))?[...action.data]:(typeof action.data == 'object')?{...action.data}:action.data;
      return {
        state: dataTypes.FETCH_SUCCESS,
        data: newData
      }
    }
    default: {
      return {
        state: action.type,
        data: {},
        error: action.error
      }
    }
  }
} 

const fetchData = (dispatch, authActions) => {
  return async (url,proxy) => {
    try {
      dispatch({ type: dataTypes.FETCH_IN_PROGRESS });
      const result = await api.get(url, {proxy});

      dispatch({ type: dataTypes.FETCH_SUCCESS, data: result.data });
    } catch (err) {
      const error = formatServerError(err);

      if (err.response.data.errcode === dataTypes.AUTHERR_NOT_AUTENTICATED) {
        if (authActions) {
          authActions.clearCredentials();
        }
      }

      if (err.response.data.errcode) {
        dispatch({ type: err.response.data.errcode, error });
      }
      else {
        dispatch({ type: dataTypes.FETCH_FAILURE, error });
      }
    }
  }
};

const clearData = (dispatch) => {
  return () => {
    try {
      dispatch({ type: dataTypes.FETCH_INIT });
    } catch (err) {
      console.error('clearData error: ', err.message);
    }
  }
};

const DataProvider = ({ children, authActions }) => {
  const [value, dispatch] = useReducer(reducer, {...initData});

  return (
    <DataContext.Provider value={{ value, actions: {fetchData: fetchData(dispatch, authActions), clearData: clearData(dispatch) }}}>
      {children}
    </DataContext.Provider>
  );
}
  
export default DataProvider;
