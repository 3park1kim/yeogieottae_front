import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import BaseLayout from "./pages/BaseLayout";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />
        <Route path={`${process.env.PUBLIC_URL}/*`} element={<BaseLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
