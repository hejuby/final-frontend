import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {
  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "100%" }}
      level={3}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}>
        {/* <div style={{ color: "#000" }}>Hello World!</div> */}
      </MapMarker>
    </Map>
  );
};

export default KakaoMap;
