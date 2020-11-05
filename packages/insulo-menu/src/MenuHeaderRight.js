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
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsIcon from '@material-ui/icons/Settings';
import { Context as MenuContext } from './provider/config/providerWrapper';
import { Context as ItemsContext } from './provider/items/providerWrapper';
import * as menuTypes from './provider/types';

export default function MenuHeader({classes}) {
  const { value: menuConfig, dispatch: menuDispatch } = useContext(MenuContext);
  const { value: itemsConfig } = useContext(ItemsContext);
  
  return (
    <Fragment>
      <div className={classes.drawerHeader}>
        <div>
          <IconButton 
            onClick={() => menuDispatch({type: menuTypes.SET_MENU_CLOSE})}>
              <ChevronRightIcon />
          </IconButton>
        </div>
        <div>
          { (Array.isArray(itemsConfig.settings) && itemsConfig.settings.length > 0)  &&
            <IconButton 
              classes={{root: clsx(menuConfig.settingsOpen && classes.settingsApplied)}}
              onClick={() => {
                menuDispatch({type: menuTypes.SET_MENU_SETTINGS_STATE, settingsOpen: !menuConfig.settingsOpen});
              }}>
                <SettingsIcon />
            </IconButton>
          }
         </div>
      </div>
      <Divider />
    </Fragment>
  );
}