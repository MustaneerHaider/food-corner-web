import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Success: FC = () => {
	const navigate = useNavigate();

	return (
		<div>
			<Header />

			<main className='bg-gray-100 h-screen'>
				<div className='bg-white p-10 rounded-b-md shadow max-w-5xl mx-auto'>
					<div className='flex items-center space-x-3'>
						<FaCheckCircle className='h-8 w-8 text-green-400 self-start' />
						<h2 className='text-2xl font-semibold mb-4'>
							Thank you, your order has been confirmed!
						</h2>
					</div>

					<p className='text-sm text-gray-700'>
						Thank you for ordering food from us, We'll send a
						confirmation once your order has delivered, If you would
						like to check the status of your order(s) please press
						the link below.
					</p>

					<Button
						role='link'
						w='full'
						mt={5}
						colorScheme='yellow'
						onClick={() => navigate('/orders')}
					>
						Go to my orders
					</Button>
				</div>
			</main>
		</div>
	);
};

export default Success;
