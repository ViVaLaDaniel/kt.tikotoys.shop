import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// We need to declare dataLayer for TypeScript
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: location.pathname + location.search,
          url: window.location.href,
        },
      });
    }
  }, [location]);

  return null; // This component does not render anything
};

export default Analytics;
