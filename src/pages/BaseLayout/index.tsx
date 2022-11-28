import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HeartIcon from "../../shared/Icons/HeartIcon";
import Mate from "../Mate";
import "./index.scss";
import Modal from "react-modal";
import { GithubPicker } from "react-color";
import qs from "qs";
import Picker from "../../components/Picker";
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
        x: 123,
        y: 234,
        name: "파수",
      },
      {
        id: "def",
        x: 313,
        y: 534,
        name: "당고당",
      },
      {
        id: "def",
        x: 313,
        y: 534,
        name: "당고당",
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
];

const BaseLayout = () => {
  const plusIcon = require("../../shared/Icons/Plus.jpg");
  const XIcon = require("../../shared/Icons/X.png");

  const [menu, changeMenu] = useState("home");
  const [stroke, setStroke] = useState("#B5BBC2");
  const [openPicker, toggleOpenPicker] = useState(false);
  const [openCreateMateModal, toggleCreateMateModal] = useState(false);

  const navigate = useNavigate();
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
  useEffect(() => {
    let pickerDoc = document.getElementById("picker");
    pickerDoc?.addEventListener("close", function (e) {
      toggleOpenPicker(false);
    });
  }, []);
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
              <input
                className="input"
                type={"button"}
                title={"새 멤버 선택"}
                onClick={() =>
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
                  })
                }
              />
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
          <button onClick={() => changeMenu("/")}>홈</button>
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
                      <div className="mate-sidemenu--btns">
                        <span
                          onClick={(e) => (
                            e.stopPropagation(), toggleCreateMateModal(true)
                          )}
                        >
                          자세히
                        </span>
                        <span
                          onClick={(e) => (
                            e.stopPropagation(), toggleCreateMateModal(true)
                          )}
                        >
                          수정
                        </span>
                        <span
                          onClick={(e) => (
                            e.stopPropagation(), toggleCreateMateModal(true)
                          )}
                        >
                          삭제
                        </span>
                      </div>
                    </div>
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
        <Route path={`${process.env.PUBLIC_URL}`} element={<div>home</div>} />
        <Route path={`${process.env.PUBLIC_URL}/mate/*`} element={<Mate />} />
        <Route path={`${process.env.PUBLIC_URL}/me`} element={<div>Me</div>} />
        <Route path={`${process.env.PUBLIC_URL}/*`} element={<div>바디</div>} />
      </Routes>
    </div>
  );
};
export default BaseLayout;
