import React, { useRef, useState, MouseEvent, useEffect } from 'react';

interface ParallaxCardProps {
  children: React.ReactNode;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({ children }) => {
  // Reference to the card element
  const cardRef = useRef<HTMLDivElement>(null);
  // State for the card's transform style
  const [style, setStyle] = useState({});
  // State to check if permission is needed for device orientation
  const [permissionNeeded, setPermissionNeeded] = useState(false);
  // Check if the device is mobile
  const isMobile = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;

  useEffect(() => {
    // Function to add the device orientation event listener
    const addOrientationListener = () => {
       window.addEventListener('deviceorientation', handleOrientation);
    };

    // Check if the device is mobile and supports the DeviceOrientationEvent
    if (isMobile && window.DeviceOrientationEvent) {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // iOS 13+ requires explicit permission to access device orientation data
        setPermissionNeeded(true);
      } else {
        // For Android and older iOS devices, add the listener directly
        addOrientationListener();
      }
    }

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile]);

  // Function to request permission for device orientation on iOS 13+
  const requestDeviceOrientationPermission = async () => {
    try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
            // If permission is granted, add the event listener
            setPermissionNeeded(false);
            window.addEventListener('deviceorientation', handleOrientation);
        } else {
            // If permission is denied, inform the user
            alert('Разрешение на отслеживание ориентации устройства не предоставлено.');
            setPermissionNeeded(false);
        }
    } catch(error) {
        // Handle errors if the feature is not supported
        console.error("Error requesting device orientation permission:", error);
        alert('Ваше устройство или браузер не поддерживают эту функцию.');
        setPermissionNeeded(false);
    }
  };

  // Handles the device orientation event
  const handleOrientation = (event: DeviceOrientationEvent) => {
    const { beta, gamma } = event; // beta: X-axis (front/back tilt), gamma: Y-axis (left/right tilt)

    if (beta === null || gamma === null) return;
    
    // Clamp the tilt values to a specific range for a smoother, less extreme effect
    const clampedBeta = Math.max(-45, Math.min(45, beta));
    const clampedGamma = Math.max(-45, Math.min(45, gamma));

    // Map the device tilt to card rotation values. Adjust the divisor to change sensitivity.
    const rotateX = clampedBeta / 2.5; 
    const rotateY = clampedGamma / 2.5;

    // Apply the transform style to the card
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s linear',
    });
  };

  // Handles the mouse move event for desktop devices
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // Do nothing if on a mobile device or if the card reference is not available
    if (isMobile || !cardRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    // Calculate the mouse position relative to the card
    const x = clientX - left;
    const y = clientY - top;

    // Calculate the rotation values based on the mouse position
    const rotateX = -((y / height) * 2 - 1) * 10;
    const rotateY = ((x / width) * 2 - 1) * 10;

    // Apply the transform style to the card
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  // Resets the card's transform when the mouse leaves the card
  const handleMouseLeave = () => {
    // Do nothing if on a mobile device
    if (isMobile) return;
    // Reset the transform to its initial state
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
      {/* Show a permission request button if needed for iOS 13+ */}
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
