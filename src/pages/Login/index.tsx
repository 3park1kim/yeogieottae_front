const { Kakao } = window;

const Login: React.FC = () => {
  const loginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/login",
    });
  };
  return (
    <a id="custom-login-btn" onClick={loginWithKakao}>
      <img
        src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </a>
  );
};

export default Login;
