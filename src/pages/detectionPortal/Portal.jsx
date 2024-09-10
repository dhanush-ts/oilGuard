import React, { useState, useEffect } from 'react';

const OilSpillDetectionPortal = () => {
  const [detectionImage, setDetectionImage] = useState(null);
  const [detectionDetails, setDetectionDetails] = useState(null);
  const [asvImage, setAsvImage] = useState(null);
  const [worldMapImage, setWorldMapImage] = useState(null);
  const [alertTriggered, setAlertTriggered] = useState(false);

  useEffect(() => {
    if (alertTriggered) {
      // Display the alert modal and handle the alert sound
      const alertSound = new Audio('/static/sounds/emergency.mp3');
      alertSound.loop = true;
      alertSound.play().then(() => {
        if (window.confirm('Alerted Successfully! Press OK and Click View OilGuard Details')) {
          alertSound.pause();
          alertSound.currentTime = 0;
          // Send a fetch request to stop the alert (implement the endpoint)
          fetch('/stop_alert', { method: 'POST' });
        }
      }).catch(error => {
        console.error('Audio playback failed: ', error);
      });
    }
  }, [alertTriggered]);

  return (
    <div style={{ backgroundColor: '#403f3f', color: '#333', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px'    , borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        
        {/* Detection Details Section */}
        {detectionImage ? (
          <div>
            <button
              style={{
                backgroundColor: '#b51d1d',
                color: '#e6f2ff',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '1.0em',
                cursor: 'pointer'
              }}
              onClick={() => window.location.href = '/oil_guard'}
            >
              VIEW OILGUARD DETAILS
            </button>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Detection Details:</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              backgroundColor: '#e4e4e4',
              padding: '15px',
              borderRadius: '8px',
              border: '#646464 solid 2px'
            }}>
              <div><strong>Latitude:</strong> {detectionDetails.latitude}</div>
              <div><strong>Longitude:</strong> {detectionDetails.longitude}</div>
              <div><strong>Location:</strong> {detectionDetails.location}</div>
              <div><strong>Depth:</strong> {detectionDetails.depth}</div>
              <div><strong>AIS Number:</strong> {detectionDetails.ais_number}</div>
              <div><strong>Current Weather:</strong> {detectionDetails.current_weather}</div>
              <div><strong>Air Direction:</strong> {detectionDetails.air_direction}</div>
              <div><strong>Cargo-Direction:</strong> North-West</div>
            </div>
          </div>
        ) : (
          <h1><u>Monitoring Board:</u></h1>
        )}

        {/* Upload and Detection Status Section */}
        <form action="/homepage" method="post" encType="multipart/form-data" style={{ backgroundColor: '#333', width: '60%', color: 'white', padding: '4px', marginBottom: '30px' }}>
          <label><strong>Sample Input -</strong></label>&ensp;
          <input type="file" name="file" accept="image/*" required />
          <button type="submit">Upload Image</button>
        </form>

        <h2 style={{ fontSize: '1.7em', marginBottom: '15px' }}><u>Detection Status :</u></h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ width: '48%' }}>
            {detectionImage ? (
              <div>
                <p style={{ color: '#b51d1d' }}><strong style={{ color: '#403f3f' }}>SAR Image -</strong> Detected!</p>
                <img src={detectionImage} alt="Detection" style={{ width: '100%' }} />
              </div>
            ) : (
              <p style={{ fontSize: '25px', color: 'green' }}>&ensp; No detection occurs</p>
            )}
          </div>
          <div style={{ width: '48%' }}>
            {asvImage && (
              <div>
                <p style={{ color: '#b51d1d' }}><strong style={{ color: '#403f3f' }}>ASV Image -</strong> Detected!</p>
                <img src={asvImage} alt="ASV" style={{ width: '100%' }} />
              </div>
            )}
          </div>
        </div>

        {/* World Map Section */}
        {detectionImage && (
          <div className="section">
            <h2 style={{ textAlign: 'center', fontSize: '27px' }}>World Map</h2>
            <img src={worldMapImage} alt="World Map" style={{ display: 'block', margin: 'auto', width: '70%', height: '30%' }} />
          </div>
        )}

        {/* Action Buttons */}
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '15px', marginTop: '30px' }}>
          <button>Inform Nearby Cargo</button>
          <button>View ASV Map</button>
          <button>Empty</button>
          <button>Empty</button>
        </div>
      </div>

      {/* Detection Alert Modal */}
      {alertTriggered && (
        <div style={{
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
            <p>Detection occurred! Please acknowledge to start Nearby ASV and alert sound.</p>
            <button onClick={() => setAlertTriggered(false)} style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Acknowledge</button>
            <button onClick={() => setAlertTriggered(false)} style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OilSpillDetectionPortal;
