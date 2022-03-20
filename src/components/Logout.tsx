import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

const Logout: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logout());
	}, [dispatch]);

	return <Navigate to='/' replace />;
};

export default Logout;
