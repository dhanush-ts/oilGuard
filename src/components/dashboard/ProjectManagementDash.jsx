import React from 'react';

export const VesselFinderRoute = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="https://route.vesselfinder.com/"
        title="Vessel Finder Route"
        style={{ width: '100%', height: '100vh', border: 'none' }}
      ></iframe>
    </div>
  );
};
