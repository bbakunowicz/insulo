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

import { History, LocationState } from 'history';

declare global {
    interface Window {
        _INSULO_DEBUG_: boolean;
    }
}

interface Children {
    children: JSX.Element[] | JSX.Element
}

interface DispatchValues {
    type: string
}

export const menuTypes: {
    CALL_DISPATCH: string;
    CLEAR_PARENT_ITEM: string;
    CLEAR_PARENT_SETTING: string;
    LS_MENU_OPENED: string;
    LS_MENU_VARIANT: string;
    MENU_LEFT: "left";
    MENU_RIGHT: "right";
    MENU_DIVIDER: string;
    MINIMIZED: "minimized";
    PERSISTENT: "persistent";
    TEMPORARY: "temporary";
    REGISTER_CONTEXT: string;
    // REGISTER_ITEM_CAPTION_CALLBACK: string;
    // REGISTER_ITEM_VISIBILITY_CALLBACK: string;
    // REGISTER_SETTING_VISIBILITY_CALLBACK: string;
    SET_CURRENT_ITEM: string;
    SET_CURRENT_ROUTE: string;
    SET_CURRENT_SETTING: string;
    SET_ITEMS: string;
    SET_MENU_CLOSE: string;
    SET_MENU_OPEN: string;
    SET_MENU_SETTINGS_STATE: string;
    SET_MENU_VARIANT: string;
    SET_MENU_WIDTH: string;
    SET_PARENT_ITEM: string;
    SET_PARENT_SETTING: string;
};

export type MenuVariant = typeof menuTypes.PERSISTENT | typeof menuTypes.TEMPORARY | typeof menuTypes.MINIMIZED;
export type MenuAnchor = typeof menuTypes.MENU_LEFT | typeof menuTypes.MENU_RIGHT;

export function MenuConfigProvider(props: MenuConfigProvider.Props): JSX.Element;

declare namespace MenuConfigProvider {

    export interface Props {
        children: React.ReactNode,
        initValue: InitValues
    }

    export interface InitValues {
        variant?: MenuVariant,
        width: number | string,
        anchor?: MenuAnchor,
    }

    export interface ContextValues extends InitValues {
        open: boolean;
        settingsOpen: boolean;
    }
}

export interface MenuConfigProviderInitValues extends MenuConfigProvider.InitValues {}

export function MenuItemsProvider(props: MenuItemsProvider.Props): JSX.Element;

declare namespace MenuItemsProvider {
    export interface Props {
        children: React.ReactNode,
        initValue: InitValues
    }

    export interface InitValues {
        defaultVisible?: boolean,
        getMenuItems?: () => Array<Item | ItemWithSubitems | ItemDivider>,
        getSettingsItems?: () => Array<Setting | SettingWithSubitems | ItemDivider>
        getItemVisibility?: (any, any) => boolean
    }

    export interface ContextValues extends InitValues {
        contexts: {[key:string]:{config: any, dispatch: (DispatchValues) => void}},
        items: { [key: string]: ItemWithKey | ItemWithSubitemsWithKey | ItemDividerWithKey}, 
        settings: { [key: string]: SettingWithKey | SettingWithSubitemsWithKey}, 
        currentSettingsKeys: { [key: string]: string}, 
    }

    export interface Item {
        caption: string,
        captionId?: string,
        icon?: JSX.Element,
        route: string,
        altRoute?: string,
        iconClassName?: string,
        captionClassName?: string,
    }

    export interface ItemWithSubitems {
        caption: string,
        captionId?: string,
        icon?: JSX.Element,
        iconClassName?: string,
        captionClassName?: string,
        items: Array<Item | ItemWithSubitems>
    }

    export interface Setting {
        caption: string,
        captionId?: string,
        icon?: JSX.Element,
        iconClassName?: string,
        captionClassName?: string,
        dispatcherProps: {type: string},
        configProp: string[],
        configValue: string,
        visibleParams?: unknown,
    }

    export interface SettingWithSubitems {
        caption: string,
        captionId?: string,
        icon?: JSX.Element,
        iconClassName?: string,
        captionClassName?: string,
        visibleParams?: unknown,
        items: Array<Setting | SettingWithSubitems>
    }

    export interface ItemDivider {
        type: string,
    }

    export interface ItemWithKey extends Item {
        key: string,
    }

    export interface ItemWithSubitemsWithKey extends ItemWithSubitems {
        key: string,
    }

    export interface SettingWithKey extends Setting {
        key: string,
    }

    export interface SettingWithSubitemsWithKey extends SettingWithSubitems {
        key: string,
    }

    export interface ItemDividerWithKey extends ItemDivider {
        key: string,
    }  

}

interface AuthValues {
    setCredentials: (credentails: any, dispatch: (DispatchValues) => void) => Promise<any>;
    clearCredentials: (dispatch: any) => Promise<any>;
    authValues?: any
}

export const ItemsContext: React.Context<{value: MenuItemsProvider.ContextValues, dispatch: (DispatchValues) => void}>;

declare const Context: React.Context<{value: MenuConfigProvider.ContextValues, dispatch: (DispatchValues) => void}>;
export default Context;

export function ApplicationBar(_ref: {children: JSX.Element | JSX.Element[] | string, position?: string}): JSX.Element;

export function Menu(_ref: {history: History<LocationState>, backgroundColor?: string, selectedColor?: string
    itemVibilityValues?: any, settingsVibilityValues?: any, itemCaptionCallback?: (captionId: string) => string | undefined }): JSX.Element;

export function MenuLanding(_ref: Children): JSX.Element;

