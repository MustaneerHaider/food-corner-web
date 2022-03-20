import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Logout from './components/Logout';
import AddProduct from './pages/admin/AddProduct';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { selectAuthStatus, selectIsAdmin } from './store/slices/authSlice';
import { autoLogin } from './store/slices/authSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NotFound from './pages/NotFound';
import Success from './pages/Success';
import Orders from './pages/Orders';
import SingleProduct from './pages/SingleProduct';

// load stripe outside of component tree
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

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
				<Route path='/products/:id' element={<SingleProduct />} />
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

	return routes;
};

export default App;
