import { ChangeEvent, FC, useState } from 'react';
import { Formik, Form } from 'formik';
import InputField from '../../components/InputField';
import { Button, Box, Input, FormLabel } from '@chakra-ui/react';
import Header from '../../components/Header';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
	title: yup.string().min(3).required(),
	price: yup.string().required(),
	description: yup.string().min(8).required()
});

const AddProduct: FC = () => {
	const [image, setImage] = useState<string>('');
	const idToken = useSelector(selectAuthToken);
	const navigate = useNavigate();

	const handleSubmit = async ({
		title,
		price,
		description
	}: {
		title: string;
		price: string;
		description: string;
	}) => {
		if (!image) return;
		const newProduct = {
			title,
			image,
			price: parseFloat(price),
			description
		};
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BASE_URL}/products/create`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${idToken}`
					},
					body: JSON.stringify(newProduct)
				}
			);
			await response.json();
			if (!response.ok) {
				throw new Error('An error occured.');
			}
			navigate('/', { replace: true });
		} catch (err) {
			alert((err as Error).message);
		}
	};

	const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		const fd = new FormData();
		fd.append('file', file);
		fd.append('upload_preset', 'food-corner');

		const data = await fetch(
			'https://api.cloudinary.com/v1_1/diezkb6ih/image/upload',
			{
				method: 'POST',
				body: fd
			}
		).then(res => res.json());
		setImage(data.secure_url);
	};

	return (
		<>
			<Header />
			<div className='max-w-lg mx-5 lg:mx-auto mt-10'>
				<Formik
					validationSchema={validationSchema}
					initialValues={{ title: '', price: '', description: '' }}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								required
								name='title'
								type='text'
								label='Title'
							/>
							<Box my={4}>
								<FormLabel>Image</FormLabel>
								<Input
									type='file'
									onChange={handleImageUpload}
								/>
							</Box>
							<InputField
								required
								name='price'
								step='0.01'
								type='number'
								label='Price'
							/>
							<InputField
								required
								textarea
								name='description'
								label='Description'
							/>
							<Button
								isLoading={isSubmitting}
								type='submit'
								colorScheme='green'
							>
								Add Product
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default AddProduct;
