import { FC, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './components/Logout';
import { selectAuthStatus, selectIsAdmin } from './store/slices/authSlice';
import { autoLogin } from './store/slices/authSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NotFound from './pages/NotFound';
import Success from './pages/Success';
import { Spinner } from '@chakra-ui/react';

// load stripe outside of component tree
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

// lazy loaded components
const ProductDetail = lazy(() => import('./pages/SingleProduct'));
const Home = lazy(() => import('./pages/Home'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Orders = lazy(() => import('./pages/Orders'));
const AddProduct = lazy(() => import('./pages/admin/AddProduct'));

const App: FC = () => {
	const isAuth = useSelector(selectAuthStatus);
	const isAdmin = useSelector(selectIsAdmin);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(autoLogin());
	}, [dispatch]);

	let routes = (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/signup' element={<Signup />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	);

	if (isAuth) {
		routes = (
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/logout' element={<Logout />} />
				<Route path='/products/:id' element={<ProductDetail />} />
				<Route
					path='/checkout'
					element={
						<Elements stripe={stripePromise}>
							<Checkout />
						</Elements>
					}
				/>
				{isAdmin && (
					<Route
						path='/admin/create-product'
						element={<AddProduct />}
					/>
				)}
				<Route path='/success' element={<Success />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		);
	}

	return (
		<Suspense
			fallback={
				<div className='max-w-[100px] mx-auto mt-10'>
					<Spinner />
				</div>
			}
		>
			{routes}
		</Suspense>
	);
};

export default App;
