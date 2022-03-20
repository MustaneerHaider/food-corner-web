export interface Product {
	_id?: string;
	title: string;
	image: string;
	price: number;
	description: string;
	quantity?: number;
	reviews?: {
		_id: string;
		reviewId: {
			review: string;
			userName: string;
		};
	}[];
}
