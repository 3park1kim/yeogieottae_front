import { Route, Routes } from "react-router-dom";
import "./index.scss";
const BaseLayout = () => {
  return (
    <div className="layout">
      <div className="side">
        <div className="side-top">상단</div>
        <div className="side-bottom">메인 하단</div>
      </div>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/login`} element={<div />} />
        <Route path={`${process.env.PUBLIC_URL}/*`} element={<div>바디</div>} />
      </Routes>
    </div>
  );
};
export default BaseLayout;
