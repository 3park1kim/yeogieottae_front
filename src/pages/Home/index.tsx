import React from "react";
import styled from "@emotion/styled";
import Map from "../../components/Map";
import { Mark } from "../../types/MarkDto";

const Base = styled.div`
  overflow: hidden;
  width: 70%;
`;

interface Props {
  data: Array<Mark>;
}

const Home: React.FC<Props> = ({ data }) => {
  return (
    <Base>
      <Map data={data} />
    </Base>
  );
};

export default Home;
