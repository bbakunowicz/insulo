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

interface Children {
    children: JSX.Element[] | JSX.Element
}

interface DispatchValues {
    type: string
}

export const authTypes: {
    SET_AUTH_VALUES: string;
    SET_AUTH_STATE: string;
    AUTH_STATE_UNSET: 'UNSET';
    AUTH_STATE_SET: 'SET';
    AUTH_STATE_ERROR: 'ERROR';
    AUTH_STATE_LOGINPROGRESS: 'LOGINPROGRESS';
    AUTH_STATE_LOGOUTPROGRESS: 'LOGOUTPROGRESS';    
};

export type AuthState = typeof authTypes.AUTH_STATE_UNSET | typeof authTypes.AUTH_STATE_SET | typeof authTypes.AUTH_STATE_ERROR | 
    typeof authTypes.AUTH_STATE_LOGINPROGRESS | typeof authTypes.AUTH_STATE_LOGOUTPROGRESS;

export function RouteConfigProvider(props: RouteConfigProvider.Props): JSX.Element;

declare namespace RouteConfigProvider {
    export interface Props {
        children: React.ReactNode,
        initValue: InitValues
    }

    export interface AuthProps {
        authProps: any
    }

    export interface AuthId {
        [key: string]: AuthProps
    }

    export interface InitValues {
        defaultRedirect?: string,
        defaultForward?: string,
        authId: AuthId
    }
}

export const AuthConfigProvider: ({ children, initValue }: {
    children: React.ReactNode;
    initValue: AuthConfigProvider.InitValues;
}) => JSX.Element

declare namespace AuthConfigProvider {
    export interface InitValues {
        setCredentials: (credentails: any, dispatch: (DispatchValues) => void) => Promise<any>;
        clearCredentials: (dispatch: any) => Promise<any>;
        clearCredentialsImmediately?: boolean
    }

    export interface Actions {
        setCredentials: ({ credentials, dispatchState, history, route }: {
            credentials: any;
            dispatchState: (DispatchValues) => void;
            history: History<LocationState>;
            route: string;
        }) => void,
        clearCredentials: ({ history, route, dispatchState }: {
            history: History<LocationState>;
            route: string;
            dispatchState: (DispatchValues) => void;
        }) => void | undefined
    }

    export interface ContextValues extends InitValues {
        authValues?: any
    }
}

export const AuthStateConfigProvider: ({ children }: {
    children: React.ReactNode;
}) => JSX.Element

declare namespace AuthStateConfigProvider {
    interface ContextValues {
        authState: AuthState
    }
}

export function ProtectedRoute({ authProps, authId, authValues, getPageVisibility, component: Component, componentProps, 
    redirectRoute, publicRoute, forwardRoute, authError, path, ...rest }: {
    [x: string]: any;
    authProps?: any;
    authId?: string;
    authValues?: any; 
    getPageVisibility?: (authValues: any, authProps: any) => boolean;
    component?: (any) => JSX.Element | JSX.Element;
    componentProps?: any;
    redirectRoute?: string;
    publicRoute?: boolean;
    forwardRoute?: string;
    authError?: string;
    path: string;
}): JSX.Element

declare const Context: React.Context<{value: RouteConfigProvider.InitValues, dispatch: (DispatchValues) => void}>;
export default Context;

export const AuthContext: React.Context<{value: AuthConfigProvider.ContextValues, dispatch: (DispatchValues) => void, 
    actions: AuthConfigProvider.Actions}>

export const AuthStateContext: React.Context<{value: AuthStateConfigProvider.ContextValues, dispatch: (DispatchValues) => void}>
