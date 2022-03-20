import { Button, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { Product as Props } from '../models/product';
import Currency from 'react-currency-formatter';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	decrementProductQuantity,
	deleteFromCart,
	incrementProductQuantity
} from '../store/slices/cartSlice';
import { selectAuthToken } from '../store/slices/authSlice';

const CheckoutProduct: FC<Props> = ({
	_id,
	title,
	image,
	price,
	description,
	quantity
}) => {
	const dispatch = useDispatch();
	const idToken = useSelector(selectAuthToken);

	function removeItemFromCart() {
		dispatch(deleteFromCart(_id!, idToken!));
	}

	function incrementItemQty() {
		dispatch(incrementProductQuantity(_id!, idToken!));
	}

	function decrementItemQty() {
		dispatch(decrementProductQuantity(_id!, idToken!));
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-4 pb-4 border-b'>
			<img src={image} alt={title} />

			<div className='col-span-2 my-4 sm:mx-10'>
				<h2 className='mb-2 text-sm md:text-base font-semibold'>
					{title}
				</h2>
				<h3 className='text-sm md:text-base'>
					<Currency quantity={price} currency='PKR' />
				</h3>
				<p className='mt-2 text-xs text-gray-600 line-clamp-3'>
					{description}
				</p>
			</div>

			<div className='sm:justify-self-end space-y-3'>
				<div className='flex items-center justify-between p-1 border-2 border-red-400 rounded-lg'>
					<IconButton
						aria-label='Increment quantity'
						colorScheme='green'
						onClick={incrementItemQty}
						icon={<FaChevronUp />}
					/>
					<h3 className='text-lg font-semibold'>{quantity}</h3>
					<IconButton
						aria-label='Decrement quantity'
						colorScheme='red'
						onClick={decrementItemQty}
						icon={<FaChevronDown />}
					/>
				</div>
				<Button w='full' colorScheme='red' onClick={removeItemFromCart}>
					Remove from Cart
				</Button>
			</div>
		</div>
	);
};

export default CheckoutProduct;
