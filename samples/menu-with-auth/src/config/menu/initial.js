import items from './items';
import {menuTypes} from 'insulo-menu';
import getItemVisibility from './getItemVisibility';

export default { 
  variant: menuTypes.TEMPORARY,
  availableVariants: [menuTypes.PERSISTENT, menuTypes.TEMPORARY, menuTypes.MINIMIZED],
  width: "20em",
  anchor: menuTypes.MENU_LEFT,
  items,
  getItemVisibility
}
