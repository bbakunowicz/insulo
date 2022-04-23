import React, {useContext, useEffect, Fragment} from 'react';
import { Context as MenuContext } from 'insulo-menu/provider/providerWrapper';
import * as menuTypes from 'insulo-menu/provider/types';

export default function MenuOpener(props) {
  const {children} = props;
  const { value: menuConfig, dispatch: menuDispatch } = useContext(MenuContext);
  const {open, parentItemKeyArr, parentItemCaption, curentItemKey, currentItemCaption, 
    currentItemRoute, currentItemAltRoute} = menuConfig;

  useEffect(
    () => {menuDispatch({type: menuTypes.SET_MENU_OPEN})},[menuDispatch]
  )

  return (
    <Fragment>
      {children}
      <span type="text" hidden id="test-output">
        {JSON.stringify({
          open,
          parentItemCaption, parentItemKeyArr,
          curentItemKey, currentItemCaption, currentItemRoute, currentItemAltRoute
        })}
      </span>
    </Fragment>
  )
}