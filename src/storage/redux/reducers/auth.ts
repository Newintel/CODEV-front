import { createReducer } from '@reduxjs/toolkit';
import AuthActions from '../actions/auth';

export interface AuthState {
    logged: boolean;
    hasLoggedOut: boolean;
}

const initialState: AuthState = {
    logged: false,
    hasLoggedOut: false,
};

const authReducer = createReducer(initialState, builder => {
    builder
        .addCase(AuthActions.login, state => {
            state.logged = true;
            state.hasLoggedOut = false;
        })
        .addCase(AuthActions.logout, state => {
            state.logged = false;
            state.hasLoggedOut = true;
        });
});

export default authReducer;
