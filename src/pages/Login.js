import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { signInDb } from "../api/auth";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { AuthenticationInputCard } from "../components/assets/InputField";
import { SET_TOKEN } from "../redux/modules/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

export const Login = () => {
  // const [isError, setIsError] = useState({
  //     error: false,
  //     message: "",
  // });
  const [isMessage, setIsMessage] = useState(false);
  const [inputs, setInputChange, onClearInput] = useInput({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.userName);

  const moveToSignup = () => {
    navigate("/signup");
  };

  const moveToMainPage = () => {
    navigate("/");
  };

  // const onLoginHandler = async () => {
  //     if (inputs.id !== "" && inputs.password !== "") {
  //         const data = await signInDb(inputs);
  //         console.log(data);
  //         // moveToMainPage();
  //         onClearInput();

  //         /* 토큰 해체 및 쿠키에 저장. */
  //         const token = data.headers.authorization.split(" ")[1];

  //         /*  console.log(jwtDecode(token)); => {sub: 'as@gmail.com', auth: 'ADMIN' or 'USER', username: 'as', exp: 1683630156, iat: 1683626556} */
  //         const decodedToken = jwtDecode(token);
  //         console.log("디코드 정보:", decodedToken);
  //         const { sub, exp, auth, username, userId } = decodedToken;
  //         const expireDate = new Date(exp * 1000); // 날짜단위로 변환해서 넣기.
  //         Cookies.set("access", token, {
  //             expires: expireDate,
  //         });

  //         /*  Reducer 에서 토큰 관리할 것임. useName도 Page 넘어갈 때마다 useSelector로 받을 수 있게 넘기는 거
  //         페이지 넘어갈 때 Reducer에서 토큰 꺼내와서 살아있는지 확인할 거임. */
  //         dispatch(
  //             SET_TOKEN({
  //                 userName: username,
  //                 role: auth,
  //                 email: sub,
  //                 userId,
  //             })
  //         );
  //         // alert(`로그인 성공! 환영합니다 ${name}님`);
  //         // setIsError({ error: false, message: "" });

  //         // 페이지 이동
  //         // moveToMainPage();
  //     } else {
  //         // console.log(inputs);
  //         alert("공백은 불가능합니다!");
  //     }
  // };

  const onLoginHandler = () => {
    if (inputs.id !== "" && inputs.password !== "") {
      mutate2.mutate(inputs);
    } else {
      setIsMessage(true);
      toast.error("공백은 불가능합니다!", {
        position: toast.POSITION.TOP_CENTER,
        toastId: "empty-comment-toast",
      });
      // console.log(inputs);
      // alert("공백은 불가능합니다!");
    }
  };

  // -------------------------------------------SignIn---------------------------

  const mutate2 = useMutation(signInDb, {
    // onMutate: () => {
    //     //mutationFunction인 signIndb가 실행되기 전에 실행. mutationFunc가 받을 동일한 변수가 전달됨.
    //     // console.log("useMutation의 onMutate, 서버에 요청 시작합니다!");
    // },
    onSuccess: (data) => {
      /* 입력 초기화 */
      onClearInput();

      /* 토큰 해체 및 쿠키에 저장. */
      const token = data.headers.authorization.split(" ")[1];

      /*  console.log(jwtDecode(token)); => {sub: 'as@gmail.com', auth: 'ADMIN' or 'USER', username: 'as', exp: 1683630156, iat: 1683626556} */
      const decodedToken = jwtDecode(token);
      // console.log("디코드 정보:", decodedToken);
      const { sub, exp, auth, username, userId } = decodedToken;
      const expireDate = new Date(exp * 1000); // 날짜단위로 변환해서 넣기.
      Cookies.set("access", token, {
        expires: expireDate,
      });

      /*  Reducer 에서 토큰 관리할 것임. useName도 Page 넘어갈 때마다 useSelector로 받을 수 있게 넘기는 거
            페이지 넘어갈 때 Reducer에서 토큰 꺼내와서 살아있는지 확인할 거임. */
      dispatch(
        SET_TOKEN({
          userName: username,
          role: auth,
          email: sub,
          userId,
        })
      );
      setIsMessage(true);
      toast.success(`로그인 성공! 환영합니다 ${username}님`, {
        position: toast.POSITION.TOP_CENTER,
        toastId: "empty-comment-toast",
      });
      // alert(`로그인 성공! 환영합니다 ${name}님`);
      // setIsError({ error: false, message: "" });

      // 페이지 이동
      moveToMainPage();
    },
    onError: (error) => {
      console.log(error);
      setIsMessage(true);
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_CENTER,
        toastId: "empty-comment-toast",
      });
      // alert(error.data.message);
      // setIsError({ error: false, message: "" });
    },
  });

  useEffect(() => {
    if (userId) {
      // console.log("useEffect");
      navigate(-1);
    }
  }, []);

  return (
    <motion.div
      className="login"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center">
        {isMessage && <ToastContainer />}
        <div className="rounded-md space-y-6 flex flex-col items-center w-full max-w-xl bg-backgroundPurple py-16 parent text-commonTextColor">
          <div className="text-4xl mb-5 text-commonTextColor font-bold">LOGIN</div>
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
            type="password"
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
            <span className="text-textPurple cursor-pointer" onClick={moveToSignup}>
              회원가입
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
