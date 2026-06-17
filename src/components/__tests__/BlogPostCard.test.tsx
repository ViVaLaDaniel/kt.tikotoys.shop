import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostCard from '../BlogPostCard';
import { Post } from '../../data/posts';

const mockPost: Post = {
  id: 1,
  title: 'Test Blog Post',
  date: 'June 17, 2026',
  excerpt: 'This is the excerpt of the test blog post.',
  content: 'Full content goes here, much longer than the excerpt.',
};

describe('BlogPostCard', () => {
  it('renders the title', () => {
    render(<BlogPostCard post={mockPost} />);
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  it('renders the date', () => {
    render(<BlogPostCard post={mockPost} />);
    expect(screen.getByText('June 17, 2026')).toBeInTheDocument();
  });

  it('renders the excerpt', () => {
    render(<BlogPostCard post={mockPost} />);
    expect(
      screen.getByText('This is the excerpt of the test blog post.'),
    ).toBeInTheDocument();
  });

  it('does not render the full content', () => {
    render(<BlogPostCard post={mockPost} />);
    expect(
      screen.queryByText(
        'Full content goes here, much longer than the excerpt.',
      ),
    ).not.toBeInTheDocument();
  });

  it('renders with the correct styling', () => {
    const { container } = render(<BlogPostCard post={mockPost} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-md');
  });
});
