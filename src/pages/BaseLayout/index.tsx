import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HeartIcon from "../../shared/Icons/HeartIcon";
import Mate from "../Mate";
import "./index.scss";
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
        </div>
        <div className="side-bottom">
          {menu === "/mate" && (
            <div>
              <HeartIcon width={30} height={30} />
            </div>
          )}
        </div>
      </div>
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/home`}
          element={<div>home</div>}
        />
        <Route path={`${process.env.PUBLIC_URL}/mate`} element={<Mate />} />
        <Route path={`${process.env.PUBLIC_URL}/me`} element={<div>Me</div>} />
        <Route path={`${process.env.PUBLIC_URL}/*`} element={<div>바디</div>} />
      </Routes>
    </div>
  );
};
export default BaseLayout;
