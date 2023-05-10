import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { GiPartyPopper } from "react-icons/gi";
import { RiEmotionSadFill } from "react-icons/ri";

// 날짜 변환

export const EventGridCard = ({
    children,
    commentLength,
    createdTime,
    congratulationCnt,
    likeCnt,
    sadCnt,
    title,
}) => {
    const convertDate = (date) => {
        const cardDate = new Date(date);

        const year = cardDate.getFullYear();
        const month = cardDate.getMonth() + 1; // 월은 0부터 시작하기 때문에 1을 더함!
        const day = cardDate.getDate();
        const dayOfWeek = cardDate.toLocaleDateString("ko-KR", {
            weekday: "long",
        });
        const hour = cardDate.getHours();
        const minute = cardDate.getMinutes();

        return `${year}년 ${month}월 ${day}일 ${dayOfWeek} ${hour}:${minute}`;
    };
    const date = convertDate(createdTime);

    console.log(date, commentLength, congratulationCnt, likeCnt, sadCnt, title);

    return (
        <div className="flex flex-row justify-center items-center mx-auto rounded-md w-full h-24 border border-solid border-mainPurple bg-white">
            {/* <div className="grid grid-cols-5 auto-rows-[100px]"></div> */}
            {/* <div className="col-start-1 col-end-4"></div> */}
            <div>
                <span>{date}</span>
            </div>
            <div>{title}</div>
            {/* <div className="col-start-4 col-span-1"></div> */}
            <dic>
                <div>
                    <AiFillHeart />
                    {likeCnt}
                </div>
                <div>
                    <GiPartyPopper />
                    {sadCnt}
                </div>
                <div>
                    <RiEmotionSadFill />
                    {congratulationCnt}
                </div>
            </dic>
        </div>
    );
};

// color={liked ? "red" : "white"}

// color={grats ? "#fcaaa1" : "white"}

// color={sad ? "#6d93ff" : "white"}
