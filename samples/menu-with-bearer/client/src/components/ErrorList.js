import React, {Fragment} from 'react';
import Box from '@material-ui/core/Box';
import AlertMessage from './AlertMessage';

const ErrorList = (severity, errors) => { 
  return (Array.isArray(errors) && errors.length > 0) ?
    errors.map((error, idx) =>
      <Box mt={1} key={`alert_${idx}`}>
        <AlertMessage severity={severity} >{error.message}</AlertMessage>
      </Box>
    ):<Fragment></Fragment>;
}

export default ErrorList;