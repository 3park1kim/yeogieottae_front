import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PlaceList from "../../components/PlaceList";
import SearchBar from "../../components/SearchBar";
import useLocalStorage from "../../modules/hooks/useLocalStorage";
import HeartIcon from "../../shared/Icons/HeartIcon";
import { LOCAL_STORAGE_RECENT_SEARCH } from "../../shared/utils/storageKey";
import Home from "../Home";
import Mate from "../Mate";
import "./index.scss";
import qs from "qs";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/reducers";
import BackIcon from "../../shared/Icons/BackIcon";
import CreateOrDetailModal from "../Mate/CreateOrDetailModal";
import { MateType } from "../../types/Mate";
const { Kakao } = window;

const dummyDetail = [
  {
    id: 1,
    title: "3park 1kim",
    desc: "",
    color: "#F6705E",
    places: [
      {
        id: "abc",
        x: "123",
        y: "234",
        place_name: "파수",
      },
      {
        id: "def",
        x: "313",
        y: "534",
        place_name: "당고당",
      },
      {
        id: "def",
        x: "313",
        y: "534",
        place_name: "당고당234",
      },
    ],
    member: [],
  },
  {
    id: 2,
    title: "파수동기 2022",
    desc: "",
    color: "#ffe3e7",
    places: [],
    member: [],
  },
  {
    id: 3,
    title: "배고픈 사람들",
    desc: "",
    color: "#e5be00 ",
    places: [],
    member: [],
  },
] as MateType[];

const dummyPlaces = [
  {
    placeId: 1,
    name: "뚜비집",
    addressName: "경기도 고양시 덕양구",
    groupName: "요기어때",
    placeType: "우리집",
    latitude: 37.4923615,
    longitude: 127.02928809999999,
  },
  {
    placeId: 2,
    name: "마포만두",
    addressName: "서울 마포구 상암동",
    groupName: "3Park1Kim",
    placeType: "식당",
    latitude: 37.5761986,
    longitude: 126.90000479999999,
  },
  {
    placeId: 1,
    name: "뚜비집",
    addressName: "경기도 고양시 덕양구",
    groupName: "요기어때",
    placeType: "우리집",
    latitude: 37.4923615,
    longitude: 127.02928809999999,
  },
  {
    placeId: 2,
    name: "마포만두",
    addressName: "서울 마포구 상암동",
    groupName: "3Park1Kim",
    placeType: "식당",
    latitude: 37.5761986,
    longitude: 126.90000479999999,
  },
  {
    placeId: 1,
    name: "뚜비집",
    addressName: "경기도 고양시 덕양구",
    groupName: "요기어때",
    placeType: "우리집",
    latitude: 37.4923615,
    longitude: 127.02928809999999,
  },
  {
    placeId: 2,
    name: "마포만두",
    addressName: "서울 마포구 상암동",
    groupName: "3Park1Kim",
    placeType: "식당",
    latitude: 37.5761986,
    longitude: 126.90000479999999,
  },
  {
    placeId: 1,
    name: "뚜비집",
    addressName: "경기도 고양시 덕양구",
    groupName: "요기어때",
    placeType: "우리집",
    latitude: 37.4923615,
    longitude: 127.02928809999999,
  },
  {
    placeId: 2,
    name: "마포만두",
    addressName: "서울 마포구 상암동",
    groupName: "3Park1Kim",
    placeType: "식당",
    latitude: 37.5761986,
    longitude: 126.90000479999999,
  },
  {
    placeId: 1,
    name: "뚜비집",
    addressName: "경기도 고양시 덕양구",
    groupName: "요기어때",
    placeType: "우리집",
    latitude: 37.4923615,
    longitude: 127.02928809999999,
  },
  {
    placeId: 2,
    name: "마포만두",
    addressName: "서울 마포구 상암동",
    groupName: "3Park1Kim",
    placeType: "식당",
    latitude: 37.5761986,
    longitude: 126.90000479999999,
  },
  {
    placeId: 1,
    name: "뚜비집",
    addressName: "경기도 고양시 덕양구",
    groupName: "요기어때",
    placeType: "우리집",
    latitude: 37.4923615,
    longitude: 127.02928809999999,
  },
  {
    placeId: 2,
    name: "마포만두",
    addressName: "서울 마포구 상암동",
    groupName: "3Park1Kim",
    placeType: "식당",
    latitude: 37.5761986,
    longitude: 126.90000479999999,
  },
  {
    placeId: 1,
    name: "뚜비집",
    addressName: "경기도 고양시 덕양구",
    groupName: "요기어때",
    placeType: "우리집",
    latitude: 37.4923615,
    longitude: 127.02928809999999,
  },
  {
    placeId: 2,
    name: "마포만두",
    addressName: "서울 마포구 상암동",
    groupName: "3Park1Kim",
    placeType: "식당",
    latitude: 37.5761986,
    longitude: 126.90000479999999,
  },
];
const Box = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 10px;
  font-weight: 700;
  font-size: 20px;
  > * + * {
    margin-left: 10px;
  }
