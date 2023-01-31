import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

const authSelector = (state: RootState) => state.auth;

const logged = createSelector(authSelector, auth => auth.logged);
const hasLoggedOut = createSelector(authSelector, auth => auth.hasLoggedOut);

const AuthSelectors = {
    logged,
    hasLoggedOut,
};

export default AuthSelectors;
