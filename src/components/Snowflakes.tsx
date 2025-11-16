import React from 'react';

const Snowflakes: React.FC = () => {
  const snowflakeCount = 75;
  const snowflakes = Array.from({ length: snowflakeCount }).map((_, index) => {
    const style = {
      '--size': `${Math.random() * 5 + 2}px`,
      left: `${Math.random() * 100}%`,
      '--duration': `${Math.random() * 10 + 10}s`,
      '--delay': `${Math.random() * -10}s`,
      '--end-x': `${Math.random() * 200 - 100}px`,
      '--end-rotation': `${Math.random() * 360}deg`,
    } as React.CSSProperties;

    return <div key={index} className="snowflake" style={style} />;
  });

  return <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">{snowflakes}</div>;
};

export default Snowflakes;
