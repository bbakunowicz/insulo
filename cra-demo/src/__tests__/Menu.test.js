import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import {act} from 'react-dom/test-utils';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import {MenuProvider} from 'insulo-menu';
import menuConfig from '../config/menu/initial';
import {Menu} from 'insulo-menu';
import MenuOpener from '../units/MenuOpener'

const history = createBrowserHistory();

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Testing Menu Component', () => {
  test("Menu settings button existence", () => {
    act(() => {
      ReactDOM.render((
        <MenuProvider initValue={menuConfig}>
          <Router history={history}>  
            <MenuOpener></MenuOpener>
            <Menu history={history} />
          </Router>
        </MenuProvider>
      ), container);
    });

    // console.log('Container',container);

    expect(container.querySelector('#ins-m-settins-icon')).toBeDefined();
  })
});
