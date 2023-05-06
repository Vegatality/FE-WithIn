import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signUpDb } from "../api/autth";
import { useInput } from "../hooks/useInput";
import { AuthenticationInputCard } from "../components/assets/InputField";

export const Signup = () => {
    const navigate = useNavigate();
    const movetoLogin = () => {
        navigate("/login");
    };
    const [isAdmin, setIsAdmin] = useState(false);
    const [inputs, onChangeHandler, onClearHandler] = useInput({
        username: "",
        email: "",
        password: "",
        admin: false,
        adminKey: "",
    });
    const [checkPassword, setCheckPassword, onClearCheckPassword] = useInput({
        password: "",
    });

    // ------------------------SignUP---------------------------
    // const queryClient = useQueryClient();
    const mutation = useMutation(signUpDb, {
        onSuccess: (data) => {
            console.log("회원가입 성공! >>> ", data); // 등록되면 true
            // setIsError({ error: false, message: "" });
            onClearHandler();

            // 회원가입 성공하면 로그인 창으로
            movetoLogin();

            setIsAdmin(false);
        },
        onError: (error) => {
            console.log(error);

            //developer 확인용 alert
            alert(error);
        },
    });

    const onResisterHandler = () => {
        // isAdmin 이 false 상태면 일반 회원 등록 모드
        if (isAdmin) {
            if (
                inputs.username === "" ||
                inputs.email === "" ||
                inputs.password === "" ||
                inputs.admin === "" ||
                inputs.adminKey === ""
            ) {
                //developer 확인용 alert
                console.log("admin mode");
                alert("공백은 만들 수 없습니다.");
                return;
            } else {
                mutation.mutate(inputs); // useMutation() onSuccess 로 옮김.
            }
        } else {
            if (
                inputs.username === "" ||
                inputs.email === "" ||
                inputs.password === "" ||
                inputs.admin === ""
            ) {
                //developer 확인용 alert
                console.log("user mode");
                alert("공백은 만들 수 없습니다.");
                return;
            } else {
                mutation.mutate(inputs); // useMutation() onSuccess 로 옮김.
            }
        }
    };

    return (
        <div className="flex  justify-center ">
            <div className="rounded-md space-y-6 flex flex-col items-center w-full max-w-xl bg-backgroundPurple py-16 parent text-commomTextColor">
                <div className="text-4xl mb-5 font-bold text-commomTextColor">
                    SIGN UP
                </div>
                <AuthenticationInputCard
                    inputs={inputs}
                    name="username"
                    placeholder="이름을 입력해주세요"
                    onChangeHandler={onChangeHandler}
                    title="Username"
                />

                <AuthenticationInputCard
                    inputs={inputs}
                    name="email"
                    placeholder="메일주소를 입력해주세요"
                    onChangeHandler={onChangeHandler}
                    title="E-mail"
                />
                <AuthenticationInputCard
                    inputs={inputs}
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    onChangeHandler={onChangeHandler}
                    title="Password"
                    type="password"
                />
                {/* <div className="w-full  px-6  flex flex-col items-center">
                    <div className="w-2/3 flex items-center justify-between ml-5">
                        <div className="text-lg font-bold self-start  mb-1">
                            Password
                        </div>
                    </div>
                    <input
                        className="w-2/3 p-3 rounded-md"
                        type="password"
                        autoComplete="on"
                        placeholder="비밀번호를 입력해주세요"
                        value={inputs.password}
                        onChange={onChangeHandler}
                    />
                </div> */}

                <AuthenticationInputCard
                    inputs={checkPassword}
                    name="password"
                    placeholder="비밀번호를 재입력 해주세요"
                    onChangeHandler={setCheckPassword}
                    title="Password 확인"
                    type="password"
                />

                {/* <div className="w-full  px-6  flex flex-col items-center">
                    <div className="w-2/3 flex items-center justify-between ml-5">
                        <div className="text-lg font-bold self-start mb-1">
                            Password 확인
                        </div>
                    </div>
                    <input
                        className="w-2/3 p-3 rounded-md"
                        type="password"
                        autoComplete="on"
                        placeholder="비밀번호를 재입력 해주세요"
                        value={checkPassword.password}
                        onChange={setCheckPassword}
                    />
                </div> */}
                {!isAdmin ? (
                    <div className="w-full  px-6  flex flex-col items-center">
                        <div className="text-lg text-questionTextGray my-2">
                            관리자이신가요?{" "}
                            <span
                                className="text-[#b185dd] cursor-pointer"
                                onClick={() => setIsAdmin(!isAdmin)}
                            >
                                Admin key 등록하기
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="w-full  px-6  flex flex-col items-center mx-auto ">
                        <div className="w-2/3 flex items-center justify-between ml-5 mb-1">
                            <div className="text-lg font-bold self-start ">
                                Admin Key&nbsp;
                            </div>
                            <span
                                className="mr-5 text-textPurple font-medium cursor-pointer"
                                onClick={() => setIsAdmin(!isAdmin)}
                            >
                                취소
                            </span>
                        </div>
                        <input
                            className="w-2/3 p-3 rounded-md"
                            type="password"
                            autoComplete="on"
                            placeholder="admin key를 등록해주세요"
                            value={inputs.adminKey}
                            onChange={onChangeHandler}
                        />
                    </div>
                )}

                <div className=" w-1/3 ">
                    <button
                        className="text-lg font-bold text-white bg-buttonPurple cursor-pointer py-2.5 px-3.5 w-full rounded-md hover:bg-[#826b99] transition duration-300"
                        onClick={movetoLogin}
                    >
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
};
