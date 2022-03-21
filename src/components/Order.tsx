import { FC } from 'react';
import { Order as OrderProps } from '../models/order';
import Currency from 'react-currency-formatter';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../store/slices/authSlice';

const Order: FC<OrderProps> = ({ products, createdAt, totalAmount, _id }) => {
	const idToken = useSelector(selectAuthToken);

	const getQuantity = () => {
		return products.reduce((total, { quantity }) => {
			return total + quantity;
		}, 0);
	};

	const getInvoiceHandler = async () => {
		await fetch(
			`${process.env.REACT_APP_BASE_URL}/products/invoice/${_id}`,
			{
				headers: {
					Authorization: `Bearer ${idToken}`
				}
			}
		);
	};

	return (
		<div className='border rounded-md'>
			<header className='relative flex items-center p-4 bg-gray-100'>
				<span className='absolute top-0 left-4 text-gray-500 text-[11px]'>
					Order # {_id}
				</span>
				<span
					className='absolute top-1 right-4 text-sm text-blue-400 
        cursor-pointer hover:underline'
					onClick={getInvoiceHandler}
				>
					Invoice
				</span>
				<div>
					<h2 className='text-gray-600 font-bold text-sm'>
						ORDER PLACED
					</h2>
					<h3 className='text-gray-500 text-sm'>
						{new Date(createdAt).toDateString()}
					</h3>
				</div>

				<div className='ml-10 flex-grow'>
					<h2 className='text-gray-600 font-bold text-sm'>TOTAL</h2>
					<h3 className='text-gray-500 text-sm'>
						<Currency quantity={totalAmount} currency='PKR' />
					</h3>
				</div>

				<h2 className='text-lg font-semibold text-blue-400'>
					{getQuantity()} items
				</h2>
			</header>

			<div
				className='grid grid-cols-2 md:flex md:space-x-4 p-5 
      gap-4 md:gap-0'
			>
				{products.map(({ product }) => (
					<img
						src={product.image}
						alt={product.title}
						className='h-36 object-cover'
					/>
				))}
			</div>
		</div>
	);
};

export default Order;
