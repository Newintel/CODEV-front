import { I_SignupResponse, I_AuthCheckResponse } from './resources/auth';
import {
    I_LoginRequest,
    I_NFCLoginRequest as I_NfcLoginRequest,
} from './resources/auth';
import { I_Room } from './resources/room';

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
}

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * @description
 * This interface is used to define the properties of a resource.
 * @param P The type of the parameters that the resource accepts.
 * @param T The type of the data that the resource returns.
 * @param M The method(s) that the resource uses.
 */
export interface FetchResourcesType<P, T, M extends Methods> {
    params: P;
    returns: T;
    methods: M;
}

export type ResourcesProps = {
    [FetchResources.PING]: FetchResourcesType<void, string, 'GET'>;
    [FetchResources.LOGIN]: FetchResourcesType<I_LoginRequest, string, 'POST'>;
    [FetchResources.SIGNUP]: FetchResourcesType<
        I_LoginRequest & Partial<I_NfcLoginRequest>,
        I_SignupResponse,
        'POST'
    >;
    [FetchResources.ADD_CARD]: FetchResourcesType<undefined, undefined, 'PUT'>;
    [FetchResources.LOGIN_NFC]: FetchResourcesType<
        I_NfcLoginRequest,
        string,
        'POST'
    >;
    [FetchResources.CHECK_TOKEN]: FetchResourcesType<
        void,
        I_AuthCheckResponse,
        'GET'
    >;
    [FetchResources.EMPTY_ROOMS]: FetchResourcesType<void, I_Room[], 'GET'>;
};

export type ResourceParams<R extends FetchResources> =
    ResourcesProps[R]['params'];
export type ResourceReturns<R extends FetchResources> =
    ResourcesProps[R]['returns'];
export type ResourceMethods<R extends FetchResources> =
    ResourcesProps[R]['methods'];

export type FetchResourcesCallback<R extends FetchResources> = (
    body: ResourceParams<R>
) => Promise<void>;
