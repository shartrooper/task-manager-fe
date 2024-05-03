import React from 'react';
import { ModalPortal } from '@/components';
import { Product } from '@/features/products';

interface ProductModalProps {
	product?: Product;
	onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {

	if (!product) {
		return null;
	}

	return (
		<ModalPortal>
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
				<div className="bg-white p-8 max-w-md">
					<div className='flex justify-end mb-2'>
						<button onClick={onClose}>
							Close
						</button>
					</div>
					<img src={product.image} alt="Large Product" className=" h-80 md:h-[32rem] w-96 md:w-[40rem] object-cover rounded-t-xl" />
					<div className="px-4 py-3 w-72">
						<span className="text-gray-400 mr-3 uppercase text-xs">ID: {product.product_id}</span>
						<p className="text-lg font-bold text-black">{product.title}</p>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};