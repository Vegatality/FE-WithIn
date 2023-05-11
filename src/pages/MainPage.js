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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

export const MainPage = () => {
  const [ModalComponent, openModal, closeModal] = useModal();
  const [memberCard, setMemberCard] = useState(0);
  const [rank, setRank] = useState("");

  //   const { totalPages, pages } = useSelector((store) => store.pageSlice);
  //   const dispatch = useDispatch();

  // const [profileList, setProfileList] = useState({1:{5개},2:{5개}, 3:{6개}}) if (profileList[1])
  //   const [profileList, setProfileList] = useState({});
  //   const [boardList, setBoardList] = useState({});
  const [profileList, setProfileList] = useState([]);
  const [boardList, setBoardList] = useState({});

  const [showSixProfiles, setShowSixProfiles] = useState([]);
  const [showSixBoards, setShowSixBoards] = useState([]);
  /* current page number handler */
  const [profilePageNum, setProfilePageNum] = useState(0);
  const [boardPageNum, setBoardPageNum] = useState(0);

  const [toggle, setToggle] = useState(true);

  /* 확인사항 */
  // 1.  1페이지에서 콘텐츠를 한 개 삭제를 했을 때 서버에서 2페이지에 있던 콘텐츠 하나가 1페이지로 끌어올려져서 다시
  //     1페이지가 6개가 되는지.
  // 2. 이게 되면 GOOD. 그냥 삭제했을 때 refetch && axios를 통해서 불러오면 됨. 다시 1페이지는 6개가 될 것임. 그러면 최신화가 된다!
  // 3. 댓글이 최신순이 아님... sort 해달라 해야 함.
  // 4. comment 정보의 userId 가 필요함. 왜냐하면 (댓글)userProfile 자리에 이미지를 불러와야 하기 때문.
  // 5. (마이페이지 조회) 누구나 프로필 개별 조회 가능하게 해야 함.

  const { role } = useSelector((store) => store.auth);

  const [totalProfilesPages, setTotalProfilesPages] = useState();
  const [totalBoardsPages, setTotalBoardsPages] = useState();
  const getProfileList = async () => {
    if (!profileList[profilePageNum]) {
      const token = Cookies.get("access");
      const response = await axios.get(`${process.env.REACT_APP_TEST_SERVER_URL}/members?page=${profilePageNum}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      // console.log("profile >>> ", response.data);
      setTotalProfilesPages(response.data.totalPages);
      setProfileList((previousProfiles) => ({ ...previousProfiles, [profilePageNum]: response.data.content }));
      setShowSixProfiles(response.data.content);
    } else {
      setShowSixProfiles(profileList[profilePageNum]);
    }

    //   console.log("response", response);
    // return response;
  };
  const { data } = useQuery("boardList", getProfileList, {
    refetchOnWindowFocus: false,
    // staleTime: 600 * 1000,
  });

  const getBoardList = async () => {
    if (!boardList[boardPageNum]) {
      const token = Cookies.get("access");
      const response = await axios.get(`${process.env.REACT_APP_TEST_SERVER_URL}/boards?page=${boardPageNum}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setTotalBoardsPages(response.data.totalPages);
      setBoardList((previousBoard) => ({ ...previousBoard, [boardPageNum]: response.data.content }));
      setShowSixBoards(response.data.content);
      // console.log(response);
    } else {
      setShowSixBoards(boardList[boardPageNum]);
    }
    //   console.log("response", response);
    // return response;
  };

  useEffect(() => {
    getProfileList();
  }, [profilePageNum]);

  useEffect(() => {
    getBoardList();
  }, [boardPageNum, toggle]);

  /* profile */
  const movePrevProfilePage = () => {
    if (profilePageNum === 0) {
      alert("처음 페이지입니다.");
      return;
    }
    setProfilePageNum(profilePageNum - 1);
  };

  const moveNextProfilePage = () => {
    /* totalProfilePageNum은 Page Count*/
    /* profilePageNum은 Page Index */
    if (totalProfilesPages === profilePageNum + 1) {
      alert("마지막 페이지입니다.");
      return;
    }
    setProfilePageNum(profilePageNum + 1);
  };

  /* board */
  const movePrevPage = () => {
    if (boardPageNum === 0) {
      alert("처음 페이지입니다.");
      return;
    }
    setBoardPageNum(boardPageNum - 1);
  };

  const moveNextPage = () => {
    /* totalProfilePageNum은 Page Count*/
    /* profilePageNum은 Page Index */
    if (totalBoardsPages === boardPageNum + 1) {
      alert("마지막 페이지입니다.");
      return;
    }
    setBoardPageNum(boardPageNum + 1);
  };

  // ## CheckPoint ##
  const postBoard = async (data) => {
    const token = Cookies.get("access");
    // console.log("data", data);
    const response = await axios.post(`${process.env.REACT_APP_TEST_SERVER_URL}/boards`, data, {
      headers: { authorization: `Bearer ${token}` },
    });
    // console.log("board data sent", response.data);
  };
  const handleSave = async (data) => {
    await postBoard(data);
    setShowSixBoards([]);
    setBoardList({});
    setBoardPageNum(0);
    setToggle(!toggle);

    // console.log(data);
    closeModal();
  };

  return (
    <motion.div className="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="p-4 bg-transparent">
        <MainProfileList movePrevPage={movePrevProfilePage} moveNextPage={moveNextProfilePage}>
          {showSixProfiles.map((ele) => {
            return <MainProfileCard key={ele.userId} content={ele} />;
          })}
        </MainProfileList>

        <ModalComponent onSave={handleSave} />
        {/* {role === "ADMIN" ? (
        <div className="flex flex-row justify-end items-center mt-6">
          <button
            className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer"
            onClick={openModal}
          >
            모달버튼
          </button>
        </div>
      ) : null} */}
        <div className="flex flex-col gap-8 p-2">
          {/* 각 카테고리(Event, Goodbye)가 6개 미만이면 더 불러오게 하고 더 불러올 페이지(대상)이 없으면 더 없다고 알리고 멈춰야 함 */}
          <EventGridSection name="Event" role={role} openModal={openModal} movePrevPage={movePrevPage} moveNextPage={moveNextPage}>
            {showSixBoards.map((card) => {
              return (
                <EventGridCard
                  key={card.boardId}
                  boardId={card.boardId}
                  title={card.title}
                  image={card.image}
                  createdTime={card.createdTime}
                  likeCnt={card.likeCnt}
                  sadCnt={card.sadCnt}
                  congratulationCnt={card.congratulationCnt}
                  commentLength={card.commentResponseDtoList ? card.commentResponseDtoList.length : 0}
                  category={card.category}
                />
              );
            })}
          </EventGridSection>
        </div>
      </div>
    </motion.div>
  );
};

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
