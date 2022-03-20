import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/product';
import { AppDispatch, RootState } from '../store';

interface CartState {
	cart: {
		items: Product[];
	};
	loading: boolean;
}

const initialState: CartState = {
	cart: {
		items: []
	},
	loading: false
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartItems(state, { payload }: PayloadAction<{ items: Product[] }>) {
			state.cart.items = payload.items;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		addToCart(state, { payload }: PayloadAction<Product>) {
			const itemIndex = state.cart.items.findIndex(
				item => item._id === payload._id
			);

			if (itemIndex >= 0) {
				state.cart.items[itemIndex].quantity!++;
			} else {
				state.cart.items.push(payload);
			}
		},
		removeFromCart(
			state,
			{ payload: { id } }: PayloadAction<{ id: string }>
		) {
			state.cart.items = state.cart.items.filter(item => item._id !== id);
		},
		incrementQuantity(
			state,
			{ payload: { id } }: PayloadAction<{ id: string }>
		) {
			const itemIndex = state.cart.items.findIndex(
				item => item._id === id
			);
			state.cart.items[itemIndex].quantity! += 1;
		},
		decrementQuantity(
			state,
			{ payload: { id } }: PayloadAction<{ id: string }>
		) {
			const itemIndex = state.cart.items.findIndex(
				item => item._id === id
			);
			if (state.cart.items[itemIndex].quantity === 1) {
				state.cart.items.splice(itemIndex, 1);
			} else {
				state.cart.items[itemIndex].quantity! -= 1;
			}
		}
	}
});

export const {
	addToCart,
	removeFromCart,
	incrementQuantity,
	decrementQuantity,
	setCartItems,
	setLoading
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cart.items;
export const selectTotal = (state: RootState) =>
	state.cart.cart.items.reduce(
		(total, { quantity, price }) => total + price * quantity!,
		0
	);
export const selectIsLoading = (state: RootState) => state.cart.loading;

// thunk stuff
export const postCart =
	(prod: Product, token: string) => async (dispatch: AppDispatch) => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/products/cart`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({ id: prod._id })
				}
			);
			await res.json();

			if (!res.ok) {
				throw new Error('An error occured.');
			}

			dispatch(addToCart(prod));
		} catch (err) {
			alert((err as Error).message);
		}
	};

export const deleteFromCart =
	(prodId: string, token: string) => async (dispatch: AppDispatch) => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/products/cart/${prodId}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			);
			await res.json();

			if (!res.ok) {
				throw new Error('An error occured.');
			}

			dispatch(removeFromCart({ id: prodId }));
		} catch (err) {
			alert((err as Error).message);
		}
	};

export const getCart = (token: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setLoading(true));
		const res = await fetch(
			`${process.env.REACT_APP_BASE_URL}/products/cart`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		const data = await res.json();
		const transformedItems: Product[] = data.items.map(
			({
				productId,
				quantity
			}: {
				productId: Product;
				quantity: number;
			}) => ({
				_id: productId._id?.toString(),
				title: productId.title,
				image: productId.image,
				price: productId.price,
				description: productId.description,
				quantity: quantity
			})
		);

		dispatch(setCartItems({ items: transformedItems }));
		dispatch(setLoading(false));
	} catch (err) {
		dispatch(setLoading(false));
		alert((err as Error).message);
	}
};

export const incrementProductQuantity =
	(prodId: string, token: string) => async (dispatch: AppDispatch) => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/products/cart/increment/${prodId}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			);
			await res.json();

			if (!res.ok) {
				throw new Error('An error occured.');
			}

			dispatch(incrementQuantity({ id: prodId }));
		} catch (err) {
			alert((err as Error).message);
		}
	};

export const decrementProductQuantity =
	(prodId: string, token: string) => async (dispatch: AppDispatch) => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/products/cart/decrement/${prodId}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			);
			await res.json();

			if (!res.ok) {
				throw new Error('An error occured.');
			}

			dispatch(decrementQuantity({ id: prodId }));
		} catch (err) {
			alert((err as Error).message);
		}
	};

export default cartSlice.reducer;
