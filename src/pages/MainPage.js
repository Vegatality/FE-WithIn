import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import { MainProfileList } from "../components/MainPage/MainProfileList";
import { MainProfileCard } from "../components/MainPage/MainProfileCard";
import { EventSection } from "../components/MainPage/EventSection";
import { EventSectionCard } from "../components/MainPage/EventSectionCard";
import { useDispatch, useSelector } from "react-redux";
import { EventGridSection } from "../components/MainPage/EventGridSection";
import { EventGridCard } from "../components/MainPage/EventGridCard";
import { useQuery } from "react-query";
import { getBoardList, getBoardProfileList } from "../api/getBoardList";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { SET_PAGES } from "../redux/modules/pageSlice";
import axios from "axios";

export const MainPage = () => {
    const [ModalComponent, openModal, closeModal] = useModal();
    const [memberCard, setMemberCard] = useState(0);
    const [rank, setRank] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const { totalPages, pages } = useSelector((store) => store.pageSlice);
    const dispatch = useDispatch();

    // const [profileList, setProfileList] = useState({1:{5개},2:{5개}, 3:{6개}}) if (profileList[1])

    /* 확인사항 */
    // 1.  1페이지에서 콘텐츠를 한 개 삭제를 했을 때 서버에서 2페이지에 있던 콘텐츠 하나가 1페이지로 끌어올려져서 다시
    //     1페이지가 6개가 되는지.
    // 2. 이게 되면 GOOD. 그냥 삭제했을 때 refetch && axios를 통해서 불러오면 됨. 다시 1페이지는 6개가 될 것임. 그러면 최신화가 된다!
    // 3. 댓글이 최신순이 아님... sort 해달라 해야 함.
    // 4. comment 정보의 userId 가 필요함. 왜냐하면 (댓글)userProfile 자리에 이미지를 불러와야 하기 때문.
    // 5. (마이페이지 조회) 누구나 프로필 개별 조회 가능하게 해야 함.

    // const getMoreBoardListHandler = (currentPage, totalPages, totalElements ) => {
    //     let pageNum;
    //     let actTime = 0;
    //     const current = localStorage.getItem("currentPage")? localStorage.getItem("currentPage") : 0
    //     if(total)
    //     localStorage.setItem("currentPage", currentPage)
    // };

    // const [list, setList] = useState([
    //     {
    //         boardId: 1,
    //         comment: [1],
    //         createdTime: "2023-05-10",
    //         congratulationCnt: 1,
    //         likeCnt: 0,
    //         sadCnt: 1,
    //         title: "somethingasfdadsfasdfasdfadsfaf",
    //         image: null,
    //         // contents={ele.contents}
    //     },
    //     {
    //         boardId: 2,
    //         comment: [1, 2],
    //         createdTime: "2023-05-10",
    //         congratulationCnt: 2,
    //         likeCnt: 2,
    //         sadCnt: 2,
    //         title: "something2",
    //         image: null,
    //         // contents={ele.contents}
    //     },
    //     {
    //         boardId: 3,
    //         comment: [1, 2, 3],
    //         createdTime: "2023-05-10",
    //         congratulationCnt: 3,
    //         likeCnt: 3,
    //         sadCnt: 3,
    //         title: "something3",
    //         image: null,
    //         // contents={ele.contents}
    //     },
    //     {
    //         boardId: 3,
    //         comment: [1, 2, 3],
    //         createdTime: "2023-05-10",
    //         congratulationCnt: 3,
    //         likeCnt: 3,
    //         sadCnt: 3,
    //         title: "something3",
    //         image: null,
    //         // contents={ele.contents}
    //     },
    //     {
    //         boardId: 3,
    //         comment: [1, 2, 3],
    //         createdTime: "2023-05-10",
    //         congratulationCnt: 3,
    //         likeCnt: 3,
    //         sadCnt: 3,
    //         title: "something3",
    //         image: null,
    //         // contents={ele.contents}
    //     },
    //     {
    //         boardId: 3,
    //         comment: [1, 2, 3],
    //         createdTime: "2023-05-10",
    //         congratulationCnt: 3,
    //         likeCnt: 3,
    //         sadCnt: 3,
    //         title: "something3",
    //         image: null,
    //         // contents={ele.contents}
    //     },
    // ]);

    const { role } = useSelector((store) => store.auth);

    // const navigate = useNavigate();
    // const token = Cookies.get("access");
    const query1 = useQuery("profile", () => getBoardProfileList(), {
        refetchOnWindowFocus: false,
    });
    const { isLoading, isError, data, error } = useQuery(
        "board",
        () => getBoardList(),
        {
            // enabled: !!token,
            retry: false,
            refetchOnWindowFocus: false,
            // staleTime: 600 * 1000,
        }
    );

    /* 굳이 없어도 Router에서 처리 해주게 의존성 배열에 넣었음. */

    if (query1.isLoading || isLoading) {
        return <h1>페이지를 불러오는 중입니다!</h1>;
    }

    if (query1.isError || isError) {
        console.log(error);
        return <h1>페이지 로딩에 실패하였습니다...</h1>;
    }

    /* 카테고리 필터 */
    /* 왜 여기다가 넣어야 하는지 모르겠다.... */
    // if (token) {
    //     setRank(auth);
    // }
    const profiledata = query1.data;
    console.log("profile Data >>> ", profiledata);
    console.log("data >>> ", data);
    console.log("data.data.content >>> ", data.data.content);
    // const { content } = data.data;
    /* 페이지 불러온 저장하기 */
    /* 마지막 페이지는 totalPages보다 1 작아야 함. */
    // dispatch(SET_PAGES({totalPages: data.data.totalPages, currentPage: data.data.number}))

    const eventCards = data.data.content.filter(
        (ele) => ele.category === "Event"
    );
    const goodByeCards = data.data.content.filter(
        (ele) => ele.category === "Goodbye"
    );

    const postBoard = async (data) => {
        const token = Cookies.get("access");
        const stringifiedData = JSON.stringify(data);
        const response = await axios.post(
            `${process.env.REACT_APP_TEST_SERVER_URL}/boards`,
            stringifiedData,
            { headers: { authorization: `Bearer ${token}` } }
        );
        console.log("board data sent", response.data);
    };
    const handleSave = (data) => {
        postBoard(data);
        // console.log(data);
        closeModal();
    };

    return (
        <div className="p-4 bg-transparent">
            <MainProfileList>
                <MainProfileCard />
            </MainProfileList>
            <ModalComponent onSave={handleSave} />
            {role === "ADMIN" ? (
                <div className="flex flex-row justify-end items-center mt-6">
                    <button
                        className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer"
                        onClick={openModal}
                    >
                        모달버튼
                    </button>
                </div>
            ) : null}
            <div className="flex flex-col gap-8 p-2">
                <EventGridSection name="Event">
                    {eventCards.map((ele) => {
                        return (
                            <EventGridCard
                                key={ele.boardId}
                                title={ele.title}
                                image={ele.image}
                                createdTime={ele.createdTime}
                                likeCnt={ele.likeCnt}
                                sadCnt={ele.sadCnt}
                                congratulationCnt={ele.congratulationCnt}
                                commentLength={
                                    ele.comment
                                        ? ele.commentResponseDtoList.length
                                        : 0
                                }
                            />
                        );
                    })}
                </EventGridSection>
                <EventGridSection name="Goodbye">
                    {goodByeCards.map((ele) => {
                        return (
                            <EventGridCard
                                key={ele.boardId}
                                title={ele.title}
                                image={ele.image}
                                createdTime={ele.createdTime}
                                likeCnt={ele.likeCnt}
                                sadCnt={ele.sadCnt}
                                congratulationCnt={ele.congratulationCnt}
                                commentLength={
                                    ele.comment ? ele.comment.length : 0
                                }
                            />
                        );
                    })}
                </EventGridSection>
            </div>
        </div>
    );
};

