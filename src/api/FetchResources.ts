import { I_SignupResponse, I_AuthCheckResponse } from './resources/auth';
import {
    I_LoginRequest,
    I_NFCLoginRequest as I_NfcLoginRequest,
} from './resources/auth';
import { I_Room } from './resources/room';
import { I_ModifyUser, I_User, I_UserFilter } from './resources/user';
import { I_FriendRequestParams } from './resources/friend';
import { I_BookingRequest } from './resources/booking';

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
    BOOKINGS = 'bookings',
    EVENTS = 'events',
    EVENTS_MODIFY = 'events/:id',
    EVENT_INVITE = 'events/invite',
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
 * @param U The type of the URL parameters that the resource accepts.
 * @param P The type of the parameters that the resource accepts.
 * @param R The type of the data that the resource returns.
 * @param F The type of the filter that the resource accepts.
 */
export interface FetchResourcesType<U = void, P = void, R = void, F = void> {
    url: U;
    params: P;
    returns: R;
    filter?: F;
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
        [Methods.GET]: FetchResourcesType<
            void,
            void,
            I_Room[],
            { time: string }
        >;
    };
    [FetchResources.GET_USER]: {
        [Methods.GET]: FetchResourcesType<void, void, I_User>;
    };
    [FetchResources.GET_USER_BY_ID]: {
        [Methods.GET]: FetchResourcesType<{ id: string }, void, I_User>;
    };
    [FetchResources.USERS]: {
        [Methods.GET]: FetchResourcesType<void, void, I_User[], I_UserFilter>;
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
    [FetchResources.BOOKINGS]: {
        [Methods.GET]: FetchResourcesType<void, void, void>;
        [Methods.POST]: FetchResourcesType<void, I_BookingRequest, void>;
    };
    [FetchResources.EVENTS]: {
        [Methods.GET]: FetchResourcesType<void, void, void>;
        [Methods.POST]: FetchResourcesType<void, void, void>;
    };
    [FetchResources.EVENTS_MODIFY]: {
        [Methods.PUT]: FetchResourcesType<{ id: string }, void, void>;
        [Methods.DELETE]: FetchResourcesType<{ id: string }, void, void>;
    };
    [FetchResources.EVENT_INVITE]: {
        [Methods.POST]: FetchResourcesType<void, void, void>;
    };
};

export type ResourceMethods<R extends FetchResources> = keyof ResourcesProps[R];

export type ResourceParams<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = ResourcesProps[R][M] extends FetchResourcesType<
    unknown,
    infer P,
    unknown,
    unknown
>
    ? P
    : never;

export type ResourceUrlParams<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = ResourcesProps[R][M] extends FetchResourcesType<
    infer U,
    unknown,
    unknown,
    unknown
>
    ? U
    : never;

export type ResourceReturns<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = ResourcesProps[R][M] extends FetchResourcesType<
    unknown,
    unknown,
    infer T,
    unknown
>
    ? T
    : never;

export type ResourceHasUrlParams<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = ResourceUrlParams<R, M> extends void | null | undefined ? false : true;

export type ResourceFilter<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = ResourcesProps[R][M] extends FetchResourcesType<
    unknown,
    unknown,
    unknown,
    infer F
>
    ? F
    : never;

export type FetchResourcesCallback<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = (body: ResourceParams<R, M>) => Promise<void>;
