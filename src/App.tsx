import "./App.css";

const { Kakao } = window;

declare global {
  interface Window {
    Kakao: any;
  }
}

function App() {
  const loginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000',
    })
  }

  return (
    <div className="App">
      <a id="custom-login-btn" onClick={loginWithKakao}>
        <img
          src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="222"
          alt="카카오 로그인 버튼"
        />
      </a>
    </div>
  )

}

export default App;
