import { I_SignupResponse, I_AuthCheckResponse } from './resources/auth';
import {
    I_LoginRequest,
    I_NFCLoginRequest as I_NfcLoginRequest,
} from './resources/auth';
import { I_Room } from './resources/room';
import { I_User } from './resources/user';

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
    GET_USERS = 'users',
}

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * @description
 * This interface is used to define the properties of a resource.
 * @param P The type of the parameters that the resource accepts.
 * @param T The type of the data that the resource returns.
 * @param M The method(s) that the resource uses.
 */
export interface FetchResourcesType<U, P, T, M extends Methods> {
    url: U;
    params: P;
    returns: T;
    methods: M;
}

export type ResourcesProps = {
    [FetchResources.PING]: FetchResourcesType<void, void, string, 'GET'>;
    [FetchResources.LOGIN]: FetchResourcesType<
        void,
        I_LoginRequest,
        string,
        'POST'
    >;
    [FetchResources.SIGNUP]: FetchResourcesType<
        void,
        I_LoginRequest & Partial<I_NfcLoginRequest>,
        I_SignupResponse,
        'POST'
    >;
    [FetchResources.ADD_CARD]: FetchResourcesType<
        void,
        undefined,
        undefined,
        'PUT'
    >;
    [FetchResources.LOGIN_NFC]: FetchResourcesType<
        void,
        I_NfcLoginRequest,
        string,
        'POST'
    >;
    [FetchResources.CHECK_TOKEN]: FetchResourcesType<
        void,
        void,
        I_AuthCheckResponse,
        'GET'
    >;
    [FetchResources.EMPTY_ROOMS]: FetchResourcesType<
        void,
        void,
        I_Room[],
        'GET'
    >;
    [FetchResources.GET_USER]: FetchResourcesType<void, void, I_User, 'GET'>;
    [FetchResources.GET_USER_BY_ID]: FetchResourcesType<
        { id: string },
        void,
        I_User,
        'GET'
    >;
    [FetchResources.GET_USERS]: FetchResourcesType<void, void, I_User[], 'GET'>;
};

export type ResourceParams<R extends FetchResources> =
    ResourcesProps[R]['params'];
export type ResourceUrlParams<R extends FetchResources> =
    ResourcesProps[R]['url'];
export type ResourceReturns<R extends FetchResources> =
    ResourcesProps[R]['returns'];
export type ResourceMethods<R extends FetchResources> =
    ResourcesProps[R]['methods'];

export type ResourceHasUrlParams<R extends FetchResources> =
    ResourceUrlParams<R> extends void | null | undefined ? false : true;

export type FetchResourcesCallback<R extends FetchResources> = (
    body: ResourceParams<R>
) => Promise<void>;
