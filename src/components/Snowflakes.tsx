import React, { useEffect, useState } from 'react';

const Snowflakes: React.FC = () => {
  const [snowflakeCount, setSnowflakeCount] = useState(20); // Default low for safety

  useEffect(() => {
    const updateCount = () => {
      const isMobile = window.innerWidth < 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        setSnowflakeCount(0);
      } else {
        setSnowflakeCount(isMobile ? 25 : 60);
      }
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  if (snowflakeCount === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {Array.from({ length: snowflakeCount }).map((_, index) => {
        const style = {
          '--size': `${Math.random() * 4 + 2}px`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 15 + 10}s`,
          animationDelay: `${Math.random() * -20}s`,
          '--end-x': `${Math.random() * 100 - 50}px`,
          '--end-rotation': `${Math.random() * 360}deg`,
          opacity: Math.random() * 0.5 + 0.3,
        } as React.CSSProperties;

        return <div key={index} className="snowflake" style={style} />;
      })}
    </div>
  );
};

export default Snowflakes;
