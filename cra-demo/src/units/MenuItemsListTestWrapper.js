import React from 'react';
import menuConfig from '../config/menu/initial';
import MenuItemsListTest from './MenuItemsListTest';
export default function MenuItemsListTestWrapper () {
    return (
        <MenuItemsListTest menuConfig={menuConfig}/>
    )
}