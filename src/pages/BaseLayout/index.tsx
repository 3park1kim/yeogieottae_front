import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import HeartIcon from "../../shared/Icons/HeartIcon";
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

const BaseLayout = () => {
  const [menu, changeMenu] = useState("home");
  const navigate = useNavigate();
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
          <SearchBar />
        </div>
        <div className="side-bottom">
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
        <Route path={`${process.env.PUBLIC_URL}/home`} element={<Home />} />
        <Route path={`${process.env.PUBLIC_URL}/mate/*`} element={<Mate />} />
        <Route path={`${process.env.PUBLIC_URL}/me`} element={<div>Me</div>} />
        <Route path={`${process.env.PUBLIC_URL}/*`} element={<div>바디</div>} />
      </Routes>
    </div>
  );
};
export default BaseLayout;
