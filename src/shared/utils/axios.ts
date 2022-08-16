import Axios from "axios";
import { SerializedError } from "@reduxjs/toolkit";

const axios = Axios.create({
  withCredentials: true,
  headers: {
    locale: "kr-KR",
    "Accept-Language":
      window.navigator.language === "ko" ||
      window.navigator.language === "ko-KR" ||
      window.navigator.language === "ko-kr"
        ? "ko"
        : window.navigator.language === "en" ||
          window.navigator.language === "en-US" ||
          window.navigator.language === "en-us"
        ? "en"
        : window.navigator.language === "ko-KR" ||
          window.navigator.language === "ko-kr"
        ? "ko"
        : "en",
  },
});

axios.interceptors.request.use(
  function (config) {
    //store.dispatch(startProgress());

    //(Loading);
    // 요청을 보내기 전에 수행할 일
    // ...
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
axios.interceptors.response.use(
  (response) => {
    //store.dispatch(stopProgress());
    //document.body.classList.remove('loading-indicator');

    return response;
  },
  (error: any) => {
    let se: SerializedError;

    if (error.response && error.response.data) {
      const errorData = error.response.data;
      if (errorData.errorCode) {
        switch (errorData.errorCode) {
          default:
            break;
        }
      }

      se = {
        name: errorData.errorCode,
        message: errorData.errorMessage,
      };

      return Promise.reject(se);
    }

    se = {
      name: "INTERNAL_SERVER_ERROR",
      message:
        window.navigator.language === "ko" ||
        window.navigator.language === "ko-KR" ||
        window.navigator.language === "ko-kr"
          ? "서비스에 문제가 발생하였습니다.\n잠시 후 다시 진행 하시기 바랍니다.\n(현상이 계속 되면 관리자에게 문의 바랍니다.)"
          : "An error has occurred to the service. Please try again later. (Contact the administrator if this problem persists.)",
    };
    return Promise.reject(se);
  }
);
export default axios;
