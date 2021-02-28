import React, { Fragment, useContext } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import * as queryString from "query-string"
import {DataContext} from '../contexts/DataProvider';
import ErrorList from '../components/ErrorList';
import * as dataTypes from '../contexts/types';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
    fontWeight: "bold"
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  
  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Sample Data
      </Typography>

      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableHead: {
    fontWeight: 700
  }
}));

function SimpleTable({data}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsCnt = Array.isArray(data)?data.length:0;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowsCnt - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell key='h1' classes={{head: classes.tableHead}} >Email</TableCell>
                <TableCell key='h2' classes={{head: classes.tableHead}} >Name</TableCell>
                <TableCell key='h3' classes={{head: classes.tableHead}} >Company</TableCell>
                <TableCell key='h4' classes={{head: classes.tableHead}} >Address</TableCell>
                <TableCell key='h5' classes={{head: classes.tableHead}} align="right">Phone</TableCell>
                <TableCell key='h6' classes={{head: classes.tableHead}} align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) && 
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                <TableRow key={`r_${row.index}`}>
                  <TableCell key={`c1_${row.index}`}>{row.email}</TableCell>
                  <TableCell key={`c2_${row.index}`}>{row.name}</TableCell>
                  <TableCell key={`c3_${row.index}`}>{row.company}</TableCell>
                  <TableCell key={`c4_${row.index}`}>{row.address}</TableCell>
                  <TableCell key={`c5_${row.index}`} align="right">{row.phone}</TableCell>
                  <TableCell key={`c6_${row.index}`} align="right">{row.balance}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsCnt}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const Page = () => {

  const {value, actions: dataActions} = useContext(DataContext);
  const url = queryString.stringifyUrl({url: '/test', query: {email: 'test@test.com'}});
  
  return (
    
    <Fragment>
      <SimpleTable data={value.data.sample} />
      
      {(value.state !== dataTypes.AUTHERR_NOT_AUTENTICATED && value.error && value.error.length > 0) && (
        <Box mt={4}>
          {ErrorList("error", value.error)}
        </Box>
      )}

      <form onSubmit={event => {
          event.preventDefault();
          dataActions.fetchData(url, { host: 'localhost', port: 5000});
        }}
      >
        <Button type="submit" variant="contained" color="primary">Load data</Button>
      </form>
    </Fragment>
  );
}

export default Page
