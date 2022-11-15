import React from "react";
import styled from "@emotion/styled";
import Map from "../../components/Map";
import Picker from "../../components/Picker";
import { useNavigate } from "react-router-dom";
import { Mark } from "../../types/MarkDto";
const { kakao } = window;

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
interface Props {
  data: Array<Mark>;
}

const Mate: React.FC<Props> = ({ data }) => {
  var token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <Base>
      <FilterGroup>
        <Filter>음식점</Filter>
        <Filter>카페</Filter>
      </FilterGroup>
      {token && <Picker />}

      <Map data={data} />
    </Base>
  );
};

export default Mate;
