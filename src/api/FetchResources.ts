import { I_SignupResponse, I_AuthCheckResponse } from './resources/auth';
import {
    I_LoginRequest,
    I_NFCLoginRequest as I_NfcLoginRequest,
} from './resources/auth';
import { I_Room } from './resources/room';
import { I_ModifyUser, I_User } from './resources/user';
import { I_FriendRequestParams } from './resources/friend';

/**
 * @description
 * This enum is used to define the resources that can be fetched from the API.
 * If you add a resource, you must add it to the {@link ResourcesProps} interface.
 */
export enum FetchResources {
    PING = 'ping',
    LOGIN = 'auth/login',
    SIGNUP = 'auth/signup',
    ADD_CARD = 'auth/nfc/id',
    LOGIN_NFC = 'auth/nfc/login',
    CHECK_TOKEN = 'auth/check',
    EMPTY_ROOMS = 'rooms/empty',
    GET_USER = 'users/me',
    GET_USER_BY_ID = 'users/:id',
    USERS = 'users',
    FRIENDS = 'friends',
    FRIENDS_REQUESTS = 'friends/requests',
    FRIENDS_REQUESTS_SENT = 'friends/requests/sent',
}

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

/**
 * @description
 * This interface is used to define the properties of a resource.
 * @param P The type of the parameters that the resource accepts.
 * @param T The type of the data that the resource returns.
 * @param M The method(s) that the resource uses.
 */
export interface FetchResourcesType<U = void, P = void, R = void> {
    url: U;
    params: P;
    returns: R;
}

export type ResourcesProps = {
    [FetchResources.PING]: {
        [Methods.GET]: FetchResourcesType<void, void, string>;
    };
    [FetchResources.LOGIN]: {
        [Methods.POST]: FetchResourcesType<void, I_LoginRequest, string>;
    };
    [FetchResources.SIGNUP]: {
        [Methods.POST]: FetchResourcesType<
            void,
            I_LoginRequest & Partial<I_NfcLoginRequest>,
            I_SignupResponse
        >;
    };
    [FetchResources.ADD_CARD]: {
        [Methods.PUT]: FetchResourcesType<void, I_NfcLoginRequest, undefined>;
    };
    [FetchResources.LOGIN_NFC]: {
        [Methods.POST]: FetchResourcesType<void, I_NfcLoginRequest, string>;
    };
    [FetchResources.CHECK_TOKEN]: {
        [Methods.GET]: FetchResourcesType<void, void, I_AuthCheckResponse>;
    };
    [FetchResources.EMPTY_ROOMS]: {
        [Methods.GET]: FetchResourcesType<void, void, I_Room[]>;
    };
    [FetchResources.GET_USER]: {
        [Methods.GET]: FetchResourcesType<void, void, I_User>;
    };
    [FetchResources.GET_USER_BY_ID]: {
        [Methods.GET]: FetchResourcesType<{ id: string }, void, I_User>;
    };
    [FetchResources.USERS]: {
        [Methods.GET]: FetchResourcesType<void, void, I_User[]>;
        [Methods.PUT]: FetchResourcesType<void, I_ModifyUser, string>;
    };
    [FetchResources.FRIENDS]: {
        [Methods.GET]: FetchResourcesType<void, void, I_User[]>;
        [Methods.PUT]: FetchResourcesType<void, I_FriendRequestParams, void>;
        [Methods.DELETE]: FetchResourcesType<void, { id: string }>;
        [Methods.POST]: FetchResourcesType<void, { id: string }>;
    };
    [FetchResources.FRIENDS_REQUESTS]: {
        [Methods.GET]: FetchResourcesType<void, void, I_User[]>;
    };
    [FetchResources.FRIENDS_REQUESTS_SENT]: {
        [Methods.GET]: FetchResourcesType<void, void, I_User[]>;
    };
};

export type ResourceMethods<R extends FetchResources> = keyof ResourcesProps[R];

export type ResourceParams<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = ResourcesProps[R][M] extends FetchResourcesType<any, infer P, any>
    ? P
    : never;

export type ResourceUrlParams<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = ResourcesProps[R][M] extends FetchResourcesType<infer U, any, any>
    ? U
    : never;

export type ResourceReturns<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = ResourcesProps[R][M] extends FetchResourcesType<any, any, infer T>
    ? T
    : never;

export type ResourceHasUrlParams<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = ResourceUrlParams<R, M> extends void | null | undefined ? false : true;

export type FetchResourcesCallback<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = (body: ResourceParams<R, M>) => Promise<void>;
