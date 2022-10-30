import React from "react";
import styled from "@emotion/styled";
import Map from "../../components/Map";
import Picker from "../../components/Picker";

const Base = styled.div`
  overflow: hidden;
  width: 70%;
`;
const FilterGroup = styled.div`
  position: absolute;
  display: flex;
  z-index: 2;
  top: 10px;
`;
const Filter = styled.div`
  margin-left: 10px;
  padding: 13px 16px;
  border-radius: 20px;
  border: 1px solid #d1d6db;
  background-color: white;
  cursor: pointer;
`;
const Mate: React.FC = () => {
  return (
    <Base>
      <FilterGroup>
        <Filter>음식점</Filter>
        <Filter>카페</Filter>
      </FilterGroup>

      <Map latitude={33} longitude={130} />
    </Base>
  );
};

export default Mate;
