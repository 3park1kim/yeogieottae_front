import React, { useEffect, useRef } from 'react'
import styled from "@emotion/styled"

const { kakao } = window;

interface MapProps {
    latitude: number | undefined;
    longitude: number | undefined;
}

const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
};

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
`

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        new kakao.maps.Map(mapRef.current, options);
    }, []);

    return (
        <MapContainer id="map" ref={mapRef} />
    )
}

export default Map;