import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import MenuContext, {menuTypes} from 'insulo-menu';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  toolbarMinPadding: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }
 }));
  
function Content({children}:{children: JSX.Element[] | JSX.Element}): JSX.Element {
  const classes = useStyles();
  const { value: menuConfig, dispatch: menuDispatch } = useContext(MenuContext);

  return (
    <Toolbar className={clsx(menuConfig.variant === menuTypes.MINIMIZED && classes.toolbarMinPadding)} >
      {menuConfig.anchor === "right" &&
        <Typography variant="h6" noWrap className={classes.title}>
          {children}
        </Typography>
      }
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => menuDispatch({type: menuTypes.SET_MENU_OPEN})}
        edge= { menuConfig.anchor === "right" ? "end" : "start"}
        className={clsx(menuConfig.anchor !== "right" && classes.menuButton, menuConfig.open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>

      {menuConfig.anchor !== "right" &&
        <Typography variant="h6" noWrap className={classes.title}>
          {children}
        </Typography>
      }
    </Toolbar>
  );
}

export default Content;