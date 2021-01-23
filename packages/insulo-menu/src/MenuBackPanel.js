/*************************************************************************
   Copyright 2020 Bartosz Bakunowicz

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
***************************************************************************/

import React, {Fragment, useContext} from 'react';
import Divider from '@material-ui/core/Divider';
import ArrowBack from '@material-ui/icons/ArrowBack'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import getItem from './utils/getItem';
import { Context as MenuContext } from './provider/providerWrapper';
import * as menuTypes from './provider/types';

const renderBackItem = (classes, menuConfig, menuDispatch) => {
  let action = {type: menuTypes.CLEAR_PARENT_ITEM};
  const item = getItem(menuConfig.items, menuConfig.parentItemKeyArr, true);

  if (item) {
    action = {type: menuTypes.SET_PARENT_ITEM, key: item.key, caption: item.caption};
  }

  return (
    <Fragment>
      <ListItem
        button
        className={classes.listItem}
        onClick={() => {
          menuDispatch(action);
        }}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <ArrowBack />
        </ListItemIcon>
        { (menuConfig.variant !== menuTypes.MINIMIZED || menuConfig.open) && (<ListItemText primary={menuConfig.parentItemCaption} />)}
      </ListItem>
      <Divider />
    </Fragment>
  );
}
  
const MenuBackPanel = ({classes}) => {
  const { value: menuConfig, dispatch: menuDispatch } = useContext(MenuContext);
  
  return (
    <Fragment>
      { (Array.isArray(menuConfig.parentItemKeyArr) && menuConfig.parentItemKeyArr.length > 0) && 
        renderBackItem(classes, menuConfig, menuDispatch)}
    </Fragment>
  )
}

export default MenuBackPanel;