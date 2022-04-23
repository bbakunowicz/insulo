import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {act} from 'react-dom/test-utils';
import menuConfig from '../config/menu/initial';

import MenuItemsListTest from '../units/MenuItemsListTest';

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

describe('Testing MenuItemsList Component', () => {
  test('Menu items content', /*async*/ () => {
    act(() => {
      render((
        <MenuItemsListTest menuConfig={menuConfig} />
      ), container);
    });

    // await act(async () => {
    //   render(<MenuItemsListTest />, container);
    // });

    expect(container.querySelector(
      'ul > div:nth-child(1) > div.MuiListItemText-root > span.MuiListItemText-primary'))
    .toBeTruthy();
    expect(container.querySelector(
      'ul > div:nth-child(2) > div.MuiListItemText-root > span.MuiListItemText-primary'))
    .toBeTruthy();
    expect(container.querySelector(
      'ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary'))
    .toBeTruthy();
    expect(container.querySelector(
      'ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary'))
    .toBeTruthy();
    expect(container.querySelector(
      'ul > div:nth-child(5) > div.MuiListItemText-root > span.MuiListItemText-primary'))
    .toBeTruthy();
    expect(container.querySelector(
      'ul > div:nth-child(7) > div.MuiListItemText-root > span.MuiListItemText-primary'))
    .toBeTruthy();
    expect(container.querySelector(
      'ul > hr'))
    .toBeTruthy();
    expect(container.querySelector(
      'ul > div:nth-child(1) > div.MuiListItemText-root > span.MuiListItemText-primary').textContent)
    .toBe("Dashboard");
    expect(container.querySelector(
      'ul > div:nth-child(2) > div.MuiListItemText-root > span.MuiListItemText-primary').textContent)
    .toBe("Sample Data");
    expect(container.querySelector(
      'ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').textContent)
    .toBe("Submenu");
    expect(container.querySelector(
      'ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').textContent)
    .toBe("User's Page");
    expect(container.querySelector(
      'ul > div:nth-child(5) > div.MuiListItemText-root > span.MuiListItemText-primary').textContent)
    .toBe("Admin's Page");
    expect(container.querySelector(
      'ul > div:nth-child(7) > div.MuiListItemText-root > span.MuiListItemText-primary').textContent)
    .toBe("Sign In");

  });

  test('Menu item click', /*async*/ () => {
    const href = window.location.href;

    act(() => {
      render((
        <MenuItemsListTest menuConfig={menuConfig} />
      ), container);
    });

    act(() => {
      container.querySelector(
        'ul > div:nth-child(1) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.location.href).toBe(`${href}dashboard`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).currentItemCaption).toBe(`Dashboard`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).parentItemCaption).toBeUndefined();

    act(() => {
      container.querySelector(
        'ul > div:nth-child(2) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    //console.log('menuConfig:',container.querySelector('#test-output').textContent);
    expect(window.location.href).toBe(`${href}calories`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).currentItemCaption).toBe(`Sample Data`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).parentItemCaption).toBeUndefined();

    act(() => {
      container.querySelector(
        'ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.location.href).toBe(`${href}useritem`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).currentItemCaption).toBe(`User's Page`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).parentItemCaption).toBeUndefined();


    act(() => {
      container.querySelector(
        'ul > div:nth-child(5) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.location.href).toBe(`${href}adminitem`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).currentItemCaption).toBe(`Admin's Page`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).parentItemCaption).toBeUndefined();

    act(() => {
      container.querySelector(
        'ul > div:nth-child(7) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.location.href).toBe(`${href}login`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).currentItemCaption).toBe(`Sign In`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).parentItemCaption).toBeUndefined();

  });

  test('1-st level submenu click', /*async*/ () => {
    const href = window.location.href;

    act(() => {
      render((
        <MenuItemsListTest menuConfig={menuConfig} />
      ), container);
    });

    act(() => {
      container.querySelector(
        'ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.location.href).toBe(href);
    expect(container.querySelector('ul > div:nth-child(1) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Submenu');
    expect(container.querySelector('ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-1');
    expect(container.querySelector('ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2');
    expect(container.querySelector('ul > div:nth-child(5) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-3');

  });

  test('1-st level submenu item click', /*async*/ () => {
    const origin = window.location.origin;

    act(() => {
      render((
        <MenuItemsListTest menuConfig={menuConfig} />
      ), container);
    });

    act(() => {
      container.querySelector(
        'ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    act(() => {
      container.querySelector(
        'ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.location.href).toBe(`${origin}/subitem1-1`);
    expect(container.querySelector('ul > div:nth-child(1) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Submenu');
    expect(container.querySelector('ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-1');
    expect(container.querySelector('ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2');
    expect(container.querySelector('ul > div:nth-child(5) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-3');
    expect(JSON.parse(container.querySelector('#test-output').textContent).currentItemCaption).toBe(`Subitem 1-1`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).parentItemCaption).toBe('Submenu');
  
    act(() => {
      container.querySelector(
        'ul > div:nth-child(5) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  
    expect(window.location.href).toBe(`${origin}/subitem1-3`);
    expect(container.querySelector('ul > div:nth-child(1) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Submenu');
    expect(container.querySelector('ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-1');
    expect(container.querySelector('ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2');
    expect(container.querySelector('ul > div:nth-child(5) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-3');
    expect(JSON.parse(container.querySelector('#test-output').textContent).currentItemCaption).toBe(`Subitem 1-3`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).parentItemCaption).toBe('Submenu');
  });

  test('2-nd level submenu click', /*async*/ () => {
    const href = window.location.href;

    act(() => {
      render((
        <MenuItemsListTest menuConfig={menuConfig} />
      ), container);
    });

    act(() => {
      container.querySelector(
        'ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    act(() => {
      container.querySelector(
        'ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.location.href).toBe(href);
    expect(container.querySelector('ul > div:nth-child(1) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2');
    expect(container.querySelector('ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2-1');
    expect(container.querySelector('ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2-2');

  });

  test('2-nd level submenu item click', /*async*/ () => {
    const origin = window.location.origin;

    act(() => {
      render((
        <MenuItemsListTest menuConfig={menuConfig} />
      ), container);
    });

    act(() => {
      container.querySelector(
        'ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    act(() => {
      container.querySelector(
        'ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    act(() => {
      container.querySelector(
        'ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.location.href).toBe(`${origin}/subitem1-2-1`);
    expect(container.querySelector('ul > div:nth-child(1) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2');
    expect(container.querySelector('ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2-1');
    expect(container.querySelector('ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2-2');
    expect(JSON.parse(container.querySelector('#test-output').textContent).currentItemCaption).toBe(`Subitem 1-2-1`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).parentItemCaption).toBe('Subitem 1-2');

    act(() => {
      container.querySelector(
        'ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').
        dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  
    expect(window.location.href).toBe(`${origin}/subitem1-2-2`);
    expect(container.querySelector('ul > div:nth-child(1) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2');
    expect(container.querySelector('ul > div:nth-child(3) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2-1');
    expect(container.querySelector('ul > div:nth-child(4) > div.MuiListItemText-root > span.MuiListItemText-primary').
      textContent).toBe('Subitem 1-2-2');
    expect(JSON.parse(container.querySelector('#test-output').textContent).currentItemCaption).toBe(`Subitem 1-2-2`);
    expect(JSON.parse(container.querySelector('#test-output').textContent).parentItemCaption).toBe('Subitem 1-2');
  });

});
