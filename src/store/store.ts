import {
	configureStore,
	combineReducers,
	PayloadAction
} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';

const combinedReducer = combineReducers({
	auth: authReducer,
	cart: cartReducer,
	prods: productsReducer
});

const rootReducer = (state: any, action: PayloadAction) => {
	if (action.type === 'authentication/logout') {
		// remove auth data from LS
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('isAdmin');
		// reset the store
		state = undefined;
	}
	return combinedReducer(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
