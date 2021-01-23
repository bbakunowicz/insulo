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

interface Children {
    children: JSX.Element[] | JSX.Element
}

interface DispatchValues {
    type: string
}

export const authTypes: {
    SET_AUTH_VALUES: 'SET_AUTH_VALUES';
    SET_AUTH_STATE: 'SET_AUTH_STATE';
    SET_LOADING_STATE: 'SET_LOADING_STATE';
    AUTH_STATE_UNSET: 'UNSET';
    AUTH_STATE_SET: 'SET';
    AUTH_STATE_ERROR: 'ERROR';
    AUTH_STATE_LOGINPROGRESS: 'LOGINPROGRESS';
    AUTH_STATE_LOGOUTPROGRESS: 'LOGOUTPROGRESS';    
    LS_AUTH_VALUES: 'insulo:auth:values';
    AUTH_SEVERITY_INFO: 'autherr_info';
    AUTH_SEVERITY_ERROR: 'autherr_error';
    AUTH_ERROR_INITIALIZING: 'autherr_initializing';
};

export type AuthState = typeof authTypes.AUTH_STATE_UNSET | typeof authTypes.AUTH_STATE_SET | typeof authTypes.AUTH_STATE_ERROR | 
    typeof authTypes.AUTH_STATE_LOGINPROGRESS | typeof authTypes.AUTH_STATE_LOGOUTPROGRESS;

export type AuthErrorSeverity = typeof authTypes.AUTH_SEVERITY_INFO | typeof authTypes.AUTH_SEVERITY_ERROR;

export function RouteConfigProvider(props: RouteConfigProvider.Props): JSX.Element;

declare namespace RouteConfigProvider {
    export interface Props {
        children: React.ReactNode,
        initValue: InitValues
    }

    export interface AuthProps {
        authProps: any
    }

    export interface InitValues {
        defaultRedirect?: string,
        AuthErrorPage?: (ref: {authError: string, authErrorId?: string, authErrorSeverity: AuthErrorSeverity}) => JSX.Element,
        getPageVisibility?: (authValues: any, authProps: any) => boolean
    }
}

export const AuthConfigProvider: ({ children, initValue }: {
    children: React.ReactNode;
    initValue: AuthConfigProvider.InitValues;
}) => JSX.Element

declare namespace AuthConfigProvider {
    export interface InitValues {
        setCredentials: ({credentials, additionalProps}: {credentials: any, additionalProps?: any}) => Promise<any> | any;
        clearCredentials?: ({additionalProps}:{additionalProps?: any}) => Promise<undefined> | undefined;
        redirectWhenInvalidCredentails?: boolean;
        saveAuthValues?: boolean;
        saveAuthValuesDecode?: ({authValuesStr}:{authValuesStr: string}) => any;
        saveAuthValuesEncode?: ({authValues}:{authValues: any}) => string;
        authValuesKey?: string
    }

    export interface Actions {
        setCredentials: ({ credentials, additionalProps }: {
            credentials: any,
            additionalProps?: any
        }) => void,
        clearCredentials: ({ additionalProps }: {
            additionalProps?: any
        }) => void | undefined
    }

    export interface ContextValues extends InitValues {
        authValues?: any,
        authState: AuthState,
        authError?: {name?: string, message: string}
    }
}

export function ProtectedRoute({ authProps, getPageVisibility, component: Component, componentProps, 
    redirectRoute, forwardRoute, authError, authErrorPage, path, ...rest }: {
    [x: string]: any;
    authProps?: any;
    getPageVisibility?: (authValues: any, authProps: any) => boolean;
    component?: (any) => JSX.Element | JSX.Element;
    componentProps?: any;
    redirectRoute?: string;
    forwardRoute?: string;
    authError?: string;
    authErrorPage?: (props: {authError?: string}) => JSX.Element;
    path: string;
}): JSX.Element

declare const Context: React.Context<{value: RouteConfigProvider.InitValues, dispatch: (DispatchValues) => void}>;
export default Context;

export const AuthContext: React.Context<{value: AuthConfigProvider.ContextValues, dispatch: (DispatchValues) => void, 
    actions: AuthConfigProvider.Actions}>

export interface RouteProviderInitValues extends RouteConfigProvider.InitValues {}

export interface AuthProviderInitValues extends AuthConfigProvider.InitValues {}

export = AuthConfigProvider;
