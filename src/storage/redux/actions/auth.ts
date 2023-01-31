import { createAction } from '@reduxjs/toolkit';

interface I_AuthPayload {}

interface I_LogoutPayload extends I_AuthPayload {}

interface I_LoginPayload extends I_AuthPayload {}

const AuthActions = {
    login: createAction<I_LoginPayload | undefined>('auth/login'),
    logout: createAction<I_LogoutPayload | undefined>('auth/logout'),
};

export default AuthActions;
