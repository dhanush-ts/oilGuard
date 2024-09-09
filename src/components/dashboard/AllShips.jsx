import React, { useState } from 'react';

export const VesselMap = () => {
  const [mapType, setMapType] = useState('area'); // Default to Area Map

  const renderMap = () => {
    switch (mapType) {
      case 'area':
        return (
          <iframe
            title="area-map"
            src="https://www.vesselfinder.com/aismap?width=100%25&height=300&latitude=36.00&longitude=-5.40&zoom=8"
            width="200%" // Double the width
            height="600" // Double the height
            style={{
              borderRadius: '15px',
              border: 'none',
              position: 'absolute',
              left: '0',
              top: '-20px', // Shift up by 20px to hide top part
              width: '100%',
              height: 'calc(100% + 20px)', // Adjust height to ensure the whole iframe is displayed
            }}
            allowFullScreen={true}
          ></iframe>
        );
      case 'single-ship':
        return (
          <iframe
            title="single-ship-map"
            src="https://www.vesselfinder.com/aismap?width=100%25&height=300&imo=9506291&show_track=true"
            width="200%"
            height="600"
            style={{
              borderRadius: '15px',
              border: 'none',
              position: 'absolute',
              left: '0',
              top: '-20px',
              width: '100%',
              height: 'calc(100% + 20px)',
            }}
            allowFullScreen={true}
          ></iframe>
        );
      case 'fleet':
        return (
          <iframe
            title="fleet-map"
            src="https://www.vesselfinder.com/aismap?width=100%25&height=300&latitude=36.00&longitude=-5.40&names=true&fleet=e48ab3d80a0e2a9bf28930f2dd08800c&fleet_name=Carnival&fleet_timespan=1440"
            width="200%"
            height="600"
            style={{
              borderRadius: '15px',
              border: 'none',
              position: 'absolute',
              left: '0',
              top: '-20px',
              width: '100%',
              height: 'calc(100% + 20px)',
            }}
            allowFullScreen={true}
          ></iframe>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="rounded-lg shadow-lg"
      style={{
        width: '100%',
        height: '100vh',
        marginTop: '20px',
        borderRadius: '15px', // Rounded corners for container
        overflow: 'hidden', // Hide overflow to create rounded effect
        position: 'relative', // Ensure positioning context
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {renderMap()}
    </div>
  );
};
