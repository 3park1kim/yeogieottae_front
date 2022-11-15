import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Mark } from "../../types/MarkDto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules/reducers";
import { placeAction } from "../../modules/reducers/placeStore";

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
  data?: Array<Mark>;
}
const Map: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const mapRef = useRef<HTMLDivElement>(null);
  const { keyword } = useSelector((state: RootState) => state.place);

  useEffect(() => {
    const map = new kakao.maps.Map(mapRef.current, options);
    // const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, placesSearchCB);

    function placesSearchCB(data: any, status: string) {
      if (status === kakao.maps.services.Status.OK) {
        dispatch(placeAction.setPlaceList(data));
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place: any) {
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    }
  }, [keyword]);

  return <MapContainer id="map" ref={mapRef} />;
};

export default Map;
