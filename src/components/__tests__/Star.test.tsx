import React from 'react';
import { render } from '@testing-library/react';
import Star from '../Star';

describe('Star', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Star />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies the provided className', () => {
    const { container } = render(<Star className="text-amber-400" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-amber-400');
  });

  it('renders without className', () => {
    const { container } = render(<Star />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute('class')).toContain('w-5');
  });
});
