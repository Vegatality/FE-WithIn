import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signUpDb } from "../api/auth";
import { useInput } from "../hooks/useInput";
import { AuthenticationInputCard } from "../components/assets/InputField";
import { HiLogin } from "react-icons/hi";
import { useSelector } from "react-redux";

export const Signup = () => {
  const navigate = useNavigate();
  const movetoLogin = () => {
    navigate("/login");
  };

  // 지금 문제가 다른 페이지에서 로그인 버튼을 눌렀을 때 로그인이 되어있는 상태임에도 불구하고
  // 로그인하라는 페이지로 이동함.
  console.log(
    "SignUp console:",
    useSelector((store) => store.auth.userName)
  );

  const userId = useSelector((store) => store.auth.userName);

  useEffect(() => {
    if (userId) {
      navigate(-1);
    }
  });

  const [isAdmin, setIsAdmin] = useState(false);

  // ## 정보 작성 ##
  const [inputs, onChangeHandler, onClearHandler, adminCancel] = useInput({
    username: "",
    email: "",
    password: "",
    admin: false,
    adminKey: "",
  });

  // ## 비밀번호 재확인 ##
  const [checkPassword, setCheckPassword, onClearCheckPassword] = useInput({
    password: "",
  });

  // --------------------------------------------- 취소 버튼 누르면 adminKey입력 해놓은 거 초기화 되게 설정----------------------------------------------------
  const adminCancelHandler = () => {
    adminCancel();
    setIsAdmin(false);
  };

  // ------------------------------------------------------------SignUP-----------------------------------------------------------------------------------
  // const queryClient = useQueryClient();
  const mutation = useMutation(signUpDb, {
    onSuccess: (data) => {
      // 데이터 받아오기
      console.log("회원가입 성공! >>> ", data); // 등록되면 true
      // setIsError({ error: false, message: "" });

      // 성공하면 전부 초기화
      onClearHandler();
      onClearCheckPassword();
      setIsAdmin(false);

      // 회원가입 성공하면 바로 로그인 창으로
      movetoLogin();
    },
    onError: (error) => {
      console.log(error);

      //developer 확인용 alert
      alert(error);
    },
  });

  const onResisterHandler = () => {
    // isAdmin 이 false 상태면 일반 회원 등록 모드
    const data = {
      ...inputs,
      admin: isAdmin,
    };
    console.log(data);

    if (isAdmin) {
      if (inputs.username === "" || inputs.email === "" || inputs.password === "" || inputs.adminKey === "") {
        //developer 확인용 alert
        console.log("admin mode");
        alert("공백은 만들 수 없습니다.");
        return;
      } else if (inputs.password !== checkPassword.password) {
        // developer 확인용.
        alert("비밀번호가 일치하지 않습니다!");
        return;
      } else {
        console.log("admin 데이터 전송");
        mutation.mutate(data);
      }
    } else {
      // 취소 눌렀을 때 adminkey 초기화 되게 해놔야 함.
      if (inputs.username === "" || inputs.email === "" || inputs.password === "") {
        //developer 확인용 alert
        console.log("user mode");
        alert("공백은 만들 수 없습니다.");
        return;
      } else if (inputs.password !== checkPassword.password) {
        // developer 확인용.
        alert("비밀번호가 일치하지 않습니다!");
        return;
      } else {
        console.log("user 데이터 전송");
        mutation.mutate(data); // useMutation() onSuccess 로 옮김.
      }
    }
  };

  return (
    <div className="flex  justify-center">
      <div className="rounded-md space-y-6 flex flex-col items-center w-full max-w-xl bg-backgroundPurple py-16 parent text-commonTextColor relative ">
        <HiLogin onClick={() => movetoLogin()} className="absolute top-5 left-5 text-3xl hover:text-textPurple" />
        <div className="text-4xl mb-5 font-bold text-commonTextColor">SIGN UP</div>

        <AuthenticationInputCard
          value={inputs.username}
          name="username"
          placeholder="이름을 입력해주세요"
          onChangeHandler={onChangeHandler}
          title="Username"
          onClearHandler={onClearHandler}
        />
        <AuthenticationInputCard
          value={inputs.email}
          name="email"
          placeholder="메일주소를 입력해주세요"
          onChangeHandler={onChangeHandler}
          title="E-mail"
        />
        <AuthenticationInputCard
          value={inputs.password}
          name="password"
          placeholder="비밀번호를 입력해주세요"
          onChangeHandler={onChangeHandler}
          title="Password"
          type="password"
        />
        <AuthenticationInputCard
          value={checkPassword.password}
          name="password"
          placeholder="비밀번호를 재입력 해주세요"
          onChangeHandler={setCheckPassword}
          title="Password 확인"
          type="password"
        />
        {!isAdmin ? (
          <div className="w-full  px-6  flex flex-col items-center">
            <div className="text-lg text-questionTextGray my-1">
              관리자이신가요?{" "}
              <span className="text-[#b185dd] cursor-pointer" onClick={() => setIsAdmin(!isAdmin)}>
                Admin key 등록하기
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full  px-6  flex flex-col items-center mx-auto ">
            <div className="w-2/3 flex items-center justify-between ml-5 mb-1">
              <div className="text-lg font-bold self-start ">Admin Key&nbsp;</div>
              <span className="mr-5 text-textPurple font-medium cursor-pointer" onClick={adminCancelHandler}>
                취소
              </span>
            </div>
            <input
              className="w-2/3 p-3 rounded-md"
              type="password"
              name="adminKey"
              placeholder="admin key를 등록해주세요"
              value={inputs.adminKey}
              onChange={onChangeHandler}
            />
          </div>
        )}
        <div className=" w-2/3 px-4">
          <button
            className="text-lg font-bold text-white bg-buttonPurple cursor-pointer py-2.5 px-3.5 w-full rounded-md hover:bg-[#826b99] transition duration-300 mb-1 shadow-md"
            onClick={onResisterHandler}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};
