import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

const AlertMessage = ({severity, children, ...props}) => {
    return <MuiAlert elevation={6} variant="filled" severity={severity} {...props}>{children}</MuiAlert>;
}
  
export default AlertMessage;