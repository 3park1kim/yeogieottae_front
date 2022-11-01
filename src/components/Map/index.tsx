import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Mark } from "../../types/MarkDto";

const { kakao } = window;

// interface MapProps {
//   latitude: number | undefined;
//   longitude: number | undefined;
// }

const options = {
  center: new kakao.maps.LatLng(37.4923615, 127.02928809999999),
  level: 10,
};

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface Props {
  data: Array<Mark>;
}
const Map: React.FC<Props> = ({ data }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new kakao.maps.Map(mapRef.current, options);

    data.forEach((item) => {
      let markerPosition = new kakao.maps.LatLng(item.latitude, item.longitude);
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    });
  }, [data]);

  return <MapContainer id="map" ref={mapRef} />;
};

export default Map;
