import React from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const movetoSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="flex justify-center">
            <div className="rounded-md space-y-6 flex flex-col items-center w-full max-w-xl bg-backgroundPurple py-16 parent text-commomTextColor">
                <div className="text-4xl mb-5 text-commomTextColor font-bold">
                    LOGIN
                </div>
                <div className="w-full  px-6  flex flex-col items-center">
                    <div className="w-2/3 flex items-center justify-between ml-5">
                        <div className="text-lg text-commomTextColor font-bold self-start mb-1">
                            Username
                        </div>
                    </div>
                    <input
                        className="w-2/3 p-3 rounded-md"
                        type="text"
                        placeholder="이름을 입력해주세요"
                    />
                </div>
                <div className="w-full  px-6  flex flex-col items-center">
                    <div className="w-2/3 flex items-center justify-between ml-5">
                        <div className="text-lg text-commomTextColor font-bold self-start mb-1">
                            Password
                        </div>
                    </div>
                    <input
                        className="w-2/3 p-3 rounded-md"
                        type="password"
                        autoComplete="on"
                        placeholder="비밀번호를 입력해주세요"
                    />
                </div>
                <div className="w-1/3">
                    <button className="text-lg font-bold text-white bg-buttonPurple cursor-pointer py-2.5 px-3.5 w-full rounded-md hover:bg-[#cba6f0] transition duration-300">
                        Login
                    </button>
                </div>
                <div className="text-lg text-questionTextGray my-2">
                    아직 계정이 없으신가요?{" "}
                    <span
                        className="text-textPurple cursor-pointer"
                        onClick={movetoSignup}
                    >
                        회원가입
                    </span>
                </div>
            </div>
        </div>
    );
};
