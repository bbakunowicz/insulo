import axios from 'axios';
import * as axiosConfig from '../config/axios/config';

const DEBUG = process.env.REACT_APP_INSULO_DEBUG.toLowerCase() === "true";

const api = axios.create({
  baseURL: axiosConfig.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  if (DEBUG) { 
    console.info("Axios request:", config); 
  }
  return config;
}, (error) => {
  if (DEBUG) { 
    console.error("Axios request:", error); 
  }
  return Promise.reject(error);
});

api.interceptors.response.use(
  res => {
    if (DEBUG) { 
      console.info("Axios response:", res); 
    }
    return res;
  },
  err => {
    // 403 - błąd tokena: wywołanie history(/error) a jeśli error.response.data.authorized = false to wyczyścić authValues
    // 401 - błąd credentials 
    // if (error.response.status === 403) {
    //   if (!error.response.data.authorized) {
    //     if (DEBUG) { 
    //       console.error('axiosInvoker (Access Forbidden) - no valid access token provided: not authenticated');
    //     }
    //     history.push({
    //       pathname: '/test',
    //       state: { authErrorId: "autherr_no_token", authError: "Not authenticated" }
    //     });
    //   }
    //   else {
    //     if (DEBUG) { 
    //       console.error('axiosInvoker (Access Forbidden) - no valid access token provided: wrong permissions');
    //     }
    //     history.push({
    //       pathname: '/test',
    //       state: { authErrorId: "autherr_permissions", authError: "Wrong permissions" }
    //     });
    //   }
    // }

    // if (error.response.status === 403) {

    // if (typeof err == 'object' && typeof err.response == 'object' && typeof err.response.data == 'object' && 
    //   Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
    //   throw new ExtendedError(err.response.data.errors);
    // }
    // }

    return Promise.reject(err);
  }  
);

export default api;
