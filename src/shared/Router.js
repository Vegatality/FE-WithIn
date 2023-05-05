import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Mypage } from "../pages/Mypage";
import { MainPage } from "../pages/MainPage";
import { BoardDetails } from "../pages/BoardDetails";

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/within/" element={<MainPage />} />
          <Route path="/within/signup" element={<Signup />} />
          <Route path="/within/login" element={<Login />} />
          <Route path="/within/mypage" element={<Mypage />} />
          <Route path="/within/boards/:id" element={<BoardDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
