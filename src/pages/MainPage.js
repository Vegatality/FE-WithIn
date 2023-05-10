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
    const [ModalComponent, openModal, closeModal] = useModal();
    const [memberCard, setMemberCard] = useState(0);

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

    const navigate = useNavigate();
    const token = Cookies.get("access");

    const { isLoading, isError, data, error } = useQuery("auth", getBoardList, {
        // enabled: !!token,
        retry: false,
        refetchOnWindowFocus: true,
        staleTime: 600 * 1000,
    });

    /* 굳이 없어도 Router에서 처리 해주게 의존성 배열에 넣었음. */

    if (isLoading) {
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
    console.log("data >>> ", data);
    console.log("data.data.content >>> ", data.data.content);
    const { content } = data.data;
    const eventCards = content.filter((ele) => ele.category === "event");
    const goodByeCards = content.filter((ele) => ele.category === "goodbye");

    // useEffect(() => {
    //     if (role === "ADMIN") {
    //         setIsAdmin(role);
    //     }
    // }, [role]);

    const postBoard = async (data) => {
        const stringifiedData = JSON.stringify(data);
        const response = await axios.post("/boards", stringifiedData);
        console.log("board data sent", response.data);
    };
    const handleSave = (data) => {
        postBoard(data);
        // console.log(data);
        closeModal();
    };

    return (
        <div className="p-4 bg-backgroundPurple ">
            <ModalComponent onSave={handleSave} />
            <MainProfileList>
                <MainProfileCard />
            </MainProfileList>
            {auth === "ADMIN" ? (
                <div className="flex flex-row justify-end items-center mt-6">
                    <button
                        className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer"
                        onClick={openModal}
                    >
                        모달버튼
                    </button>
                </div>
            ) : null}
            <div className="flex flex-row gap-16 p-2">
                {/* <EventSection name="section1">
            <EventSectionCard>test</EventSectionCard>
            <EventSectionCard>test</EventSectionCard>
            <EventSectionCard>test</EventSectionCard>
            <EventSectionCard>test</EventSectionCard>
        </EventSection> */}

                <EventGridSection name="section1">
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
                </EventGridSection>
            </div>
        </div>
    );
};

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

// return (
//     <div className="p-4 bg-backgroundPurple ">
//         <MainProfileList>
//             <MainProfileCard />
//         </MainProfileList>
//         {/* {auth === "ADMIN" ? (
//             <div className="flex flex-row justify-end items-center mt-6">
//                 <button className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer">
//                     모달버튼
//                 </button>
//             </div>
//         ) : null} */}
//         <div className="flex flex-row justify-end items-center mt-6">
//             <button className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer">
//                 모달버튼
//             </button>
//         </div>
//         <div className="flex flex-col gap-16 p-2">
//             <EventGridSection name="event">
//                 {list.map((ele) => {
//                     return (
//                         <EventGridCard
//                             key={ele.boardId}
//                             commentLength={ele.commentLength}
//                             createdTime={ele.createdTime}
//                             congratulationCnt={ele.congratulationCnt}
//                             likeCnt={ele.likeCnt}
//                             sadCnt={ele.sadCnt}
//                             title={ele.title}
//                             image={ele.image}
//                         />
//                     );
//                 })}
//             </EventGridSection>
//             <EventGridSection name="goodbye">
//                 {list.map((ele) => {
//                     return (
//                         <EventGridCard
//                             key={ele.boardId}
//                             commentLength={ele.commentLength}
//                             createdTime={ele.createdTime}
//                             congratulationCnt={ele.congratulationCnt}
//                             likeCnt={ele.likeCnt}
//                             sadCnt={ele.sadCnt}
//                             title={ele.title}
//                             image={ele.image}
//                         />
//                     );
//                 })}
//             </EventGridSection>
//         </div>
//     </div>
