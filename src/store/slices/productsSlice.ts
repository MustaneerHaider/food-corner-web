import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { AppDispatch, RootState } from '../store';

interface ProductState {
	products: Product[];
	orders: Order[];
	loading: boolean;
}

const initialState: ProductState = {
	products: [],
	orders: [],
	loading: false
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts(state, { payload }: PayloadAction<{ prods: Product[] }>) {
			state.products = payload.prods;
		},
		setIsLoading(state, { payload }: PayloadAction<boolean>) {
			state.loading = payload;
		},
		setOrders(state, { payload }: PayloadAction<{ orders: Order[] }>) {
			state.orders = payload.orders;
		}
	}
});
// actions
export const { setIsLoading, setProducts, setOrders } = productsSlice.actions;

// selectors
export const selectProducts = (state: RootState) => state.prods.products;
export const selectOrders = (state: RootState) => state.prods.orders;
export const selectIsLoading = (state: RootState) => state.prods.loading;

// get products with thunk
export const fetchProducts =
	(token: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(setIsLoading(true));
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/products`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			const data = await res.json();
			dispatch(setProducts({ prods: data.products }));
			dispatch(setIsLoading(false));
		} catch (err) {
			dispatch(setIsLoading(false));
			alert((err as Error).message);
		}
	};

// get orders
export const fetchOrders = (token: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setIsLoading(true));
		const res = await fetch(
			`${process.env.REACT_APP_BASE_URL}/products/orders`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		const data = await res.json();
		dispatch(setOrders({ orders: data.orders }));
		dispatch(setIsLoading(false));
	} catch (err) {
		dispatch(setIsLoading(false));
		alert((err as Error).message);
	}
};

export default productsSlice.reducer;
