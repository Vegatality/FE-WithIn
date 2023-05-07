import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToHome = () => {
    navigate("/mypage");
  };

  return (
    <div className="flex justify-center mx-auto max-w-7xl bg-mainPurple relative w-screen rounded-b-lg shadow-md">
      <div className="flex flex-row w-full mx-3 justify-between h-16 items-center text-white font-extrabold relative z-10">
        <img src="/whiteLogo.png" alt="WithIn logo" className="h-12" />
        <div className="cursor-pointer" onClick={moveToHome}>
          Home
        </div>
        <div className="cursor-pointer" onClick={moveToLogin}>
          Login/Signup
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent rounded-b-lg opacity-10"></div>
    </div>
  );
}

export default Header;
