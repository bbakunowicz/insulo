import {menuTypes} from 'insulo-menu';
import items from './items';
import settings from './settings';
import getItemVisibility from './getItemVisibility';
import getSettingVisibility from './getSettingVisibility';
import ApplicationBarContent from './ApplicationBarContent';
// import getMenuItems from './getMenuItems';
// import getSettingsItems from './getSettingsItems';

export default { 
  width: "20em",                //mandatory
  variant: menuTypes.TEMPORARY, //optional
  availableVariants: [menuTypes.PERSISTENT, menuTypes.TEMPORARY, menuTypes.MINIMIZED],  //optional
  anchor: menuTypes.MENU_LEFT,  //optional
  //defaultVisible: false,      //optional
  items,                        //the getMenuItems function may be used alternatively
  settings,                     //the getSettingsItems function may be used alternatively
  getItemVisibility,            //optional
  getSettingVisibility,         //optional
  ApplicationBarContent         //optional
}
