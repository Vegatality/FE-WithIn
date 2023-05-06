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
        <div class="flex justify-center mx-auto max-w-7xl bg-mainPurple w-screen rounded-b">
            <div class="flex flex-row w-full  mx-3 justify-between h-20 items-center text-white font-extrabold">
                <div>WithIn 아이콘</div>
                <div class="cursor-pointer" onClick={moveToHome}>
                    Home
                </div>
                <div class="cursor-pointer" onClick={moveToLogin}>
                    Login/Signup
                </div>
            </div>
        </div>
    );
}

export default Header;
