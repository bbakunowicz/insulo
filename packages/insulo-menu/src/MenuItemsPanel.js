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

import React from 'react';
import List from '@material-ui/core/List';
import MenuItemsList from './MenuItemsList';
import MenuBackPanel from './MenuBackPanel';

const MenuItemsPanel = ({classes, history, selectedClass, authConfig}) => {
  return (
    <List >
      <MenuBackPanel classes={classes} />
      <MenuItemsList classes={classes} history={history} selectedClass={selectedClass} authConfig={authConfig}/>
    </List>
  )
}

export default MenuItemsPanel;