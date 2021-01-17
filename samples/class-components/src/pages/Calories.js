import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// #Theming(start) and #Localization(start)
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import * as locales from '@material-ui/core/locale';
import {withLocale} from 'insulo-locale-provider';
// #Theming(stop) and #Localization(stop)

const styles = () => ({
  table: {
    minWidth: 650,
  },
  tableHead: {
    fontWeight: 700
  }
});

const desserts = {
  US: [
    'Frozen yoghurt',
    'Ice cream',
    'Apple pie',
    'Cupcake', 
    'Gingerbread',
  ],
  en: [
    'Frozen yoghurt',
    'Ice cream',
    'Apple pie',
    'Cupcake', 
    'Gingerbread',
  ],
  pl: [
    'Mrożony jogurt',
    'Lody',
    'Szarlotka',
    'Babeczka',
    'Piernik'
  ],
  es: [
    'Yogurt congelado',
    'Helado',
    'Pie de manzana',
    'Magdalena',
    'Pan de jengibre'
  ],
  fr: [
    'Yaourt glacé',
    'Crème glacée',
    'Tarte aux pommes',
    'Petit gâteau',
    "Pain d'épice"
  ],
  de: [
    'Gefrorener Joghurt',
    'Eiscreme',
    'Apfelkuchen',
    'Cupcake',
    'Lebkuchen'
  ]
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const getRows = (currentLocale) => [
  createData(desserts[currentLocale][0], 159, 6.0, 24, 4.0),
  createData(desserts[currentLocale][1], 237, 9.0, 37, 4.3),
  createData(desserts[currentLocale][2], 262, 16.0, 24, 6.0),
  createData(desserts[currentLocale][3], 305, 3.7, 67, 4.3),
  createData(desserts[currentLocale][4], 356, 16.0, 49, 3.9),
];

function SimpleTable({props, classes, currentLocale}) {
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell classes={{head: classes.tableHead}} >{props.dessert}</TableCell>
            <TableCell classes={{head: classes.tableHead}} align="right">{`${props.calories} (g)`}</TableCell>
            <TableCell classes={{head: classes.tableHead}} align="right">{`${props.fat} (g)`}</TableCell>
            <TableCell classes={{head: classes.tableHead}} align="right">{`${props.carbs} (g)`}</TableCell>
            <TableCell classes={{head: classes.tableHead}} align="right">{`${props.protein} (g)`}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getRows(currentLocale).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

class Calories extends Component {
  render() {
    let currentLocale = "en";
  
    let calories = "Calories";
    let dessert = "Dessert (100g serving)";
    let fat = "Fat (g)";
    let carbs = "Carbs (g)";
    let protein = "Protein (g)";
  
    // #Localization(start)
    const {value: localeConfig} = this.props.localeContext;
    currentLocale = localeConfig.currentLocale;
    const {classes} = this.props;  
    
    if (localeConfig.currentLocale && typeof localeConfig.locales == 'object' && 
      typeof localeConfig.locales[localeConfig.currentLocale] == 'object') {
      calories = localeConfig.locales[localeConfig.currentLocale]['page_el_calories'];
      dessert = localeConfig.locales[localeConfig.currentLocale]['page_el_dessert'];
      fat = localeConfig.locales[localeConfig.currentLocale]['page_el_fat'];
      carbs = localeConfig.locales[localeConfig.currentLocale]['page_el_carbs'];
      protein = localeConfig.locales[localeConfig.currentLocale]['page_el_protein'];
    }
    // #Localization(stop)
  
    return (
      <section>
        <h1>{`${calories}`}</h1>
        <SimpleTable props={{dessert, calories, fat, carbs, protein}} currentLocale={currentLocale} classes={classes}/>
        {/* #Theming(start) and #Localization(start), At least all #Theming sections in App.js and MainLayout.js must be uncommented */}
        <ThemeProvider theme={(outerTheme) => createMuiTheme(outerTheme, locales[localeConfig.currentLocaleMui])}>
          <TablePagination
              count={5}
              rowsPerPage={10}
              page={0}
              component="div"
              onChangePage={() => {}}
            />
        </ThemeProvider>
        {/* #Theming(stop) and #Localization(stop) */}
      </section>
    )
  }
}

Calories.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  localeContext: PropTypes.object.isRequired,

};

export default withStyles(styles)(withLocale(Calories));
