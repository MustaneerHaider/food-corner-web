import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';
import { selectAuthToken } from '../store/slices/authSlice';
import Spinner from '../components/Spinner';
import { getCart } from '../store/slices/cartSlice';
import {
	fetchProducts,
	selectIsLoading,
	selectProducts
} from '../store/slices/productsSlice';

const Home: FC = () => {
	const products = useSelector(selectProducts);
	const isLoading = useSelector(selectIsLoading);
	const idToken = useSelector(selectAuthToken);
	const dispatch = useDispatch();

	useEffect(() => {
		if (products.length === 0) {
			dispatch(fetchProducts(idToken!));
		}
		dispatch(getCart(idToken!));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idToken, dispatch]);

	return (
		<div className='bg-gray-100 '>
			<Header />

			<main className='max-w-7xl mx-auto'>
				<Banner />
				{isLoading ? <Spinner /> : <ProductFeed products={products} />}
			</main>

			<Footer />
		</div>
	);
};

export default Home;
