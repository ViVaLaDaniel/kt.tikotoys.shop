import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewCard from '../ReviewCard';
import { Review } from '../../types';

const mockReview: Review = {
  id: 1,
  author: 'Alice B.',
  location: 'Madrid, Spain',
  rating: 5,
  text: 'Absolutely love this handmade toy!',
};

describe('ReviewCard', () => {
  it('renders the author name', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('Alice B.')).toBeInTheDocument();
  });

  it('renders the location', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('Madrid, Spain')).toBeInTheDocument();
  });

  it('renders the review text', () => {
    render(<ReviewCard review={mockReview} />);
    expect(
      screen.getByText('Absolutely love this handmade toy!'),
    ).toBeInTheDocument();
  });

  it('renders the author initial avatar', () => {
    const { container } = render(<ReviewCard review={mockReview} />);
    const avatar = container.querySelector('.w-12.h-12');
    expect(avatar).toBeInTheDocument();
    expect(avatar?.textContent).toBe('A');
  });

  it('renders stars for the rating', () => {
    const { container } = render(<ReviewCard review={mockReview} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBeGreaterThan(0);
  });
});
