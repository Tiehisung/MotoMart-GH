import { IUser } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: Partial<IUser> | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('motomart_token'),
    isAuthenticated: !!localStorage.getItem('motomart_token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: Partial<IUser>; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('motomart_token', action.payload.token);
        },
        setUser: (state, action: PayloadAction<Partial<IUser>>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('motomart_token');
            
            // Clear localStorage
            localStorage.removeItem('persist:auth');
            localStorage.removeItem('persist:listing');

            // Clear sessionStorage (if used)
            sessionStorage.clear();
        },
        updateVerificationStatus: (state, action: PayloadAction<{ isVerified: boolean }>) => {
            if (state.user) {
                state.user.isVerified = action.payload.isVerified;
            }
        },
    },
});

export const { setCredentials, setUser, logout, updateVerificationStatus } = authSlice.actions;
export default authSlice.reducer;