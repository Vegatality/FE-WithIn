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
import { dateConvert } from "../components/util/dateConvert";

export const MainPage = () => {
  const [ModalComponent, openModal, closeModal] = useModal();
  // const { role } = useSelector((store) => store.auth);
  // console.log(role);
  const token = Cookies.get("access");
  const { isLoading, isError, data, error } = useQuery("auth", getBoardList, {
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 60 * 1000,
  });

  /* 굳이 없어도 Router에서 처리 해주게 의존성 배열에 넣었음. */
  // if (!token) {
  //     alert("토큰이 만료되었습니다. 로그인을 다시 해주세요.");
  //     navigate("/login");
  //     return;
  // }

  if (isLoading) {
    return <h1>페이지를 불러오는 중입니다!</h1>;
  }

  if (isError) {
    alert(error);
  }

  console.log(dateConvert("2023-05-10T00:36:14.446844"));
  const { auth } = jwtDecode(token);
  console.log("data >>> ", data);
  console.log("data.data.content >>> ", data.data.content);
  const { content } = data.data;
  const eventCards = content.filter((ele) => ele.category === "event");
  const goodByeCards = content.filter((ele) => ele.category === "event");

  // const getUserList = async () => {
  //     const response = await axios.get("/members");
  //     console.log("user list", response.data);
  // };
  // const getBoardList = async () => {
  //     const response = await axios.get("/boards");
  //     console.log("board list", response.data);
  // };
  // const getOneUserList = async () => {
  //     const response = await axios.get("/members/1");
  //     console.log("user", response.data);
  // };
  // getUserList();
  // getOneUserList();
  // getBoardList();

  // useEffect(() => {
  //     if (role === "ADMIN") {
  //         setIsAdmin(role);
  //     }
  // }, [role]);

  /* category는 두 개만 입력가능하게 제한 */
  // 게시글 나누도록 조건문 : event, goodbye

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
          {eventCards.map((ele) => (
            <EventGridCard
              key={ele.boardId}
              commentLength={ele.comment.length}
              createdAt={ele.comment.createdAt}
              congratulationCnt={ele.congratulationCnt}
              likeCnt={ele.likeCnt}
              sadCnt={ele.sadCnt}
              title={ele.title}
            />
          ))}
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
        </EventGridSection>
        <EventGridSection name="section2">
          {goodByeCards.map((ele) => (
            <EventGridCard key={ele.boardId}>test</EventGridCard>
          ))}
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
          <EventGridCard>test</EventGridCard>
        </EventGridSection>
      </div>
    </div>
  );
};
