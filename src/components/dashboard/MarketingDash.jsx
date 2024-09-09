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
            width="100%"
            height="300"
            allowFullScreen={true}
          ></iframe>
        );
      case 'single-ship':
        return (
          <iframe
            title="single-ship-map"
            src="https://www.vesselfinder.com/aismap?width=100%25&height=300&imo=9506291&show_track=true"
            width="100%"
            height="300"
            allowFullScreen={true}
          ></iframe>
        );
      case 'fleet':
        return (
          <iframe
            title="fleet-map"
            src="https://www.vesselfinder.com/aismap?width=100%25&height=300&latitude=36.00&longitude=-5.40&names=true&fleet=e48ab3d80a0e2a9bf28930f2dd08800c&fleet_name=Carnival&fleet_timespan=1440"
            width="100%"
            height="300"
            allowFullScreen={true}
          ></iframe>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h3>Select Map Type:</h3>
      <button onClick={() => setMapType('area')}>Area Map</button>
      <button onClick={() => setMapType('single-ship')}>Single Ship Map</button>
      <button onClick={() => setMapType('fleet')}>Fleet Map</button>
      
      <div className='rounded-lg' style={{ width: '100%', height: '300px', marginTop: '20px' }}>
        {renderMap()}
      </div>
    </div>
  );
};
