import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

interface AuthState {
	tokenId: string | null;
	userId: string | null;
	isAdmin: string;
}

const initialState: AuthState = {
	tokenId: null,
	userId: null,
	isAdmin: 'user'
};

const authSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		login(
			state,
			{
				payload
			}: PayloadAction<{
				token: string;
				userId: string;
				expiresIn?: number;
				isAdmin?: boolean;
			}>
		) {
			state.tokenId = payload.token;
			state.userId = payload.userId;
			state.isAdmin = payload.isAdmin ? 'admin' : 'user';

			// store token, userId & expiresIn to local storage
			localStorage.setItem('token', payload.token);
			localStorage.setItem('userId', payload.userId);
			if (payload.expiresIn) {
				const expirationDate = new Date(
					new Date().getTime() + payload.expiresIn * 1000
				);
				localStorage.setItem(
					'expirationDate',
					JSON.stringify(expirationDate)
				);
			}
			// store isAdmin, if exists
			if (payload.isAdmin) {
				localStorage.setItem('isAdmin', 'admin');
			}

			// auto logout trigger after login.
			if (payload.expiresIn) {
				autoLogout(payload.expiresIn);
			}
		},
		logout(state) {
			state.tokenId = null;
			state.userId = null;

			// remove auth data from LS
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
			localStorage.removeItem('expirationDate');
			localStorage.removeItem('isAdmin');
		}
	}
});

export const { login, logout } = authSlice.actions;

// selector: to pull data from store
export const selectAuthStatus = (state: RootState) =>
	state.auth.tokenId !== null;

export const selectIsAdmin = (state: RootState) =>
	state.auth.isAdmin === 'admin';

export const selectAuthToken = (state: RootState) => state.auth.tokenId;
export const selectUserId = (state: RootState) => state.auth.userId;

// auto logout
const autoLogout = (expirationTime: number) => (dispatch: AppDispatch) => {
	setTimeout(() => dispatch(logout()), expirationTime * 1000);
};

// persist auth state
export const autoLogin = () => (dispatch: AppDispatch) => {
	const token = localStorage.getItem('token');
	if (!token) {
		dispatch(logout());
	} else {
		const expirationDate = new Date(
			JSON.parse(localStorage.getItem('expirationDate')!)
		);
		if (expirationDate <= new Date()) {
			dispatch(logout());
		} else {
			const userId = localStorage.getItem('userId');
			const userStatus = localStorage.getItem('isAdmin');
			const expirationTime =
				(expirationDate.getTime() - new Date().getTime()) / 1000;
			dispatch(
				login({
					token,
					userId: userId!,
					isAdmin: userStatus === 'admin'
				})
			);
			dispatch(autoLogout(expirationTime));
		}
	}
};

export default authSlice.reducer;
