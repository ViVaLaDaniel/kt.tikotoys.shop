import type { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 60, damping: 15 },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 50, damping: 20, delay: 0.1 },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const gridStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const gridItem: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
};

export const pageHeaderAnimation = {
  title: {
    initial: { opacity: 0, y: -10 } as const,
    animate: { opacity: 1, y: 0 } as const,
  },
  subtitle: {
    initial: { opacity: 0 } as const,
    animate: { opacity: 1 } as const,
    transition: { delay: 0.15 },
  },
};
