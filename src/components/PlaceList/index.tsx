import styled from "@emotion/styled";
import React from "react";
import { Mark } from "../../types/MarkDto";

const PlaceListWrapper = styled.div`
  height: 100%;
`;

const PlaceItem = styled.div``;

const PlaceName = styled.p``;

interface Props {
  data: Array<Mark>;
}

const PlaceList: React.FC<Props> = ({ data }) => {
  return (
    <PlaceListWrapper>
      {data.map((item: Mark, key: number) => (
        <PlaceItem key={`place-item-${key}`}>
          <PlaceName>{item.name}</PlaceName>
        </PlaceItem>
      ))}
    </PlaceListWrapper>
  );
};

export default PlaceList;