/* 배포 코드 */

//     return (
//         <div className="p-4 bg-backgroundPurple ">
//             <ModalComponent onSave={handleSave} />
//             <MainProfileList>
//                 <MainProfileCard />
//             </MainProfileList>
//             {auth === "ADMIN" ? (
//                 <div className="flex flex-row justify-end items-center mt-6">
//                     <button
//                         className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer"
//                         onClick={openModal}
//                     >
//                         모달버튼
//                     </button>
//                 </div>
//             ) : null}
//             <div className="flex flex-row gap-16 p-2">
//                 {/* <EventSection name="section1">
//             <EventSectionCard>test</EventSectionCard>
//             <EventSectionCard>test</EventSectionCard>
//             <EventSectionCard>test</EventSectionCard>
//             <EventSectionCard>test</EventSectionCard>
//         </EventSection> */}

//                 <EventGridSection name="section1">
//                     {eventCards &&
//                         eventCards.map((ele) => (
//                             <EventGridCard
//                                 key={ele.boardId}
//                                 commentLength={ele.comment.length}
//                                 createdTime={ele.createdTime}
//                                 congratulationCnt={ele.congratulationCnt}
//                                 likeCnt={ele.likeCnt}
//                                 sadCnt={ele.sadCnt}
//                                 title={ele.title}
//                                 contents={ele.contents}
//                             />
//                         ))}
//                 </EventGridSection>
//                 <EventGridSection name="section2">
//                     {goodByeCards &&
//                         goodByeCards.map((ele) => (
//                             <EventGridCard
//                                 key={ele.boardId}
//                                 commentLength={ele.comment.length}
//                                 createdTime={ele.createdTime}
//                                 congratulationCnt={ele.congratulationCnt}
//                                 likeCnt={ele.likeCnt}
//                                 sadCnt={ele.sadCnt}
//                                 title={ele.title}
//                                 contents={ele.contents}
//                             />
//                         ))}
//                 </EventGridSection>
//             </div>
//         </div>
//     );
// };

// 테스트 코드

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
