import React from 'react';
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react';
import { GridCard } from '../src/features/products';

const mockProduct = {
	product_id: 1,
	title: 'Mock Product',
	image: 'mock-image.jpg',
};

describe('GridCard Component', () => {
	it('renders product information correctly', () => {
		render(<GridCard fields={mockProduct} />);

		expect(screen.getByText(`ID: ${mockProduct.product_id}`)).toBeDefined();
		expect(screen.getByText(mockProduct.title)).toBeDefined();
		expect(screen.getByAltText('Product')).toHaveProperty('src', mockProduct.image);
	});
});