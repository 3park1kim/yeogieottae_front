import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { colors } from "../../shared/utils/theme";
import { Mark } from "../../types/MarkDto";
import { Place } from "../../types/PlaceDto";

const PlaceListWrapper = styled.li`
  height: 100%;
  list-style: none;
  overflow-y: auto;
`;

const PlaceItem = styled.ul`
  padding: 10px 20px;
  margin: 0;
  cursor: pointer;
  border-bottom: 1px solid #f2f2f2;
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
  data: Array<Place>;
  recentKeywords: Array<Place>;
  setRecentKeywords: (list: any) => void;
}

const PlaceList: React.FC<Props> = ({
  data,
  recentKeywords,
  setRecentKeywords,
}) => {
  const onHandleClickPlace = useCallback(
    (item: Place) => {
      let list: Array<Place> = [...recentKeywords];
      list = list.filter((i) => i.id !== item.id);

      setRecentKeywords([item, ...list]);
    },
    [recentKeywords, setRecentKeywords]
  );

  return (
    <PlaceListWrapper>
      {data.map((item: Place, key: number) => (
        <PlaceItem
          key={`place-item-${key}`}
          onClick={() => onHandleClickPlace(item)}
        >
          <PlaceTxtWrapper>
            <PlaceTxt fontWeight={700} fontColor={colors.blue4}>
              {item.place_name}
            </PlaceTxt>
            <PlaceTxt fontSize={"12px"}>{item.category_group_name}</PlaceTxt>
          </PlaceTxtWrapper>
          <PlaceTxt fontSize={"14px"}>{item.category_name}</PlaceTxt>
          <PlaceTxt fontSize={"14px"}>{item.address_name}</PlaceTxt>
        </PlaceItem>
      ))}
    </PlaceListWrapper>
  );
};

export default PlaceList;
