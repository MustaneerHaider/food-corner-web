import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { Product } from '../models/product';
import { selectAuthToken } from '../store/slices/authSlice';
import Currency from 'react-currency-formatter';
import { Button } from '@chakra-ui/react';
import { postCart } from '../store/slices/cartSlice';
import { Form, Formik, FormikHelpers } from 'formik';
import InputField from '../components/InputField';
import * as yup from 'yup';

const SingleProduct: FC = () => {
	const { id: prodId } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);
	const idToken = useSelector(selectAuthToken);
	const dispatch = useDispatch();

	const addReviewToProduct = async (
		values: {
			review: string;
			name: string;
		},
		{ resetForm }: FormikHelpers<{ name: string; review: string }>
	) => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/products/review/${prodId}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${idToken}`
					},
					body: JSON.stringify({
						review: values.review,
						name: values.name
					})
				}
			);
			await res.json();
			// push review into reviews list
			setProduct(prevProd => {
				const updatedProd = { ...prevProd! };
				const updatedReviews = [...prevProd!.reviews!];
				updatedReviews.push({
					_id: Math.random().toString(),
					reviewId: { userName: values.name, review: values.review }
				});
				updatedProd.reviews = updatedReviews;
				return updatedProd;
			});
			// reset form
			resetForm({ values: { name: '', review: '' } });
			if (!res.ok) {
				throw new Error("Can't post your review");
			}
		} catch (err) {
			resetForm({ values: { name: '', review: '' } });
			alert((err as Error).message);
		}
	};

	useEffect(() => {
		async function getProduct() {
			setLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_BASE_URL}/products/${prodId}`,
				{
					headers: {
						Authorization: `Bearer ${idToken}`
					}
				}
			);
			const data = await response.json();
			setLoading(false);

			if (!response.ok) {
				alert('An error occured.');
			}

			setProduct(data.prod);
		}
		getProduct();
	}, [prodId, idToken]);

	function addItemToCart() {
		const prod: Product = {
			_id: product?._id!,
			title: product?.title!,
			image: product?.image!,
			price: product?.price!,
			description: product?.description!,
			quantity: 1
		};
		dispatch(postCart(prod, idToken!));
	}

	return (
		<div className='pb-20'>
			<Header />

			{!isLoading && product ? (
				<main className='max-w-5xl lg:mx-auto mx-5 mt-10'>
					<section
						className='flex flex-col md:flex-row space-y-6 md:space-x-6 
          md:space-y-0 pb-6'
					>
						<img
							src={product?.image}
							alt={product?.title}
							className='flex-grow object-contain sm:object-fill h-80'
						/>

						<div className='flex-grow flex flex-col'>
							<h1 className='text-3xl font-bold mb-4 pb-2 border-b border-yellow-500'>
								{product?.title}
							</h1>
							<p className='text-sm text-gray-600 mb-3'>
								{product?.description}
							</p>
							<h3 className='text-lg font-semibold'>
								<Currency
									quantity={product?.price!}
									currency='PKR'
								/>
							</h3>

							<Button
								colorScheme='yellow'
								mt='auto'
								onClick={addItemToCart}
							>
								Add to Cart
							</Button>
						</div>
					</section>

					<hr className='border-t border-yellow-500' />
					{/* add review  */}
					<section className='max-w-lg'>
						<h3 className='text-lg text-yellow-500 font-semibold my-3'>
							Enjoyed this food?
						</h3>
						<h1 className='text-3xl font-bold mb-5'>
							Leave a review below!
						</h1>

						{/* review form */}
						<Formik
							initialValues={{ name: '', review: '' }}
							onSubmit={addReviewToProduct}
							validationSchema={yup.object({
								name: yup.string().required(),
								review: yup.string().required().min(5)
							})}
						>
							{({ isSubmitting }) => (
								<Form>
									<InputField
										name='name'
										label='Your Name'
										required
									/>
									<InputField
										name='review'
										label='Your Review'
										textarea
										required
									/>
									<Button
										isLoading={isSubmitting}
										type='submit'
										mt={2}
										w='full'
										colorScheme='yellow'
									>
										Submit
									</Button>
								</Form>
							)}
						</Formik>

						{/* reviews */}
						<div
							className='p-8 rounded-sm shadow shadow-yellow-400 mt-10
            space-y-2'
						>
							<h2 className='text-3xl font-semibold pb-1 border-b border-yellow-400'>
								Reviews
							</h2>

							{product.reviews?.map(r => (
								<p
									key={r._id.toString()}
									className='space-x-3 flex items-center'
								>
									<span className='text-yellow-400 font-semibold'>
										{r.reviewId.userName}
									</span>
									<span className='text-sm text-gray-700 line-clamp-2 flex-grow'>
										{r.reviewId.review}
									</span>
								</p>
							))}
						</div>
					</section>
				</main>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default SingleProduct;
