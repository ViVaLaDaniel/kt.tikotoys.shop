import React from 'react';
import { motion } from 'framer-motion';
import { pageHeaderAnimation } from '../utils/animations';

interface PageHeaderProps {
  title: string;
  highlight: string;
  subtitle: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  highlight,
  subtitle,
  className = '',
}) => {
  return (
    <header className={`text-center mb-16 ${className}`}>
      <motion.h1
        initial={pageHeaderAnimation.title.initial}
        animate={pageHeaderAnimation.title.animate}
        className="text-4xl md:text-6xl font-serif font-bold text-brown-dark mb-4 tracking-tight"
      >
        {title} <span className="text-salmon italic">{highlight}</span>
      </motion.h1>
      <motion.p
        initial={pageHeaderAnimation.subtitle.initial}
        animate={pageHeaderAnimation.subtitle.animate}
        transition={pageHeaderAnimation.subtitle.transition}
        className="text-lg text-brown-light"
      >
        {subtitle}
      </motion.p>
    </header>
  );
};

export default PageHeader;
