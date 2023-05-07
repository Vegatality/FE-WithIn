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
    <div class="flex justify-center relative mx-auto max-w-7xl bg-mainPurple w-screen rounded-b-lg shadow-md">
      <div class="flex flex-row w-full  mx-5 justify-between h-20 items-center font-extrabold parent text-white relative z-10">
        <img src="/images/white.png" className="h-12 cursor-pointer" alt="photoThumb" onClick={moveToHome} />
        <div class="text-xl -translate-x-2/4">Home</div>
        <div onClick={moveToLogin}>Login/Signup</div>
      </div>
      <div class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent opacity-25 rounded-b-lg"></div>
    </div>
  );
}

export default Header;
