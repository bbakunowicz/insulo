import {ExtendedError} from 'insulo-route'
import api from '../../utils/axiosInvoker';

const setCredentials = async ({credentials, additionalProps}) => {
    try {
      const ret = await api.post(additionalProps.authURL, JSON.stringify({ email: credentials.username, password: credentials.password }),
        {
          proxy: {
            host: 'localhost',
            port: 5000
          }
        });

      if (ret.status === 200) {
        return ret.data;
      }
    } catch (err) {
      throw new ExtendedError(err);
    }
}

export default setCredentials;