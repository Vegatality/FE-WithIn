import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Mypage } from "../pages/Mypage";
import { MainPage } from "../pages/MainPage";
import { BoardDetails } from "../pages/BoardDetails";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { checkAuth } from "../api/auth";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { SET_TOKEN } from "../redux/modules/authSlice";

export const Router = () => {
  // 페이지 넘어갈 때마다 쿠키가 살아있는지 리덕스에서 꺼내와서 확인한다.
  // 꺼내왔을 때 없으면 그제서야 이제 서버에 쿠키 요청을 하는거다. (그게 서버와 통신 횟수를 줄여서 훨씬 효율적임!)
  // 서버에 요청하는 건 리액트 쿼리로 할 예정.

  // navigate 는 렌더링/마운팅이 다 끝나는 시점에 실행되기 때문에 useEffect 안에 넣어줘야 한다.(검색해보기)

  const checkAuth = useSelector((store) => store.auth.authenticated);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const checkCookie = Cookies.get("access");

  // useEffect는 렌더링/마운트이(가) 다 끝난 시점에 실행됨.
  useEffect(() => {
    // 토큰 유효시간이 만료되는 경우
    // if (!checkCookie && checkAuth) {
    //     navigate("/login");
    //     alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
    // }

    // 로그인 안하고(토큰도 없고 리덕스에서도 authenticated가 false인 상태) 아무 페이지로 진입하는 경우
    // 문제점: 회원가입에서 그냥 뒤로가기 눌러서 로그인으로 이동하려고 할 때 alert동작하는 문제.
    // 해결방법 : 조건문에 !== "/login" 도 추가해줬다
    if (!checkCookie && !checkAuth && pathname !== "/signup" && pathname !== "/login") {
      alert("접속 권한이 없습니다. 로그인 해주세요.");
      navigate("/login");
      // 토큰 유효시간이 만료되는 경우(이 때 리덕스에서는 authenticated는 true)
    } else if (!checkCookie && checkAuth) {
      navigate("/login");
      alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");

      // 문제점: 그냥 pathname !== "/signup" 에서는 만약 "/login" 에 있었을 때도 토큰을 확인해서 decode해버리는 문제가 발생
      // 해결방법: 앞에 checkCookie && !checkAuth  조건문 더 추가함.
    } else if (checkCookie && !checkAuth && pathname !== "/signup") {
      // 만약 새로고침했을 때 쿠키는 있는데 GlobalState는 초기화되는 현상이 생김.
      // 그래서 여기서 한 번 더 쿠키를 decode해서 GlobalState로 만들어주는 것.
      const decodedToken = jwtDecode(checkCookie);
      console.log("Router", decodedToken);
      const { sub, auth } = decodedToken;
      dispatch(SET_TOKEN({ userName: sub, role: auth }));
    }
    // login에서 강제로 Mypage 버튼을 눌러서 이동하려고 하면 navigate를 사용하게 되는데
    // 이 때 useEffect를 실행하기 위해서 의존성 배열값에 navigate를 넣어주는 것.
    // navigate error 때문에 useEffect 안에 전부 적어준거고 사실상 페이지 이동할 때마다 useEffect 실행해줌.
  }, [navigate]);

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
