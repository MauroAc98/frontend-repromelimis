import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export default function Map(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.google_key,
  });
  //   Pin marker
  const [markerPosition, setMarkerPosition] = useState(null);
  //   Centrado del mapa
  const [center, setCenter] = useState({
    lat: -27.3479434,
    lng: -55.8179488,
  });

  //   Estilos del mapa
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  //   Al hacer click en mapa, seteo coordenadas
  const handleMapClick = (event) => {
    const _lat = event.latLng.lat();
    const _lng = event.latLng.lng();
    const latLng = {
      lat: _lat,
      lng: _lng,
    };
    // Seteamos a las props que le pasamos
    props.setLat(_lat);
    props.setLong(_lng);
    setMarkerPosition(latLng);
    setCenter(latLng);
  };

  //   Marker
  const renderMarker = () => {
    if (markerPosition) {
      return <Marker position={markerPosition} />;
    }
    return null;
  };

  /** Si le pasamos un valor inicial para el marker */
  useEffect(() => {
    if (props.initialMarker) {
      setMarkerPosition(props.initialMarker);
      setCenter(props.initialMarker);
    }
  }, [props.initialMarker]);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {renderMarker()}
        </GoogleMap>
      )}
    </>
  );
}
