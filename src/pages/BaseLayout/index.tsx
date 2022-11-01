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
    latitude: 37.4923615,
    longitude: 127.02928809999999,
  },
  {
    placeId: 2,
    name: "마포만두",
    latitude: 37.5761986,
    longitude: 126.90000479999999,
  },
];

const BaseLayout = () => {
  const [menu, changeMenu] = useState("/home");
  const navigate = useNavigate();
  const [recentKeywords, setRecentKeywords] = useLocalStorage(
    LOCAL_STORAGE_RECENT_SEARCH,
    []
  );
  useEffect(() => {
    navigate(menu);
  }, [menu]);

  return (
    <div className="layout">
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
                data={dummyPlaces}
                recentKeywords={recentKeywords}
                setRecentKeywords={setRecentKeywords}
              />
            )}
          {menu === "/mate" &&
            (window.location.href.split("/").pop() === "mate" ? (
              <>
                <div
                  className="mate-sidemenu"
                  onClick={() => navigate("/mate/1")}
                >
                  <HeartIcon
                    width={20}
                    height={20}
                    stroke={"red"}
                    classes="mate-sidemenu--heart"
                  />
                  <div>
                    <div className="mate-sidemenu--name">연남동</div>
                    <div>0개</div>
                  </div>
                  <button className="mate-sidemenu--button"></button>
                </div>
                <div
                  className="mate-sidemenu"
                  onClick={() => navigate("/mate/2")}
                >
                  <HeartIcon
                    width={20}
                    height={20}
                    stroke={"blue"}
                    classes="mate-sidemenu--heart"
                  />
                  <div>
                    <div className="mate-sidemenu--name">상암동 맛집</div>
                    <div>0개</div>
                  </div>{" "}
                  <button className="mate-sidemenu--button"></button>
                </div>
              </>
            ) : (
              ".하이"
            ))}
        </div>
      </div>
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/home`}
          element={<Home data={dummyPlaces} />}
        />
        <Route path={`${process.env.PUBLIC_URL}/mate/*`} element={<Mate />} />
        <Route path={`${process.env.PUBLIC_URL}/me`} element={<div>Me</div>} />
        <Route path={`${process.env.PUBLIC_URL}/*`} element={<div>바디</div>} />
      </Routes>
    </div>
  );
};
export default BaseLayout;
