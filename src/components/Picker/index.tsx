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
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "Yeogieottae Company", // 제목
        description: "당신을 요긴오때으로 초대합니다.",
        imageUrl:
          "https://storage.googleapis.com/jjalbot/2018/12/yilm9F5nv/zzal.jpg",
        link: {
          webUrl: "127.0.0.1/3000",
        },
      },
      buttons: [
        {
          title: "환영",
          link: {
            webUrl: "127.0.0.1/3000",
          },
        },
      ],
    });
  }, []);

  return Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: "Yeogieottae Company", // 제목
      description: "당신을 요긴오때으로 초대합니다.",
      imageUrl:
        "https://storage.googleapis.com/jjalbot/2018/12/yilm9F5nv/zzal.jpg",
      link: {
        webUrl: "127.0.0.1/3000",
      },
    },
    buttons: [
      {
        title: "환영",
        link: {
          webUrl: "127.0.0.1/3000",
        },
      },
    ],
  });
};

export default Picker;
