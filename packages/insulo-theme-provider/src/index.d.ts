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

import type {ThemeOptions} from '@material-ui/core/styles';

export const themeTypes: {
    DARK: "dark";
    LIGHT: "light";
    LS_THEME_TYPE: string;
    LS_THEME_CURRENT: string;
    SET_THEME: string;
    SET_THEME_TYPE: string;
    SET_THEMES: string;
};

export type ThemeType = typeof themeTypes.DARK | typeof themeTypes.LIGHT; 

export function ThemeConfigProvider(props: ThemeConfigProvider.Props): JSX.Element;

declare namespace ThemeConfigProvider {
    export interface Props {
        children: JSX.Element | JSX.Element[],
        initValue: InitValues
    }

    export type BackgroundProps = 'primary-light' | 'primary-main' | 'secondary-light' | 'secondary-main';
    export type SelectedProps = 'primary-dark' | 'primary-main' | 'secondary-dark' | 'secondary-main';

    export type ColorProps = {background?: BackgroundProps, selected?: SelectedProps}

    export interface ThemeProps {
        id: string,
        background?: string,
        selected?: string,
        props: ThemeOptions
    }

    export interface InitValues {
        type?: ThemeType,
        current: string,
        themes: ThemeProps[]
    }

    export interface ContextValues {
        type?: ThemeType,
        current: string,
        themes: ThemeProps[],
        themesCnv: {
            [key:string]: ThemeProps
        },
        prepared: boolean
    }
}

interface DispatchValues {
    type: string
}

declare const Context: React.Context<{value: ThemeConfigProvider.ContextValues, dispatch: (DispatchValues) => void, 
    actions: {getProps:(string, ThemeType) => any }}>
export default Context;

export interface ThemeConfigProviderInitValues extends ThemeConfigProvider.InitValues {}
