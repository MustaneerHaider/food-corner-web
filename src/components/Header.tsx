import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link as NavLink } from 'react-router-dom';
import { selectAuthStatus, selectIsAdmin } from '../store/slices/authSlice';
import { FaShoppingCart } from 'react-icons/fa';
import Link from './Link';
import { selectCartItems, selectIsLoading } from '../store/slices/cartSlice';
import {
	Box,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList
} from '@chakra-ui/react';
import { FaBars as MenuIcon } from 'react-icons/fa';

const Header: FC = () => {
	const navigate = useNavigate();
	const isAuth = useSelector(selectAuthStatus);
	const isAdmin = useSelector(selectIsAdmin);
	const items = useSelector(selectCartItems);
	const isLoading = useSelector(selectIsLoading);

	return (
		<header className='sticky top-0 z-50 shadow p-4 bg-brown'>
			<div className='flex items-center justify-between max-w-6xl mx-5 lg:mx-auto'>
				{/* Left */}
				<div>
					<h2
						className='text-2xl md:text-3xl font-bold text-orange-300 cursor-pointer'
						onClick={() => navigate('/')}
					>
						FoodCorner
					</h2>
				</div>

				{/* Right - desktop nav */}
				<nav className='hidden lg:inline-flex'>
					<ul className='flex items-center md:space-x-4'>
						{isAuth && isAdmin ? (
							<Link href='/admin/create-product'>
								Add Product
							</Link>
						) : null}
						{isAuth && (
							<div
								className='relative cursor-pointer'
								onClick={() => navigate('/checkout')}
							>
								<span
									className='absolute top-0 right-6 z-20 h-4 w-4 flex
                justify-center bg-yellow-400 text-xs font-bold rounded-full'
								>
									{isLoading
										? ''
										: items.reduce(
												(len, { quantity }) =>
													len + quantity!,
												0
										  )}
								</span>
								<p className='flex items-center space-x-1'>
									<FaShoppingCart className='icon text-white' />{' '}
									<span
										className='text-white font-semibold self-end
                  hover:underline'
									>
										Cart
									</span>
								</p>
							</div>
						)}
						{isAuth && <Link href='/orders'>Orders</Link>}
						{isAuth && <Link href='/logout'>Logout</Link>}
						{!isAuth && (
							<Link href={`${isAuth ? '/login' : '/'}`}>
								Login
							</Link>
						)}
						{!isAuth && <Link href='/signup'>Sign Up</Link>}
					</ul>
				</nav>

				{/* Right - mobile nav */}
				<Box as='nav' className='lg:hidden'>
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label='Options'
							icon={
								<MenuIcon className='h-6 w-6 text-yellow-500' />
							}
							variant='outline'
							border='none'
							_hover={{ bg: 'transparent' }}
							_expanded={{ bg: 'transparent' }}
							_focus={{ outline: 'none' }}
							_active={{ bg: 'transparent' }}
						/>
						<MenuList>
							{isAuth && (
								<Fragment>
									<MenuItem
										as={NavLink}
										to='/checkout'
										className='font-semibold'
									>
										Cart
										<span className='font-bold ml-2'>
											({items.length})
										</span>
									</MenuItem>
									<MenuItem
										as={NavLink}
										to='/orders'
										className='font-semibold'
									>
										Orders
									</MenuItem>
									<MenuItem
										as={NavLink}
										to='/logout'
										className='font-semibold'
									>
										Logout
									</MenuItem>
								</Fragment>
							)}

							{!isAuth && (
								<Fragment>
									<MenuItem
										as={NavLink}
										to='/'
										className='font-semibold'
									>
										Login
									</MenuItem>
									<MenuItem
										as={NavLink}
										to='/signup'
										className='font-semibold'
									>
										Signup
									</MenuItem>
								</Fragment>
							)}
						</MenuList>
					</Menu>
				</Box>
			</div>
		</header>
	);
};

export default Header;
