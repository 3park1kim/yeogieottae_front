import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { Mark } from "../../types/MarkDto";

const PlaceListWrapper = styled.div`
  height: 100%;
`;

const PlaceItem = styled.div``;

const PlaceName = styled.p``;

interface Props {
  data: Array<Mark>;
  recentKeywords: Array<Mark>;
  setRecentKeywords: (list: any) => void;
}

const PlaceList: React.FC<Props> = ({
  data,
  recentKeywords,
  setRecentKeywords,
}) => {
  const onHandleClickPlace = useCallback(
    (item: Mark) => {
      let list: Array<Mark> = [...recentKeywords];
      list = list.filter((i) => i.placeId !== item.placeId);

      setRecentKeywords([item, ...list]);
    },
    [recentKeywords, setRecentKeywords]
  );

  return (
    <PlaceListWrapper>
      {data.map((item: Mark, key: number) => (
        <PlaceItem
          key={`place-item-${key}`}
          onClick={() => onHandleClickPlace(item)}
        >
          <PlaceName>{item.name}</PlaceName>
        </PlaceItem>
      ))}
    </PlaceListWrapper>
  );
};

export default PlaceList;
