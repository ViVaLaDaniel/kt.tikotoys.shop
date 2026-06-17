import React from 'react';
import { render } from '@testing-library/react';
import StarRating from '../StarRating';

describe('StarRating', () => {
  it('renders the correct number of stars for a whole rating', () => {
    const { container } = render(<StarRating rating={4} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5); // 4 full + 1 empty
  });

  it('renders the correct number of stars for a fractional rating', () => {
    const { container } = render(<StarRating rating={3.5} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5); // 3 full + 1 half + 1 empty
  });

  it('renders all full stars for max rating', () => {
    const { container } = render(<StarRating rating={5} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('renders all empty stars for zero rating', () => {
    const { container } = render(<StarRating rating={0} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('respects custom maxStars', () => {
    const { container } = render(<StarRating rating={3} maxStars={10} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(10);
  });

  it('renders the flex container', () => {
    const { container } = render(<StarRating rating={4} />);
    const div = container.firstChild;
    expect(div).toHaveClass('flex', 'items-center');
  });
});
