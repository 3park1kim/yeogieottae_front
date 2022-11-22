import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";

const { Kakao } = window;

interface PickerProps {
  // latitude: number | undefined;
  // longitude: number | undefined;
}

const options = {
  // center: new Kakao.maps.LatLng(33.450701, 126.570667),
  // level: 3,
};

const PickerContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Picker: React.FC<PickerProps> = ({}) => {
  useEffect(() => {
    Kakao.Picker.cleanup();
    Kakao.Picker.selectFriends({
      title: "친구 선택",
      showMyProfile: true,
      maxPickableCount: 10,
      minPickableCount: 1,
      success: function (response: any) {
        console.log(response);
      },
      fail: function (error: any) {
        console.log(error);
      },
    });
  }, []);

  return <PickerContainer id="picker" />;
};

export default Picker;
