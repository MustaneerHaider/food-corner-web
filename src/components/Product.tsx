import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { Product as ProductProps } from '../models/product';
import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import { postCart } from '../store/slices/cartSlice';
import { selectAuthToken } from '../store/slices/authSlice';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Product: FC<ProductProps> = ({
	_id,
	title,
	price,
	image,
	description
}) => {
	const dispatch = useDispatch();
	const idToken = useSelector(selectAuthToken);
	const navigate = useNavigate();

	const addItemToCart = () => {
		dispatch(
			postCart(
				{ _id, title, image, price, description, quantity: 1 },
				idToken!
			)
		);
	};

	return (
		<div className='bg-white flex flex-col p-8 m-5 z-30 rounded-md'>
			<div className='relative group'>
				<div
					className='hidden absolute top-0 left-0 h-full w-full z-30 bg-black 
        bg-opacity-75 transition-opacity group-hover:flex items-center 
        justify-center group-hover:cursor-pointer'
				>
					<Button
						colorScheme='yellow'
						rightIcon={<FiEye />}
						onClick={() => navigate(`/products/${_id}`)}
					>
						Quick view
					</Button>
				</div>
				<img src={image} className='w-full object-cover' alt={title} />
			</div>

			<h2 className='text-lg my-2'>{title}</h2>

			<div className='font-semibold'>
				<Currency quantity={price} currency='PKR' />
			</div>

			<p className='text-xs md:text-md text-gray-700 line-clamp-2 mt-2 mb-4'>
				{description}
			</p>

			<Button mt='auto' colorScheme='yellow' onClick={addItemToCart}>
				Add to Cart
			</Button>
		</div>
	);
};

export default Product;
