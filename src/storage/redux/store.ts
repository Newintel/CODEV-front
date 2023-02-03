import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './reducers/auth';

export interface RootState {
    auth: AuthState;
}

const store = configureStore<RootState>({
    reducer: {
        auth: authReducer,
    },
});

export default store;
