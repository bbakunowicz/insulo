import React, { Fragment } from 'react';
import {Menu} from 'insulo-menu';
import type { History, LocationState } from 'history';

// #Visibility(start)
import type { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
// #Visibility(stop)

// #Visibility(start) or #Theming(start) or #Localization(start)
import { useEffect } from 'react';
// #Visibility(stop) or #Theming(stop) or #Localization(stop)

// #Authentication(start) or #Theming(start) or #Localization(start)
import { useContext } from 'react';
// #Authentication(stop) or #Theming(stop) or #Localization(stop)

// #Theming(start) or #Localization(start)
import {ItemsContext, menuTypes} from 'insulo-menu';
// #Theming(stop) or #Localization(stop)

// #Visibility(start)
import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
// #Visibility(stop)

// #Authentication(start)
import {AuthContext} from 'insulo-route';
// #Authentication(stop)

// #Theming(start)
import ThemeContext from 'insulo-theme-provider';
// #Theming(stop)

// #Localization(start)
import LocaleContext, {getItemCaption} from 'insulo-locale-provider';
// #Localization(stop)

// #Visibility(start)
function usePersistent(breakpoint: Breakpoint = 'md') {
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

export default function MenuWrapper({history}:{history:History<LocationState>}) {

    // #Visibility(start)
    const persistentEnabled = usePersistent();
    // #Visibility(stop)

    // #Authentication(start)
    const { value: authConfig } = useContext(AuthContext);
    // #Authentication(stop)

    // #Theming(start) or #Localization(start)
    const { dispatch: itemsDispatch } = useContext(ItemsContext);
    // #Theming(stop) or #Localization(stop)
    
    // #Theming(start)
    const { value: themeConfig, dispatch: themeDispatch } = useContext(ThemeContext);
    // #Theming(stop)

    // #Localization(start)
    const { value: localeConfig, dispatch: localeDispatch } = useContext(LocaleContext);
    // #Localization(stop)

    // #Theming(start)
    useEffect(() => {
      if (itemsDispatch) {
        itemsDispatch({type: menuTypes.REGISTER_CONTEXT, name: 'theme', config: themeConfig, dispatch: themeDispatch});
      }  
    },[itemsDispatch, themeConfig, themeDispatch]);
    // #Theming(stop)
  
    // #Localization(start)
    useEffect(() => {
      if (itemsDispatch) {
        itemsDispatch({type: menuTypes.REGISTER_CONTEXT, name: 'locale', config: localeConfig, dispatch: localeDispatch});
      }  
    },[itemsDispatch, localeConfig, localeDispatch]);
    // #Localization(stop)
  
    // itemVibilityValues: user-defined values
    // settingsVibilityValues: user-defined values
    // itemCaptionCallback: function that accepts the id of the required caption and returns a string value, it can be a user-defined
    // function or published by insulo-auth-provider (getItemCaption(localeConfig))
  
    return (
      <Fragment>
        {/* {children} */}
        <Menu history={history} 
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
          />
      </Fragment>
    );
  }
  