`;
const BaseLayout = () => {
  const plusIcon = require("../../shared/Icons/Plus.jpg");
  const XIcon = require("../../shared/Icons/X.png");

  const [menu, changeMenu] = useState("/home");
  const [stroke, setStroke] = useState("#B5BBC2");
  const [openPicker, toggleOpenPicker] = useState(false);
  const { placeList } = useSelector((state: RootState) => state.place);
  const [openCreateMateModal, toggleCreateMateModal] = useState("");
  const [focusedMate, changeFocusedMate] = useState<MateType>({} as MateType);
  const navigate = useNavigate();
  const [recentKeywords, setRecentKeywords] = useLocalStorage(
    LOCAL_STORAGE_RECENT_SEARCH,
    []
  );
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      let params = new URLSearchParams(document.location.search);
      let code = params.get("code");
      getToken(code ?? "");
    }

    navigate(menu);
  }, [menu]);

  const getToken = async (code: string) => {
    try {
      await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: qs.stringify({
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_KAKAO_API_KEY,
          redirect_uri: "http://localhost:3000",
          code: code,
        }),
      })
        .then(res => res.json())
        .then(data => {
          Kakao.Auth.setAccessToken(data.access_token);
          window.localStorage.setItem("token", data.access_token);
        });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    let pickerDoc = document.getElementById("picker");
    pickerDoc?.addEventListener("close", function (e) {
      toggleOpenPicker(false);
    });
  }, []);
  return (
    <div className="layout">
      {openCreateMateModal && (
        <CreateOrDetailModal
          open={openCreateMateModal !== ""}
          type={openCreateMateModal}
          onClose={() => toggleCreateMateModal("")}
        />
      )}
      <div className="side">
        <div className="side-top">
          상단
          <button onClick={() => changeMenu("/home")}>홈</button>
          <button onClick={() => changeMenu("/mate")}>메이트</button>
          <button onClick={() => changeMenu("/me")}>나</button>
          <SearchBar
            recentKeywords={recentKeywords}
            setRecentKeywords={setRecentKeywords}
          />
        </div>
        <div className="side-bottom">
          {menu === "/home" &&
            window.location.href.split("/").pop() === "home" && (
              <PlaceList
                data={placeList}
                recentKeywords={recentKeywords}
                setRecentKeywords={setRecentKeywords}
              />
            )}
          {menu === "/mate" &&
            (window.location.href.split("/").pop() === "mate" ? (
              <>
                {dummyDetail.map(item => (
                  <div
                    className="mate-sidemenu"
                    onClick={() => navigate(`/mate/${item.id}`)}>
                    <HeartIcon
                      width={20}
                      height={20}
                      stroke={item.color}
                      classes="mate-sidemenu--heart"
                    />
                    <div>
                      <div className="mate-sidemenu--name">{item.title}</div>
                      <div className="mate-sidemenu--btns">
                        <span
                          onClick={e => (
                            e.stopPropagation(), toggleCreateMateModal("detail")
                          )}>
                          자세히
                        </span>
                        <span
                          onClick={e => (
                            e.stopPropagation(),
                            toggleCreateMateModal("edit"),
                            changeFocusedMate(item)
                          )}>
                          수정
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className="mate-sidemenu"
                  onClick={() => toggleCreateMateModal("create")}>
                  <img
                    src={plusIcon}
                    className="mate-sidemenu--heart"
                    style={{ width: "25px", height: "25px" }}
                    alt={"plus"}
                  />
                  <div className="mate-sidemenu--name">메이트 추가</div>
                </div>
              </>
            ) : (
              <div>
                <Box>
                  <span onClick={() => navigate("/mate")}>
                    <BackIcon />
                  </span>
                  <span>3Park 1Kim</span>
                </Box>
                <PlaceList
                  data={placeList}
                  recentKeywords={recentKeywords}
                  setRecentKeywords={setRecentKeywords}
                />
              </div>
            ))}
        </div>
      </div>
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/home`}
          element={<Home data={dummyPlaces} />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/mate/*`}
          element={<Mate data={dummyPlaces} />}
        />
        <Route path={`${process.env.PUBLIC_URL}/me`} element={<div>Me</div>} />
        <Route path={`${process.env.PUBLIC_URL}/*`} element={<div>바디</div>} />
      </Routes>
    </div>
  );
};
export default BaseLayout;
