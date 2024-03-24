import React from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

// Adjusted container style to fit within a flex container
const containerStyle = {
  width: '800px',
  height: '450px',
};

const center = {
  lat: 40.50008,
  lng: -74.44741,
};

const customMarker = {
  url: 'https://cdn-icons-png.flaticon.com/512/1907/1907908.png', // Replace 'marker-url.png' with the URL of your custom marker icon
  scaledSize: new window.google.maps.Size(40, 40) // Adjust the size of the marker here (width, height)
};

// Extended points with name and subject
const tutors = [
  {
    tutorID: 1,
    name: 'Alice',
    subject: 'Mathematics',
    lat: -3.745,
    lng: -38.543
  },
  {
    tutorID: 2,
    name: 'Bob',
    subject: 'Physics',
    lat: -3.743,
    lng: -38.521
  },
  {
    tutorID: 3,
    name: 'Carol',
    subject: 'Chemistry',
    lat: -3.746,
    lng: -38.523
  },
  {
    tutorID: 4,
    name: 'Dave',
    subject: 'Biology',
    lat: -3.747,
    lng: -38.529
  }
];

const MyComponent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAyovIFffLLzoaF2ZYbpU19xs8sX5DYxV4' // Directly use your API key here
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    tutors.forEach(tutor => bounds.extend(new window.google.maps.LatLng(tutor.lat, tutor.lng)));
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  return (
    <div style={{ display: 'flex', padding: '50px' }}>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {tutors.map((tutor) => (
              <MarkerF key={tutor.tutorID} position={{ lat: tutor.lat, lng: tutor.lng }} options={{icon: customMarker}} />
            ))}
          </GoogleMap>
          <div style={{ marginLeft: '20px', width: '300px', flexShrink: 0 }}>
            <h2>Tutors</h2>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Name</th>
                  <th style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Subject</th>
                </tr>
              </thead>
              <tbody>
                {tutors.map((tutor) => (
                  <tr key={tutor.tutorID}>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{tutor.name}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{tutor.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : <></>}
    </div>
  );
};

export default React.memo(MyComponent);
