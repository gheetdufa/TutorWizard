import React from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100px',
  height: '550px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const points = [
  {
    //tutorID: 1,
    lat: -3.745,
    lng: -38.543
  },
  {
    tutorID: 2,
    lat: -3.743,
    lng: -38.521
  },
  {
    tutorID: 3,
    lat: -3.746,
    lng: -38.523
  },
  {
    tutorID: 4,
    lat: -3.747,
    lng: -38.529
  }
]

const MyComponent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyAyovIFffLLzoaF2ZYbpU19xs8sX5DYxV4' // Make sure to use an environment variable for your API key
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [])

  const onUnmount = React.useCallback((map: google.maps.Map) => {
    setMap(null);
  }, [])

  return isLoaded ? (
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
      {
          points.map((point, i)=>(
            <MarkerF position={point}></MarkerF>
          ))
        }
    </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent);
