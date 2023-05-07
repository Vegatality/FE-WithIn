import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { signInDb } from "../api/auth";
import jwtDecode from "jwt-decode";
import { Cookies } from "js-cookie";
import { AuthenticationInputCard } from "../components/assets/InputField";

export const Login = () => {
    const navigate = useNavigate();
    const moveToSignup = () => {
        navigate("/signup");
    };
    const moveToMyPage = () => {
        navigate("/mypage");
    };

    // const [isMember, setIsMember] = useState(true);
    // const [isRegistering, setIsRegistering] = useState(false);
    const [inputs, setInputChange, onClearInput] = useInput({
        email: "",
        password: "",
    });
    // const [isError, setIsError] = useState({
    //     error: false,
    //     message: "",
    // });

    // -------------------------------------------SignIn---------------------------

    const dispatch = useDispatch();

    const mutate2 = useMutation(signInDb, {
        onMutate: () => {
            //mutationFunction인 signIndb가 실행되기 전에 실행. mutationFunc가 받을 동일한 변수가 전달됨.
            console.log("useMutation의 onMutate");
        },
        onSuccess: (data) => {
            onClearInput();
            console.log("useMutation의 onSuccess");
            console.log("data : ", data);
            moveToMyPage();
            // const { token } = data.data;
            // // console.log(jwtDecode(token)); // {id: 'gkdgo99', iat: 1683075561, exp: 1683079161}  두 번째는 발급시간, 세 번째는 유효기간
            // const decodedToken = jwtDecode(token);
            // const { id, exp } = decodedToken;

            // // path (string) : 쿠키 경로, / 모든 경로 페이지에서 쿠키에 액세스할 수 있도록 하려면 경로로 사용
            // // expires (Date) : 쿠키의 절대 만료 날짜
            // // maxAge (number) : 클라이언트가 쿠키를 수신한 시점부터 쿠키의 상대적인 최대 수명(초)
            // // secure (boolean) : HTTPS를 통해서만 액세스할 수 있습니까?

            // ⭐JSCookie
            // Cookies.set("쿠키이름", "토큰 그 자체", {
            //     expires: "Date변수",
            // })  //쿠키에 저장.

            // const expireDate = new Date(exp * 1000); // 날짜단위로 변환해서 넣기.

            // cookie.set("todos", token, {
            //     path: "/",
            //     // secure: "/",
            //     expires: expireDate,
            //     // expires: 3000,
            //     // maxAge: 500, // maxAge는 숫자 1이 1초
            //     // expires: new Date().getMinutes() + 1,
            // });
            // // setIsError({ error: false, message: "" });
            // // dispatch(SET_TOKEN({ authenticated: true, userId: id }));
            // // loginComplete();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const onLoginHandler = () => {
        if (inputs.id !== "" && inputs.password !== "") {
            // mutate2.mutate(inputs);
            mutate2.mutate(inputs);
        } else {
            console.log(inputs);
            alert("공백은 불가능합니다!");
        }
        // if (inputs.id === "" || inputs.password === "") {
        //     alert("공백은 불가능합니다!");
    };

    return (
        <div className="flex justify-center">
            <div className="rounded-md space-y-6 flex flex-col items-center w-full max-w-xl bg-backgroundPurple py-16 parent text-commomTextColor">
                <div className="text-4xl mb-5 text-commomTextColor font-bold">
                    LOGIN
                </div>
                <AuthenticationInputCard
                    value={inputs.email}
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    onChangeHandler={setInputChange}
                    title="Email"
                    onClearHandler={onClearInput}
                />
                <AuthenticationInputCard
                    value={inputs.password}
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    onChangeHandler={setInputChange}
                    title="Password"
                    onClearHandler={onClearInput}
                />
                <div className="w-2/3 p-3 px-4 rounded-md">
                    <button
                        onClick={onLoginHandler}
                        className="text-lg font-bold text-white bg-buttonPurple cursor-pointer py-2.5 px-3.5 w-full rounded-md hover:bg-[#826b99] transition duration-300 shadow-md"
                    >
                        Login
                    </button>
                </div>
                <div className="text-lg text-questionTextGray my-2">
                    아직 계정이 없으신가요?{" "}
                    <span
                        className="text-textPurple cursor-pointer"
                        onClick={moveToSignup}
                    >
                        회원가입
                    </span>
                </div>
            </div>
        </div>
    );
};
