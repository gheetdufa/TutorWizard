import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '450px',
};

let customMarker: google.maps.Icon | google.maps.Symbol = {
  url: 'https://cdn-icons-png.flaticon.com/512/1907/1907908.png',
};

// Extended points with name and subject
const tutors = [
  {
    tutorID: 1,
    name: 'Alice',
    subject: 'Mathematics',
    lat: 40.530610,
    lng: -74.45741,
  },
  {
    tutorID: 2,
    name: 'Bob',
    subject: 'Physics',
    lat: 40.530610,
    lng: -74.46741,
  },
  {
    tutorID: 3,
    name: 'Carol',
    subject: 'Chemistry',
    lat: 40.530610,
    lng: -74.47741,
  },
  {
    tutorID: 4,
    name: 'Dave',
    subject: 'Biology',
    lat: 40.530610,
    lng: -74.48741,
  },
];

const MyComponent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAyovIFffLLzoaF2ZYbpU19xs8sX5DYxV4' // Use your actual API key here
  });

  useEffect(() => {
    if (isLoaded) {
      customMarker = {
        ...customMarker,
        scaledSize: new window.google.maps.Size(40, 40), // Adjust the size of the marker here (width, height)
      };
    }
  }, [isLoaded]);

  const [center, setCenter] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    tutors.forEach(tutor => bounds.extend(new window.google.maps.LatLng(tutor.lat, tutor.lng)));
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting the geolocation: ", error);
          // Use a default center if geolocation fails
          setCenter({ lat: 50.50008, lng: -74.44741 });
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      // Use a default center if geolocation is not supported
      setCenter({ lat: 50.50008, lng: -74.44741 });
    }
  }, []);

  return (
    <div style={{ display: 'flex', padding: '50px' }}>
      {isLoaded && center ? (
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
              <MarkerF key={tutor.tutorID} position={{ lat: tutor.lat, lng: tutor.lng }}  />
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
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px'                    }}>{tutor.name}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{tutor.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : <p>Loading map...</p>}
    </div>
  );
};

export default React.memo(MyComponent);

