import React from 'react';
import {MenuProvider} from 'insulo-menu';
import {RouteConfigProvider, AuthConfigProvider} from 'insulo-route';
import menuConfig from '../config/menu/initial';
import routingConfig from '../config/routing/initial';
import authConfig from '../config/auth/initial'

import MainLayout from './MainLayout';

window._INSULO_DEBUG_= (process.env.REACT_APP_INSULO_DEBUG && process.env.REACT_APP_INSULO_DEBUG.toLowerCase() === "true")?true:false;

export default function Demo () {
  return (
    <RouteConfigProvider initValue={routingConfig}>
      <AuthConfigProvider initValue={authConfig}>
        <MenuProvider initValue={menuConfig}>
          <MainLayout />
        </MenuProvider>
      </AuthConfigProvider>
    </RouteConfigProvider>
  );
}