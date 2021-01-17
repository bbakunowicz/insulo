import React from 'react';
import {MenuProvider} from 'insulo-menu';
import menuConfig from '../config/menu/initial';

import MainLayout from './MainLayout';

export default function Demo () {
  return (
    <MenuProvider initValue={menuConfig}>
      <MainLayout />
    </MenuProvider>
  );
}