import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import {MenuProvider} from 'insulo-menu';
import menuConfig from '../config/menu/initial';
import {Menu} from 'insulo-menu';
import MenuOpener from './MenuOpener'

const history = createBrowserHistory();

export default function MenuTest({children, ...rest}) {
  return (
    <MenuProvider initValue={menuConfig}>
        <Router history={history}>
            <MenuOpener></MenuOpener>
            <Menu history={history} {...rest} />
        </Router>
    </MenuProvider>
  )
}
