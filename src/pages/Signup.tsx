import { FC } from 'react';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import { Button, useToast } from '@chakra-ui/react';
import Header from '../components/Header';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(6).required()
});

async function createUser(email: string, password: string) {
	const response = await fetch(
		`${process.env.REACT_APP_BASE_URL!}/auth/signup`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		}
	);
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'An error occured.');
	}

	return data;
}

const Signup: FC = () => {
	const toast = useToast();
	const navigate = useNavigate();

	const handleSubmit = async ({
		email,
		password
	}: {
		email: string;
		password: string;
	}) => {
		try {
			await createUser(email, password);
			// show success toast for account creation.
			toast({
				title: 'Account created.',
				status: 'success',
				duration: 2000,
				isClosable: true
			});
			navigate('/', { replace: true });
		} catch (err) {
			// show error toast for sign up errors.
			toast({
				title: (err as Error).message,
				status: 'error',
				duration: 2000,
				isClosable: true
			});
		}
	};

	return (
		<>
			<Header />
			<div className='max-w-lg mx-5 lg:mx-auto mt-10'>
				<Formik
					validationSchema={validationSchema}
					initialValues={{ email: '', password: '' }}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								required
								name='email'
								type='email'
								label='Email Address'
							/>
							<InputField
								required
								name='password'
								type='password'
								label='Password'
							/>
							<Button
								isLoading={isSubmitting}
								type='submit'
								colorScheme='yellow'
							>
								Sign Up
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default Signup;
