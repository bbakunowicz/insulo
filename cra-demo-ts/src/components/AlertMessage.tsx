import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

type Severity = "error" | "info" | "warning" | "success";

const AlertMessage = ({severity, children}:{severity:Severity, children: JSX.Element[] | JSX.Element | string}, {...props}:{props: any}) => {
    return <MuiAlert elevation={6} variant="filled" severity={severity} {...props}>{children}</MuiAlert>;
}
  
export default AlertMessage;