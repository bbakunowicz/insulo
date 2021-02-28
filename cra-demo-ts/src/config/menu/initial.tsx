import {menuTypes} from 'insulo-menu';
import items from './items';
import settings from './settings';
import getItemVisibility from './getItemVisibility';
import getSettingVisibility from './getSettingVisibility';
import ApplicationBarContent from './ApplicationBarContent';
import type {MenuProviderInitValues} from 'insulo-menu';

const init:MenuProviderInitValues = { 
  width: "20em",                      //mandatory
  variant: menuTypes.TEMPORARY,       //optional
  availableVariants: [menuTypes.PERSISTENT, menuTypes.TEMPORARY, menuTypes.MINIMIZED],  //optional
  anchor: menuTypes.MENU_LEFT,        //optional
  //defaultVisible: false,            //optional
  items,                        
  settings,                     
  getItemVisibility,                  //optional
  getSettingVisibility,               //optional
  ApplicationBarContent,              //optional
  persistentMenuMinWindowSize: 800    //optional
}

export default init;
