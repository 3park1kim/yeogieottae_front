import React from 'react'
import styled from "@emotion/styled"
import Map from '../../components/Map';

const Base = styled.div`
    overflow: hidden;
    width: 70%
`
const Home: React.FC = () => {
    return (
        <Base>
            <Map latitude={33} longitude={130} />
        </Base>
    )
}

export default Home;