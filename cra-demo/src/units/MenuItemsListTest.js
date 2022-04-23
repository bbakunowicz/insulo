import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import {MenuProvider} from 'insulo-menu';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MenuBackPanel from 'insulo-menu/MenuBackPanel';
import MenuItemsList from 'insulo-menu/MenuItemsList';
import MenuOpener from './MenuOpener'

const history = createBrowserHistory();

const useStyles = (drawerWidth, anchor) => {
  return makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    //width: drawerWidth,
    flexShrink: 0,
    // whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: (isNaN(drawerWidth))?drawerWidth:`${drawerWidth}px`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1,
    // },
  },
  drawerPaper: {
    // transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    width: (isNaN(drawerWidth))?drawerWidth:`${drawerWidth}px`,
  },
  drawerPaperMinimized: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    width: theme.spacing(7) + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1,
    // },
  },
  drawerPaperPrimaryLight: {
    backgroundColor: theme.palette.primary.light
  },
  drawerPaperPrimaryMain: {
    backgroundColor: theme.palette.primary.main
  },
  drawerPaperSecondaryLight: {
    backgroundColor: theme.palette.secondary.light
  },
  drawerPaperSecondaryMain: {
    backgroundColor: theme.palette.secondary.main
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  drawerThemes: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-evenly',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    // padding: theme.spacing(0, 1),
    justifyContent: 'space-between',
  },
  listItemIcon: {
    minWidth: 'auto',
    flexShrink: 0,
    flexGrow: 0,
    paddingRight: theme.spacing(1.5),
    margin: theme.spacing(0.5, 0),
    fontSize: `${theme.spacing(3)}px`,
  },
  listItemIconRight: {
    minWidth: 'auto',
    flexShrink: 0,
    flexGrow: 0,
    margin: theme.spacing(0.5, 0),
  },
  listItemSpan: {
    minWidth: 'auto',
    flexShrink: 0,
    flexGrow: 0,
    width: `${theme.spacing(2.5)}px !important`,
    height: theme.spacing(2.5),
    margin: theme.spacing(0.25, 1.75, 0.25, 0.25),
  },
  listItemSelected: {
    cursor: 'default',
  },
  listItemSelectedPrimaryMain: {
    backgroundColor: `${theme.palette.primary.main} !important`
  },
  listItemSelectedPrimaryDark: {
    backgroundColor: `${theme.palette.primary.dark} !important`
  },
  listItemSelectedSecondaryMain: {
    backgroundColor: `${theme.palette.secondary.main} !important`
  },
  listItemSelectedSecondaryDark: {
    backgroundColor: `${theme.palette.secondary.dark} !important`
  },
  divider: {
    margin: theme.spacing(1,0),
  },
  settingsApplied: {
    backgroundColor: 'rgba(0,0,0,0.08)'
  },
  langButton: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    minWidth: theme.spacing(6),
    borderRadius: '50%',
    padding: theme.spacing(1.5),
  },
  collapseEntered: {
    minHeight: "max-content !important"
  }
  }))};

const getSelectedClass = (value) => {
  switch (value) {
    case 'primary-dark':
      return 'listItemSelectedPrimaryDark'
    case 'primary-main':
      return 'listItemSelectedPrimaryMain'
    case 'secondary-dark':
      return 'listItemSelectedSecondaryDark'
    case 'secondary-main':
      return 'listItemSelectedSecondaryMain'
    default:
      return undefined;
  }
}

export default function Test({children, menuConfig, ...rest}) {
  const selectedColor = 'primary-main';
  const selectedClass = getSelectedClass(selectedColor);
  const itemVibilityValues = undefined;
  const itemCaptionCallback = undefined;
  const classes = useStyles(menuConfig.width)();

  return (
    <MenuProvider initValue={menuConfig}>
      <Router history={history}>
        <MenuOpener></MenuOpener>
        <List >
          <MenuBackPanel classes={classes} />
          <MenuItemsList classes={classes} history={history} selectedClass={selectedClass} itemVibilityValues={itemVibilityValues}
          itemCaptionCallback = {itemCaptionCallback} />
        </List>
      </Router>
    </MenuProvider>
  )
}
