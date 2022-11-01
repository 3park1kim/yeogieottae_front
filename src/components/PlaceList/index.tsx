import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { colors } from "../../shared/utils/theme";
import { Mark } from "../../types/MarkDto";

const PlaceListWrapper = styled.li`
  height: 100%;
  list-style: none;
`;

const PlaceItem = styled.ul`
  padding: 5px 5px;
`;

const PlaceTxtWrapper = styled.div`
  display: flex;
  align-items: end;

  p + p {
    margin-left: 5px;
  }
`;

const PlaceTxt = styled.p<{
  fontWeight?: number;
  fontSize?: string;
  fontColor?: string;
}>`
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 5px 0;
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ fontColor }) => fontColor};
`;

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
          <PlaceTxtWrapper>
            <PlaceTxt fontWeight={700} fontColor={colors.blue4}>
              {item.name}
            </PlaceTxt>
            <PlaceTxt fontSize={"12px"}>{item.placeType}</PlaceTxt>
          </PlaceTxtWrapper>
          <PlaceTxt fontSize={"14px"}>{item.groupName}</PlaceTxt>
          <PlaceTxt fontSize={"14px"}>{item.addressName}</PlaceTxt>
        </PlaceItem>
      ))}
    </PlaceListWrapper>
  );
};

export default PlaceList;
