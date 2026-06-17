import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyCartMessageProps {
  title?: string;
  linkText?: string;
  linkTo?: string;
}

const EmptyCartMessage: React.FC<EmptyCartMessageProps> = ({
  title = 'Your cart is empty',
  linkText = '← Back to Shop',
  linkTo = '/shop',
}) => {
  return (
    <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-brown-dark mb-4">{title}</h1>
        <Link to={linkTo} className="text-salmon hover:opacity-80">
          {linkText}
        </Link>
      </div>
    </main>
  );
};

export default EmptyCartMessage;
