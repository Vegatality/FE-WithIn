import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useModal from "../hooks/useModal";
import { MainProfileList } from "../components/MainPage/MainProfileList";
import { MainProfileCard } from "../components/MainPage/MainProfileCard";
import { EventSection } from "../components/MainPage/EventSection";
import { EventSectionCard } from "../components/MainPage/EventSectionCard";
import { useSelector } from "react-redux";
import { EventGridSection } from "../components/MainPage/EventGridSection";
import { EventGridCard } from "../components/MainPage/EventGridCard";
import { useQuery } from "react-query";
import { getBoardList } from "../api/getBoardList";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
    const [list, setList] = useState([
        {
            boardId: 1,
            commentLength: 1,
            createdTime: "2023-05-10",
            congratulationCnt: 1,
            likeCnt: 1,
            sadCnt: 1,
            title: "something",
            image: "nothing",
            // contents={ele.contents}
        },
        {
            boardId: 2,
            commentLength: 2,
            createdTime: "2023-05-10",
            congratulationCnt: 2,
            likeCnt: 2,
            sadCnt: 2,
            title: "something2",
            image: "nothing",
            // contents={ele.contents}
        },
        {
            boardId: 3,
            commentLength: 3,
            createdTime: "2023-05-10",
            congratulationCnt: 3,
            likeCnt: 3,
            sadCnt: 3,
            title: "something3",
            image: "nothing",
            // contents={ele.contents}
        },
    ]);

    // const { role } = useSelector((store) => store.auth);
    // console.log(role);

    /* const navigate = useNavigate();
    const token = Cookies.get("access");

    const { isLoading, isError, data, error } = useQuery("auth", getBoardList); */

    // const { isLoading, isError, data, error } = useQuery("auth", getBoardList, {
    //     // enabled: !!token,
    //     retry: false,
    //     refetchOnWindowFocus: true,
    //     staleTime: 600 * 1000,
    // });

    /* 굳이 없어도 Router에서 처리 해주게 의존성 배열에 넣었음. */

    /*  if (isLoading) {
        if (!token) {
            alert("토큰이 만료되었습니다. 로그인을 다시 해주세요.");
            navigate("/login");
            return;
        }
        return <h1>페이지를 불러오는 중입니다!</h1>;
    }

    if (isError) {
        console.log(error);
        return <h1>페이지 로딩에 실패하였습니다...</h1>;
    }

    const { auth } = jwtDecode(token);
    console.log("data >>> ", data); */

    /*  console.log("data.data.content >>> ", data.data.content);
    const { content } = data.data;
    console.log(content); */

    /* 카테고리가 지금은 없어서 이거 나중에 주석 풀어야 함. */
    // const eventCards = content.filter((ele) => ele.category === "event");
    // const eventCards = content.filter((ele) => ele.category === "category");
    // const goodByeCards = content.filter((ele) => ele.category === "goodbye");

    // useEffect(() => {
    //     if (role === "ADMIN") {
    //         setIsAdmin(role);
    //     }
    // }, [role]);

    /* category는 두 개만 입력가능하게 제한 */
    // 게시글 나누도록 조건문 : event, goodbye

    return (
        <div className="p-4 bg-backgroundPurple ">
            <MainProfileList>
                <MainProfileCard />
            </MainProfileList>
            {/* {auth === "ADMIN" ? (
                <div className="flex flex-row justify-end items-center mt-6">
                    <button className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer">
                        모달버튼
                    </button>
                </div>
            ) : null} */}
            <div className="flex flex-row justify-end items-center mt-6">
                <button className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer">
                    모달버튼
                </button>
            </div>
            <div className="flex flex-col gap-16 p-2">
                <EventGridSection name="event">
                    {list.map((ele) => {
                        return (
                            <EventGridCard
                                key={ele.boardId}
                                commentLength={ele.commentLength}
                                createdTime={ele.createdTime}
                                congratulationCnt={ele.congratulationCnt}
                                likeCnt={ele.likeCnt}
                                sadCnt={ele.sadCnt}
                                title={ele.title}
                                image={ele.image}
                            />
                        );
                    })}
                </EventGridSection>
                <EventGridSection name="goodbye">
                    {list.map((ele) => {
                        return (
                            <EventGridCard
                                key={ele.boardId}
                                commentLength={ele.commentLength}
                                createdTime={ele.createdTime}
                                congratulationCnt={ele.congratulationCnt}
                                likeCnt={ele.likeCnt}
                                sadCnt={ele.sadCnt}
                                title={ele.title}
                                image={ele.image}
                            />
                        );
                    })}
                </EventGridSection>

                {/* <EventGridSection name="section1">
                    {eventCards &&
                        eventCards.map((ele) => (
                            <EventGridCard
                                key={ele.boardId}
                                commentLength={ele.comment.length}
                                createdTime={ele.createdTime}
                                congratulationCnt={ele.congratulationCnt}
                                likeCnt={ele.likeCnt}
                                sadCnt={ele.sadCnt}
                                title={ele.title}
                                contents={ele.contents}
                            />
                        ))}
                </EventGridSection>
                <EventGridSection name="section2">
                    {goodByeCards &&
                        goodByeCards.map((ele) => (
                            <EventGridCard
                                key={ele.boardId}
                                commentLength={ele.comment.length}
                                createdTime={ele.createdTime}
                                congratulationCnt={ele.congratulationCnt}
                                likeCnt={ele.likeCnt}
                                sadCnt={ele.sadCnt}
                                title={ele.title}
                                contents={ele.contents}
                            />
                        ))}
                </EventGridSection> */}
            </div>
        </div>

        // <div className="p-4 bg-backgroundPurple ">
        //     <MainProfileList>
        //         <MainProfileCard />
        //     </MainProfileList>
        //     {/* {auth === "ADMIN" ? (
        //         <div className="flex flex-row justify-end items-center mt-6">
        //             <button className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer">
        //                 모달버튼
        //             </button>
        //         </div>
        //     ) : null} */}
        //     <div className="flex flex-row justify-end items-center mt-6">
        //         <button className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer">
        //             모달버튼
        //         </button>
        //     </div>
        //     <div className="flex flex-row gap-16 p-2">
        //         <EventGridSection name="event">
        //             {list.map((ele) => {
        //                 return (
        //                     <EventGridCard
        //                         key={ele.boardId}
        //                         commentLength={ele.commentLength}
        //                         createdTime={ele.createdTime}
        //                         congratulationCnt={ele.congratulationCnt}
        //                         likeCnt={ele.likeCnt}
        //                         sadCnt={ele.sadCnt}
        //                         title={ele.title}
        //                         image={ele.image}
        //                     />
        //                 );
        //             })}
        //         </EventGridSection>

        //         {/* <EventGridSection name="section1">
        //             {eventCards &&
        //                 eventCards.map((ele) => (
        //                     <EventGridCard
        //                         key={ele.boardId}
        //                         commentLength={ele.comment.length}
        //                         createdTime={ele.createdTime}
        //                         congratulationCnt={ele.congratulationCnt}
        //                         likeCnt={ele.likeCnt}
        //                         sadCnt={ele.sadCnt}
        //                         title={ele.title}
        //                         contents={ele.contents}
        //                     />
        //                 ))}
        //         </EventGridSection>
        //         <EventGridSection name="section2">
        //             {goodByeCards &&
        //                 goodByeCards.map((ele) => (
        //                     <EventGridCard
        //                         key={ele.boardId}
        //                         commentLength={ele.comment.length}
        //                         createdTime={ele.createdTime}
        //                         congratulationCnt={ele.congratulationCnt}
        //                         likeCnt={ele.likeCnt}
        //                         sadCnt={ele.sadCnt}
        //                         title={ele.title}
        //                         contents={ele.contents}
        //                     />
        //                 ))}
        //         </EventGridSection> */}
        //     </div>
        // </div>
    );
};
