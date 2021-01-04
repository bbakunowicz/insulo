import React from 'react';
import {MenuConfigProvider} from 'insulo-menu';
import menuConfig from '../config/menu/initial';
import {MenuItemsProvider} from 'insulo-menu';
import menuItemsConfig from '../config/menu/items/initial';

import MainLayout from './MainLayout';

export default function Demo () {
  return (
    <MenuConfigProvider initValue={menuConfig}>
      <MenuItemsProvider initValue={menuItemsConfig}>
        <MainLayout />
      </MenuItemsProvider>
    </MenuConfigProvider>
  );
}