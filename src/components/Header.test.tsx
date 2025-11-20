import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('renders the header with the brand name', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the brand name is in the document
    const brandElement = screen.getByText(/KT.TikoToys/i);
    expect(brandElement).toBeInTheDocument();

    // Check if navigation links are present. Use getAllByText because the links
    // are duplicated in the DOM for mobile and desktop views.
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Blog')[0]).toBeInTheDocument();
    expect(screen.getAllByText('About')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
  });
});
