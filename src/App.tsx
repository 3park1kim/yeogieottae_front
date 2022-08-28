import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import BaseLayout from "./pages/BaseLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />
          <Route
            path={`${process.env.PUBLIC_URL}/*`}
            element={<BaseLayout />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
