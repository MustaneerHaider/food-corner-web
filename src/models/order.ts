import { Product } from './product';

export interface Order {
	_id?: string;
	products: { product: Product; quantity: number }[];
	userId?: string;
	createdAt: string;
	totalAmount: number;
}
