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

interface DispatchValues {
    type: string
}

export const localeTypes: {
    LS_CURRENT_LOCALE: string;
    SET_CURRENT_LOCALE: string;
};

export function LocaleConfigProvider(_ref: LocaleConfigProvider.Props): JSX.Element;

declare namespace LocaleConfigProvider {
    export interface Props {
        children: React.ReactNode,
        initValue: InitValues
    }

    export interface InitValues {
        defaultLang: string,
        locales: {
            [k:string]:{
                [k1:string]: string
            }
        },
        mappingsMui: {
            [k:string]: string
        },
        mappingsHtml: {
            [k:string]: string
        }
    }

    export interface ContextValue extends InitValues {
        lang: string,
        supportedLocales: string[],
        currentLocale: string,
        currentLocaleMui: string,
        currentLocaleHtml: string,
        getString: ({locales, locale, id}: {locales: string[], locale: string, id: string}) => string | undefined
    }

}

export const getItemCaption: (localeConfig: LocaleConfigProvider.ContextValue) => (captionId: string) => string | undefined;

declare const Context: React.Context<{value: LocaleConfigProvider.ContextValue, dispatch: (DispatchValues) => void}>;
export default Context;

export interface LocaleProviderInitValues extends LocaleConfigProvider.InitValues {}
