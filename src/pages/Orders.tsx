import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Order from '../components/Order';
import { selectAuthToken } from '../store/slices/authSlice';
import {
	fetchOrders,
	selectIsLoading,
	selectOrders
} from '../store/slices/productsSlice';
import Spinner from '../components/Spinner';
import { Spinner as Loader } from '@chakra-ui/react';

const Orders: FC = () => {
	const orders = useSelector(selectOrders);
	const idToken = useSelector(selectAuthToken);
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();

	console.log(orders);

	useEffect(() => {
		dispatch(fetchOrders(idToken!));
	}, [dispatch, idToken]);

	function getItems() {
		return orders.length === 1 ? 'order' : 'orders';
	}

	return (
		<div className='pb-10'>
			<Header />

			<main className='max-w-5xl mx-auto mt-10'>
				<h1 className='text-3xl pb-2 border-b border-yellow-500'>
					Your Orders
				</h1>

				<h3 className='font-semibold mt-2'>
					{!isLoading ? orders.length : <Loader size='xs' />}{' '}
					{getItems()}
				</h3>

				{isLoading ? (
					<Spinner />
				) : (
					<section className='mt-5 space-y-8'>
						{orders.map(order => (
							<Order
								_id={order._id}
								key={order._id}
								products={order.products}
								createdAt={order.createdAt}
								totalAmount={order.totalAmount}
							/>
						))}
					</section>
				)}
			</main>
		</div>
	);
};

export default Orders;
