import React, { useState } from "react";
import styled from "@emotion/styled";
import { GithubPicker } from "react-color";
import { useNavigate } from "react-router-dom";

import HeartIcon from "../../shared/Icons/HeartIcon";
import Modal from "react-modal";

const { Kakao } = window;
interface Props {
  open: boolean;
  type: string;
  onClose: () => void;
}
type ObjType = {
  [index: string]: string;
};

const CreateOrDetailModal: React.FC<Props> = ({ open, type, onClose }) => {
  const XIcon = require("../../shared/Icons/X.png");
  const title: ObjType = {
    detail: "메이트 상세정보",
    create: "새 메이트 추가",
    edit: "메이트 수정하기",
    "": "없음",
  };

  const [mateInfo, changeMateInfo] = useState({
    name: "",
    desc: "",
    stroke: "#B5BBC2",
  });

  return (
    <Modal isOpen={open} className={"modal"}>
      <div className="modal-header">
        <span className="modal-title">{title[type]}</span>
        <img
          src={XIcon}
          style={{ width: "25px", height: "25px" }}
          onClick={onClose}
          alt={"x"}
        />
      </div>
      <div className="modal-body createMateModal">
        <div className="createMateModal-box">
          <span className="name">이름</span>
          {title[type] === "detail" ? (
            <span className="input">{mateInfo.name}</span>
          ) : (
            <input
              className="input"
              placeholder="이름을 적어주세요"
              id={"name"}
              value={mateInfo.name}
              onChange={e =>
                changeMateInfo({ ...mateInfo, name: e.target.value })
              }
            />
          )}
        </div>
        <div className="createMateModal-box">
          <span className="name">설명</span>
          <input
            className="input long"
            placeholder="설명을 적어주세요."
            id={"desc"}
            value={mateInfo.desc}
            onChange={e =>
              changeMateInfo({ ...mateInfo, desc: e.target.value })
            }
          />
        </div>
        <div className="createMateModal-box">
          <span className="name">색</span>
          <HeartIcon width={20} height={20} stroke={mateInfo.stroke} />
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
            onChange={e => changeMateInfo({ ...mateInfo, stroke: e.hex })}
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
  );
};

export default CreateOrDetailModal;
