import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Landing, ApplicationBar} from 'insulo-menu';
import Routes from '../pages/routing/Routes';

// #Theming(start)
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ThemeContext from 'insulo-theme-provider';
// #Theming(stop)

// #Visibility(start) or #Theming(start) or #Localization(start)
import { useEffect } from 'react';
// #Visibility(stop) or #Theming(stop) or #Localization(stop)

// #Authentication(start) or #Theming(start) or #Localization(start)
import { useContext } from 'react';
// #Authentication(stop) or #Theming(stop) or #Localization(stop)

// #Theming(start) or #Localization(start)
import MenuContext, {menuTypes} from 'insulo-menu';
// #Theming(stop) or #Localization(stop)

// #Visibility(start)
import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
// #Visibility(stop)

// #Authentication(start)
import {AuthContext} from 'insulo-route';
// #Authentication(stop)

// #Localization(start)
import LocaleContext, {getItemCaption} from 'insulo-locale-provider';
// #Localization(stop)


// #Visibility(start)
function usePersistent(breakpoint = 'md') {
  const [variant, setVariant] = useState(false);
  const theme = useTheme();
  
  useEffect(() => {
    function updateSize() {
      const size = theme.breakpoints.values[breakpoint];
      if (window.innerWidth < size) setVariant(false)
      else setVariant(true);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [theme.breakpoints, breakpoint]);

  return variant;
}
// #Visibility(stop)

export default function MainLayout() {

  // #Theming(start)
  const { value:themeConfig, actions: themeActions, dispatch: themeDispatch } = useContext(ThemeContext);
  const theme = React.useMemo(() => createMuiTheme(themeActions.getProps(themeConfig.current, themeConfig.type)), [themeConfig, themeActions]);
  // #Theming(stop)

  // #Visibility(start)
  const persistentEnabled = usePersistent();
  // #Visibility(stop)

  // #Authentication(start)
  const { value: authConfig } = useContext(AuthContext);
  // #Authentication(stop)

  // #Theming(start) or #Localization(start)
  const { dispatch: menuDispatch } = useContext(MenuContext);
  // #Theming(stop) or #Localization(stop)
  
  // #Localization(start)
  const { value: localeConfig, dispatch: localeDispatch } = useContext(LocaleContext);
  // #Localization(stop)

  // #Theming(start)
  useEffect(() => {
    if (menuDispatch) {
      menuDispatch({type: menuTypes.REGISTER_CONTEXT, name: 'theme', config: themeConfig, dispatch: themeDispatch});
    }  
  },[menuDispatch, themeConfig, themeDispatch]);
  // #Theming(stop)

  // #Localization(start)
  useEffect(() => {
    if (menuDispatch) {
      menuDispatch({type: menuTypes.REGISTER_CONTEXT, name: 'locale', config: localeConfig, dispatch: localeDispatch});
    }  
  },[menuDispatch, localeConfig, localeDispatch]);
  // #Localization(stop)

  // itemVibilityValues: user-defined values
  // settingsVibilityValues: user-defined values
  // itemCaptionCallback: function that accepts the id of the required caption and returns a string value, it can be a user-defined
  // function or published by insulo-auth-provider (getItemCaption(localeConfig))

  return (
    <Fragment>
    {/* #Theming(start) */}
    <ThemeProvider theme={theme}>
    {/* #Theming(stop) */}
      <Fragment>
        <CssBaseline />
        <ApplicationBar position="fixed">
            Test Application
        </ApplicationBar>
        <Landing 
          // #Theming(start)
          backgroundColor={themeConfig.themesCnv[themeConfig.current].background} 
          selectedColor={themeConfig.themesCnv[themeConfig.current].selected} 
          // #Theming(stop)
          // #Authentication(start)
          itemVibilityValues={authConfig.authValues} 
          // #Authentication(stop)
          // #Visibility(start)
          settingsVibilityValues={{persistentEnabled}}
          // #Visibility(stop)
          // #Localization(start)
          itemCaptionCallback={getItemCaption(localeConfig)}
          // #Localization(stop)
        >
          <Route render={(props) => <Routes {...props} />} />
        </Landing>
      </Fragment>
    {/* #Theming(start) */}
    </ThemeProvider>
    {/* #Theming(stop) */}
    </Fragment>
  );
}
