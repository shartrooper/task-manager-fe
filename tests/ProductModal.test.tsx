import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductModal } from '../src/features/modal';
import { describe, it, expect, vi } from 'vitest'


const mockProduct = {
	product_id: 1,
	title: 'Test Product',
	image: 'test-image.jpg',
};

describe('ProductModal', () => {
	it('renders modal with product details', () => {
		render(<ProductModal product={mockProduct} onClose={() => { }} />);

		expect(screen.getByAltText('Large Product')).toBeDefined();
		expect(screen.getByText(`ID: ${mockProduct.product_id}`)).toBeDefined();
		expect(screen.getByText(mockProduct.title)).toBeDefined();
	});

	it('does not render modal when no product is provided', () => {
		render(<ProductModal onClose={() => { }} />);

		expect(screen.queryByAltText('Large Product')).toBeNull();
		expect(screen.queryByText(`ID: ${mockProduct.product_id}`)).toBeNull();
		expect(screen.queryByText(mockProduct.title)).toBeNull();
	});

	it('calls onClose when close button is clicked', () => {
		const onCloseMock = vi.fn();
		render(<ProductModal product={mockProduct} onClose={onCloseMock} />);

		fireEvent.click(screen.getByText('Close'));

		expect(onCloseMock).toHaveBeenCalled();
	});
});
