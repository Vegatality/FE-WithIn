import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToHome = () => {
    navigate("/mypage");
  };

  const { pathname } = useLocation();

  const getHeaderName = () => {
    switch (pathname) {
      case "/signup":
        return "SIGNUP";
      case "/login":
        return "LOGIN";
      case "/":
        return "HOME";
      case "/mypage":
        return "MYPAGE";
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center relative mx-auto max-w-7xl bg-mainPurple w-screen rounded-b-lg shadow-md">
      <div className="flex flex-row w-full  mx-5 justify-between h-16 items-center font-extrabold parent text-white relative z-10">
        <img src="/images/white.png" className="h-12 cursor-pointer" alt="photoThumb" onClick={moveToHome} />
        <div className="text-xl absolute  left-1/2 -translate-x-2/4">{getHeaderName()}</div>
        <div className="cursor-pointer" onClick={moveToLogin}>
          Login/Signup
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent opacity-25 rounded-b-lg"></div>
    </div>
  );
}

export default Header;
