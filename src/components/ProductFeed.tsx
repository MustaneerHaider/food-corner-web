import { FC } from 'react';
import { Product } from '../models/product';
import ProductItem from './Product';

interface Props {
	products: Product[];
}

const ProductFeed: FC<Props> = ({ products }) => {
	return (
		<section
			className='grid gris-cols-1 sm:grid-cols-2 lg:grid-cols-3 
      xl:grid-cols-4 md:-mt-52 '
		>
			{products.map(({ _id, title, image, price, description }) => (
				<ProductItem
					key={_id}
					_id={_id}
					title={title}
					image={image}
					price={price}
					description={description}
				/>
			))}
		</section>
	);
};

export default ProductFeed;
