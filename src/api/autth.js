import axios from "axios";
// import { cookie } from "utils/cookie";

// axios 전역 설정
// axios.defaults.withCredentials = true;

// 매 페이지마다 확인
const checkAuth = async () => {
    // const authToken = cookie.get("todos");
    const config = {
        headers: {
            // authorization: `Bearer ${authToken}`,
        },
    };

    const response = await axios.get(
        `${process.env.REACT_APP_TEST_SERVER_URL}/user`,
        config
    );
    return response;
};

// axios 옵션 객체로 넣기
const signUpDb = async (inputs) => {
    await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/signup`,
        inputs,
        {
            headers: {
                withCredentials: true, // 쿠키 cors 통신 설정
            },
        }
    );
};

const signInDb = async (inputs) => {
    const response = await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/login`,
        inputs,
        {
            headers: {
                withCredentials: true, // 쿠키 cors 통신 설정
            },
        }
    );
    return response;
};

export { signUpDb, signInDb, checkAuth };
