import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_TOKEN } from "../redux/modules/authSlice";

function Header() {
    const [headerUserName, setHeaderUserName] = useState({
        role: "회원",
        name: "Jason",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userName, role } = useSelector((store) => store.auth);
    const [memberOption, setMemberOption] = useState(false);

    const moveToLogin = () => {
        navigate("/login");
    };

    const moveToHome = () => {
        navigate("/");
    };

    const moveToMyPage = () => {
        navigate("/mypage");
    };

    const logOutHandler = () => {
        Cookies.remove("access");
        dispatch(DELETE_TOKEN());
        navigate("/login");
        alert("로그아웃 완료");
    };

    const { pathname } = useLocation();

    const getHeaderPageName = () => {
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

    useEffect(() => {
        // userName 넘겨주면 이거로 갈아끼우면 됨.
        // const { auth, name } = jwtDecode(user)
        // setHeaderUserName(name)
        if (userName) {
            if (role === "USER") {
                setHeaderUserName({ role: "회원", name: userName });
            } else {
                setHeaderUserName({ role: "관리자", name: userName });
            }
        }

        /* 아무 창에서 logout 했을 때 로그아웃 selector 남아있는 현상 해결 */
        if (!userName) {
            setMemberOption(false);
        }
        /* 그냥 빈 배열을 주면 header는 맨 처음에 마운팅 된 이후로는 재렌더링 때 값을 useEffect문을 실행시키지 않으므로
        로그인 페이지(Header 마운팅)에서 로그인하고 cookie 값이 들어올 때 바뀌도록 의존성 배열값에 getCookie를 넣어준다. header 우상단 내용 바꿔줌. */
    }, [userName]);

    return (
        <div className="flex justify-center relative    mx-auto max-w-7xl min-w-[800px] w-screen    bg-mainPurple  rounded-b-lg shadow-md">
            <div className="flex flex-row justify-between items-center relative w-full mx-5 h-16  pr-2    font-extrabold parent text-white  z-10">
                <img
                    src="/images/white.png"
                    className="h-12 cursor-pointer"
                    alt="photoThumb"
                    onClick={moveToHome}
                />
                <div className="text-xl absolute  left-1/2 -translate-x-2/4">
                    {getHeaderPageName()}
                </div>
                {userName ? (
                    <div className="flex row gap-2.5">
                        <span className="text-sm">{headerUserName.role}</span>
                        <span className="text-sm">{headerUserName.name}</span>
                        <div className="bg-backgroundPurple rounded-full">
                            <CgProfile
                                className="text-2xl text-textPurple cursor-pointer"
                                onClick={() => setMemberOption(!memberOption)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex row gap-2.5">
                        <div className="cursor-pointer" onClick={moveToLogin}>
                            Login
                        </div>
                    </div>
                )}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-25 rounded-b-lg"></div>
            {memberOption && (
                <div className="flex flex-col  absolute top-12 right-5 w-36 h-20  bg-white rounded-md overflow-hidde">
                    <div
                        className="flex flex-row justify-start items-center h-1/2 pl-4 gap-3 rounded-md text-textPurple  hover:bg-mainPurple hover:text-white cursor-pointer"
                        onClick={logOutHandler}
                    >
                        <AiOutlineLogout className="text-2xl" />
                        <div>Logout</div>
                    </div>
                    <div
                        className="flex flex-row justify-start items-center h-1/2 pl-4 gap-3 rounded-md text-textPurple  hover:bg-mainPurple hover:text-white cursor-pointer"
                        onClick={moveToMyPage}
                    >
                        <ImProfile className="text-xl" />
                        <div>Mypage</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
