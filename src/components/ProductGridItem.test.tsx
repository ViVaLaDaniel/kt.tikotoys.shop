import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ProductGridItem from './ProductGridItem';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '../types';
import { jest } from '@jest/globals';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: 10,
  currency: 'USD',
  rating: 4.5,
  reviewCount: 10,
  imageUrl: ['/test.jpg'],
  description: 'Test Description',
  category: 'toys',
};

describe('ProductGridItem', () => {
  it('renders product details correctly', () => {
    const addToCart = jest.fn();
    render(
      <BrowserRouter>
        <ProductGridItem product={mockProduct} addToCart={addToCart} />
      </BrowserRouter>
    );

    // Using simple text content matching which is robust
    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('10')).toBeTruthy();
    expect(screen.getByText('USD')).toBeTruthy();
  });

  it('calls addToCart when the button is clicked', () => {
    const addToCart = jest.fn();
    render(
      <BrowserRouter>
        <ProductGridItem product={mockProduct} addToCart={addToCart} />
      </BrowserRouter>
    );

    const button = screen.getByLabelText('Add Test Product to cart');
    fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
