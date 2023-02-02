import { createAction } from '@reduxjs/toolkit';
import { I_LoginRequest } from '../../../api/resources/auth';

interface I_AuthPayload {}

interface I_LogoutPayload extends I_AuthPayload {}

interface I_LoginPayload extends I_AuthPayload, I_LoginRequest {}

const AuthActions = {
    login: createAction<I_LoginPayload | undefined>('auth/login'),
    logout: createAction<I_LogoutPayload | undefined>('auth/logout'),
};

export default AuthActions;
