import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutProduct from '../components/CheckoutProduct';
import Header from '../components/Header';
import {
	getCart,
	selectCartItems,
	selectIsLoading,
	selectTotal
} from '../store/slices/cartSlice';
import Currency from 'react-currency-formatter';
import { Button } from '@chakra-ui/react';
import { selectAuthToken, selectUserId } from '../store/slices/authSlice';
import Spinner from '../components/Spinner';
import { useStripe } from '@stripe/react-stripe-js';

const Checkout: FC = () => {
	const items = useSelector(selectCartItems);
	const total = useSelector(selectTotal);
	const idToken = useSelector(selectAuthToken);
	const isLoading = useSelector(selectIsLoading);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	// get stripe
	const stripe = useStripe();

	useEffect(() => {
		dispatch(getCart(idToken!));
	}, [dispatch, idToken]);

	function getItems() {
		return items.length === 1 ? 'item' : 'items';
	}

	async function handleCheckout() {
		// call the backend to create checkout session
		const data = await fetch(
			`${process.env.REACT_APP_BASE_URL}/create-checkout-session`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`
				},
				body: JSON.stringify({ items, userId })
			}
		).then(res => res.json());
		// redirect user to the stripe checkout
		await stripe?.redirectToCheckout({ sessionId: data.id });
	}

	return (
		<div className='bg-gray-100'>
			<Header />

			{!isLoading ? (
				<main className='flex flex-col lg:flex-row lg:max-w-7xl mx-auto'>
					{/* Left */}
					<section className='flex-grow bg-white p-6 m-5 shadow space-y-10'>
						<h1 className='text-3xl pb-4 border-b'>
							{items.length > 0
								? 'Your Cart'
								: 'Your Cart is empty'}
						</h1>

						{items.map(
							({
								_id,
								title,
								image,
								price,
								description,
								quantity
							}) => (
								<CheckoutProduct
									key={_id}
									_id={_id}
									title={title}
									price={price}
									image={image}
									quantity={quantity}
									description={description}
								/>
							)
						)}
					</section>

					{/* Right */}
					<section className='flex flex-col bg-white p-6 shadow'>
						{items.length > 0 && (
							<>
								<h3>
									Subtotal ({items.length} {getItems()}):{' '}
									<span className='font-semibold '>
										<Currency
											quantity={total}
											currency='PKR'
										/>
									</span>
								</h3>

								<Button
									role='link'
									colorScheme='yellow'
									mt={4}
									onClick={handleCheckout}
								>
									Proceed to checkout
								</Button>
							</>
						)}
					</section>
				</main>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default Checkout;
