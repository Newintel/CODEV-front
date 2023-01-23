import { I_SignupResponse, I_AuthCheckResponse } from './resources/auth';
import {
    I_LoginRequest,
    I_NFCLoginRequest as I_NfcLoginRequest,
} from './resources/auth';

export enum FetchResources {
    PING = 'ping',
    LOGIN = 'auth/login',
    SIGNUP = 'auth/signup',
    ADD_CARD = 'auth/nfc/id',
    LOGIN_NFC = 'auth/nfc/login',
    CHECK_TOKEN = 'auth/check',
}

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchResourcesType<P, T, M extends Methods> {
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
