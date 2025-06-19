import React from "react";

const useDeviceOrientation = () => {
  const [orientation, setOrientation] = React.useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event; // `beta`: front-back tilt, `gamma`: left-right tilt
      const sensitivity = 2; // Adjust sensitivity as needed

      if (beta !== null && gamma !== null) {
        setOrientation({
          x: gamma * sensitivity,
          y: beta * sensitivity,
        });
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return orientation;
};

export default useDeviceOrientation;
