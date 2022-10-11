import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HeartIcon from "../../shared/Icons/HeartIcon";
import Mate from "../Mate";
import "./index.scss";
import Modal from "react-modal";
import { GithubPicker } from "react-color";

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
  const plusIcon = require("../../shared/Icons/Plus.jpg");
  const XIcon = require("../../shared/Icons/X.png");

  const [menu, changeMenu] = useState("home");
  const [stroke, setStroke] = useState("#B5BBC2");

  const [openCreateMateModal, toggleCreateMateModal] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    navigate(menu);
  }, [menu]);

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
        </div>
        <div className="side-bottom">
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
              "하이"
            ))}
        </div>
      </div>
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/home`}
          element={<div>home</div>}
        />
        <Route path={`${process.env.PUBLIC_URL}/mate/*`} element={<Mate />} />
        <Route path={`${process.env.PUBLIC_URL}/me`} element={<div>Me</div>} />
        <Route path={`${process.env.PUBLIC_URL}/*`} element={<div>바디</div>} />
      </Routes>
    </div>
  );
};
export default BaseLayout;
