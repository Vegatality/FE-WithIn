import React from "react";

// 날짜 변환
const convertDate = (date) => {
    const cardDate = new Date(date);

    const year = cardDate.getFullYear();
    const month = cardDate.getMonth() + 1; // 월은 0부터 시작하기 때문에 1을 더함!
    const day = cardDate.getDate();
    const dayOfWeek = cardDate.toLocaleDateString("en-US", { weekday: "long" });
    const hour = cardDate.getHours();
    const minute = cardDate.getMinutes();

    return `${year}년 ${month}월 ${day}일 ${dayOfWeek} ${hour}:${minute}`;
};

export const EventGridCard = ({
    children,
    commentLength,
    createdAt,
    congratulationCnt,
    likeCnt,
    sadCnt,
    title,
}) => {
    const date = convertDate(createdAt);
    console.log(date, commentLength, congratulationCnt, likeCnt, sadCnt, title);

    return (
        <div className="flex flex-row justify-center items-center mx-auto rounded-md w-full h-24 border border-solid border-mainPurple bg-white">
            {children ? children : "ㅎㅇ"}
        </div>
    );
};
