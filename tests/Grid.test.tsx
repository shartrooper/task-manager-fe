import React from 'react';
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react';
import { Grid } from '../src/features/products';

const mockCards = [
  { product_id: 1, title: 'Product 1', image: 'image1.jpg' },
  { product_id: 2, title: 'Product 2', image: 'image2.jpg' },
];

const mockContents = [
  { type: 'type1', contents: 'content1', position: 'row-start-1' },
  { type: 'type2', contents: 'content2', position: 'row-start-3' },
];

describe('Grid Component', () => {
  it('renders cards and contents correctly', () => {
    render(<Grid cards={mockCards} contents={mockContents} />);

    expect(screen.getByText('Product 1')).toBeDefined();
    expect(screen.getByText('Product 2')).toBeDefined();

    expect(screen.getByText('content1')).toBeDefined();
    expect(screen.getByText('content2')).toBeDefined();
  });
});
