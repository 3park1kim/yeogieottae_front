import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import BaseLayout from "./pages/BaseLayout";
import store from "./modules/reducers";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />
          <Route
            path={`${process.env.PUBLIC_URL}/*`}
            element={<BaseLayout />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
