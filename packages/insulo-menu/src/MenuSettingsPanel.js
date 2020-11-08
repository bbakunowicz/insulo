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

import React, {Fragment} from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuSettingsList from './MenuSettingsList';
import MenuBackSettingsPanel from './MenuBackSettingsPanel';

const MenuSettingsPanel = ({classes, selectedClass, settingsVibilityValues}) => {
  return (
    <Fragment>
      <List >
        <MenuBackSettingsPanel classes={classes} />
        <MenuSettingsList classes={classes} selectedClass={selectedClass} settingsVibilityValues={settingsVibilityValues} />
      </List>
      <Divider />
    </Fragment>
  )
}

export default MenuSettingsPanel;