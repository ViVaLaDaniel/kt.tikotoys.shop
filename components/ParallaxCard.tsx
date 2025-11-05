import React, { useRef, useState, MouseEvent, useEffect } from 'react';

interface ParallaxCardProps {
  children: React.ReactNode;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const [permissionNeeded, setPermissionNeeded] = useState(false);
  const isMobile = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;

  useEffect(() => {
    const addOrientationListener = () => {
       window.addEventListener('deviceorientation', handleOrientation);
    };

    if (isMobile && window.DeviceOrientationEvent) {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // iOS 13+ requires explicit permission
        setPermissionNeeded(true);
      } else {
        // Android and older iOS devices
        addOrientationListener();
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile]);

  const requestDeviceOrientationPermission = async () => {
    try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
            setPermissionNeeded(false);
            window.addEventListener('deviceorientation', handleOrientation);
        } else {
            alert('Разрешение на отслеживание ориентации устройства не предоставлено.');
            setPermissionNeeded(false);
        }
    } catch(error) {
        console.error("Error requesting device orientation permission:", error);
        alert('Ваше устройство или браузер не поддерживают эту функцию.');
        setPermissionNeeded(false);
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    const { beta, gamma } = event; // beta: X-axis (front/back), gamma: Y-axis (left/right)

    if (beta === null || gamma === null) return;
    
    // Clamp values for a smoother, less extreme effect
    const clampedBeta = Math.max(-45, Math.min(45, beta));
    const clampedGamma = Math.max(-45, Math.min(45, gamma));

    // Map device tilt to card rotation. Adjust sensitivity by changing the divisor.
    const rotateX = clampedBeta / 2.5; 
    const rotateY = clampedGamma / 2.5;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s linear',
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const rotateX = -((y / height) * 2 - 1) * 10;
    const rotateY = ((x / width) * 2 - 1) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="relative transform-style-preserve-3d transition-transform duration-500 ease-in-out shadow-2xl rounded-2xl"
    >
      {permissionNeeded && (
         <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-white text-lg font-medium mb-4">Нажмите, чтобы включить 3D-эффект на телефоне</p>
            <button
              onClick={requestDeviceOrientationPermission}
              className="bg-pink-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300"
            >
              Активировать
            </button>
         </div>
      )}
      {children}
    </div>
  );
};

export default ParallaxCard;
