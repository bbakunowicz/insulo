import React from 'react';
import {MenuProvider} from 'insulo-menu';
import menuConfig from '../config/menu/initial';

// #Theming(start):
// import {ThemeConfigProvider} from 'insulo-theme-provider';
// import themeConfig from '../config/theme/initial';
// #Theming(stop):

// #Localization(start)
// import {LocaleConfigProvider} from 'insulo-locale-provider';
// import localeConfig from '../config/locale/initial';
// import 'flag-icon-css/css/flag-icon.min.css';
// #Localization(stop)

// #Routing
import {RouteConfigProvider} from 'insulo-route';
import routingConfig from '../config/routing/initial';

// #Authentication(start)
// import {AuthConfigProvider} from 'insulo-route';
// import authConfig from '../config/auth/initial'
// #Authentication(stop)

import MainLayout from './MainLayout';

window._INSULO_DEBUG_= (process.env.REACT_APP_INSULO_DEBUG && process.env.REACT_APP_INSULO_DEBUG.toLowerCase() === "true")?true:false;

export default function Demo () {
  return (
    <RouteConfigProvider initValue={routingConfig}>
      {/* #Localization(start) */}
      {/* <LocaleConfigProvider initValue={localeConfig}> */}
      {/* #Localization(stop) */}
        {/* #Theming(start) */}
        {/* <ThemeConfigProvider initValue={themeConfig}> */}
        {/* #Theming(stop) */}
          {/* #Authentication(start) */}
          {/* <AuthConfigProvider initValue={authConfig}> */}
          {/* #Authentication(stop) */}
              <MenuProvider initValue={menuConfig}>
                <MainLayout />
              </MenuProvider>
          {/* #Authentication(start) */}
          {/* </AuthConfigProvider> */}
          {/* #Authentication(stop) */}
        {/* #Theming(start) */}
        {/* </ThemeConfigProvider> */}
        {/* #Theming(stop) */}
      {/* #Localization(start) */}
      {/* </LocaleConfigProvider> */}
      {/* #Localization(stop) */}
    </RouteConfigProvider>
  );
}