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
import Modal from "react-modal";
import { GithubPicker } from "react-color";
import qs from "qs";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/reducers";
const { Kakao } = window;

const dummyDetail = [
  { id: 1, title: "연남동", desc: "", color: "red", places: [], member: [] },
  {
    id: 2,
    title: "상암동 맛집",
    desc: "",
    color: "blue",
    places: [],
    member: [],
  },
];

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

const BaseLayout = () => {
  const plusIcon = require("../../shared/Icons/Plus.jpg");
  const XIcon = require("../../shared/Icons/X.png");

  const [menu, changeMenu] = useState("/home");
  const [stroke, setStroke] = useState("#B5BBC2");
  const { placeList } = useSelector((state: RootState) => state.place);
  const [openCreateMateModal, toggleCreateMateModal] = useState(false);

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
        .then((res) => res.json())
        .then((data) => {
          Kakao.Auth.setAccessToken(data.access_token);
          window.localStorage.setItem("token", data.access_token);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="layout">
      {openCreateMateModal && (
        <Modal isOpen={openCreateMateModal} className={"modal"}>
          <div className="modal-header">
            <span className="modal-title">새 메이트 추가</span>
            <img
              src={XIcon}
              style={{ width: "25px", height: "25px" }}
              onClick={() => toggleCreateMateModal(false)}
              alt={"x"}
            />
          </div>
          <div className="modal-body createMateModal">
            <div className="createMateModal-box">
              <span className="name">이름</span>
              <input className="input" placeholder="이름을 적어주세요" />
            </div>
            <div className="createMateModal-box">
              <span className="name">설명</span>
              <input className="input long" placeholder="설명을 적어주세요." />
            </div>
            <div className="createMateModal-box">
              <span className="name">색</span>
              <HeartIcon width={20} height={20} stroke={stroke} />
              <GithubPicker
                width={"200px"}
                colors={[
                  "#25C16F",
                  "#F6705E",
                  "#8D65FC",
                  "#27dbd8",
                  "#4c86f4",
                  "#e5be00",
                  "#7dad31",
                  "#FEF3BD",
                  "#ffe3e7",
                  "#fff0dc",
                  "#252d38",
                  "#717985",
                  "#b5bbc2",
                  "#d1d6db",
                ]}
                triangle={"hide"}
                onChange={(e) => setStroke(e.hex)}
              />
            </div>
            <div className="createMateModal-box">
              <span className="name">멤버 추가</span>
              <input className="input" type={"button"} title={"새 멤버 선택"} />
            </div>
          </div>
          <div className="modal-footer">
            <button>취소</button>
            <button>확인</button>
          </div>
        </Modal>
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
                {dummyDetail.map((item) => (
                  <div
                    className="mate-sidemenu"
                    onClick={() => navigate(`/mate/${item.id}`)}
                  >
                    <HeartIcon
                      width={20}
                      height={20}
                      stroke={item.color}
                      classes="mate-sidemenu--heart"
                    />
                    <div>
                      <div className="mate-sidemenu--name">{item.title}</div>
                      <div>{item.places.length}개</div>
                    </div>
                    <button className="mate-sidemenu--button"></button>
                  </div>
                ))}
                <div
                  className="mate-sidemenu"
                  onClick={() => toggleCreateMateModal(true)}
                >
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
              <PlaceList
                data={placeList}
                recentKeywords={recentKeywords}
                setRecentKeywords={setRecentKeywords}
              />
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
