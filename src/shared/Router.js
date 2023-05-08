import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Mypage } from "../pages/Mypage";
import { MainPage } from "../pages/MainPage";
import { BoardDetails } from "../pages/BoardDetails";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { checkAuth } from "../api/auth";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { SET_TOKEN } from "../redux/modules/authSlice";

export const Router = () => {
  // 페이지 넘어갈 때마다 쿠키가 살아있는지 리덕스에서 꺼내와서 확인한다.
  // 꺼내왔을 때 없으면 그제서야 이제 서버에 쿠키 요청을 하는거다. (그게 서버와 통신 횟수를 줄여서 훨씬 효율적임!)
  // 서버에 요청하는 건 리액트 쿼리로 할 예정.

  // navigate 는 아무 주소로 처음부터 강제로 접속했을 때는 history가 없기 때문에 원하는 페이지로 보내질 못함.
  // 그래서 렌더링이 다 끝나는 시점에 실행되는 useEffect 안에 넣어줘야 함.
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkCookie = Cookies.get("access");

  // useEffect는 렌더링이 다 끝난 시점에 실행됨.
  useEffect(() => {
    if (!checkCookie) {
      navigate("/login");
    } else {
      // 만약 새로고침했을 때 쿠키는 있는데 GlobalState는 초기화되는 현상이 생김.
      // 그래서 여기서 한 번 더 쿠키를 decode해서 GlobalState로 만들어주는 것.

      const decodedToken = jwtDecode(checkCookie);
      const { id } = decodedToken;
      dispatch(SET_TOKEN({ userName: id }));
    }
  }, [navigate]);

  // useEffect 마운트가 끝난 후에 실행.

  // 렌더링 + 마운트(돔에 추가되는 거)
  // 재렌더링

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/within/boards/:id" element={<BoardDetails />} />
      </Routes>
    </Layout>
  );
};
