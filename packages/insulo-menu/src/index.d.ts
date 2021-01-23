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
    MINIMIZED: "minimized";
    PERSISTENT: "persistent";
    TEMPORARY: "temporary";
    CALL_DISPATCH: string;
    CLEAR_PARENT_ITEM: string;
    CLEAR_PARENT_SETTING: string;
    LS_MENU_OPENED: string;
    LS_MENU_VARIANT: string;
    MENU_DIVIDER: string;
    MENU_LEFT: "left";
    MENU_RIGHT: "right";
    MENU_MINIMIZED: 'menu_minimized';
    MENU_PERSISTENT: 'menu_persistent';
    MENU_TEMPORARY: 'menu_temporary';
    MENU_VARIANTS: 'menu_variants';
    SET_CURRENT_ITEM: string;
    SET_CURRENT_ROUTE: string;
    SET_CURRENT_SETTING: string;
    SET_ITEMS: string;
    SET_MENU_CLOSE: string;
    SET_MENU_OPEN: string;
    SET_MENU_SETTINGS_STATE: string;
    SET_MENU_VARIANT: string;
    SET_PARENT_ITEM: string;
    SET_PARENT_SETTING: string;
    SET_PERSISTENT_ENABLED: string;
    REGISTER_CONTEXT: string;
};

export type MenuVariant = typeof menuTypes.PERSISTENT | typeof menuTypes.TEMPORARY | typeof menuTypes.MINIMIZED;
export type MenuAnchor = typeof menuTypes.MENU_LEFT | typeof menuTypes.MENU_RIGHT;

export function MenuProvider(props: MenuProvider.Props): JSX.Element;

declare namespace MenuProvider {
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
        authProps?: unknown,
    }

    export interface SettingWithSubitems {
        caption: string,
        captionId?: string,
        icon?: JSX.Element,
        iconClassName?: string,
        captionClassName?: string,
        authProps?: unknown,
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

    export interface Props {
        children: React.ReactNode,
        initValue: InitValues
    }

    export interface InitValues {
        width: number | string,
        variant?: MenuVariant,
        availableVariants?: MenuVariant[],
        anchor?: MenuAnchor,
        defaultVisible?: boolean,
        getMenuItems?: () => Array<Item | ItemWithSubitems | ItemDivider>,
        getSettingsItems?: () => Array<Setting | SettingWithSubitems | ItemDivider>
        items?: Array<Item | ItemWithSubitems | ItemDivider>,
        settings?: Array<Setting | SettingWithSubitems | ItemDivider>
        getItemVisibility?: (authValues: any, authProps: any) => boolean,
        getSettingVisibility?: (authValues: any, authProps: any) => boolean,
        ApplicationBarContent?: ({children}:{children: JSX.Element[] | JSX.Element}) => JSX.Element,
        persistentMenuMinWindowSize?: number
    }

    export interface ContextValues extends InitValues {
        open: boolean,
        settingsOpen: boolean,
        contexts: {[key:string]:{config: any, dispatch: (DispatchValues) => void}},
        items: { [key: string]: ItemWithKey | ItemWithSubitemsWithKey | ItemDividerWithKey}, 
        settings: { [key: string]: SettingWithKey | SettingWithSubitemsWithKey}, 
        currentSettingsKeys: { [key: string]: string}, 
    }
}

declare const Context: React.Context<{value: MenuProvider.ContextValues, dispatch: (DispatchValues) => void}>;
export default Context;

export function ApplicationBar(_ref: {children: JSX.Element | JSX.Element[] | string, position?: string}): JSX.Element;

export function Landing(_ref: {
    children: JSX.Element | JSX.Element[] | string,
    backgroundColor?: string | undefined; 
    selectedColor?: string | undefined; 
    itemVibilityValues?: any; 
    settingsVibilityValues?: any; 
    itemCaptionCallback: (captionId: string) => string | undefined;
}): JSX.Element;

export function Menu(_ref: {history: History<LocationState>, backgroundColor?: string, selectedColor?: string
    itemVibilityValues?: any, settingsVibilityValues?: any, itemCaptionCallback?: (captionId: string) => string | undefined }): JSX.Element;

export function MenuLanding(_ref: Children): JSX.Element;

export interface MenuProviderInitValues extends MenuProvider.InitValues {}

