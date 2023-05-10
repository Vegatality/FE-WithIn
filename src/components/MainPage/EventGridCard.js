import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { RiEmotionSadFill } from "react-icons/ri";
import { dateConvert } from "../util/dateConvert";

// 날짜 변환

export const EventGridCard = ({
    children,
    commentLength,
    createdTime,
    congratulationCnt,
    likeCnt,
    sadCnt,
    title,
    image,
}) => {
    // console.log(date, commentLength, congratulationCnt, likeCnt, sadCnt, title);
    const date = dateConvert(createdTime);

    return (
        <div className="flex flex-col justify-center items-center rounded-lg w-full max-h-fit bg-white shadow-md">
            <div className="text-right pr-2 w-full rounded-t-lg bg-backgroundPurple">
                <span>{date}</span>
            </div>
            <div className="relative flex justify-center items-center w-20 h-20 mt-6">
                {image ? (
                    <img
                        className="w-full h-full rounded-full object-cover shadow-md"
                        src={image}
                        alt=""
                    />
                ) : (
                    <div className=" w-20 h-20 rounded-full bg-mainPurple flex items-center justify-center shadow-md">
                        <FontAwesomeIcon
                            icon={faUser}
                            size="2x"
                            className=" text-white"
                        />
                    </div>
                )}
            </div>
            <div className="text-center text-xl mb-2 w-full truncate px-3">
                {title}
            </div>
            <div className="flex flex-row justify-between w-full  p-2 rounded-b-lg bg-backgroundPurple">
                <div className="flex flex-row justify-between items-center gap-1">
                    {likeCnt ? (
                        <div className="flex flex-row justify-between items-center gap-1">
                            <AiFillHeart style={{ color: "red" }} />
                            <p>{likeCnt}</p>
                        </div>
                    ) : null}
                    {sadCnt ? (
                        <div className="flex flex-row justify-between items-center gap-1">
                            <GiPartyPopper style={{ color: "#fcaaa1" }} />
                            {sadCnt}
                        </div>
                    ) : null}
                    {congratulationCnt ? (
                        <div className="flex flex-row justify-between items-center gap-1">
                            <RiEmotionSadFill style={{ color: "#6d93ff" }} />
                            {congratulationCnt}
                        </div>
                    ) : null}
                </div>
                {commentLength ? (
                    <div className="flex flex-row justify-between items-center gap-1">
                        <FaCommentDots className="text-darkPurple" />
                        <p>{commentLength}</p>
                    </div>
                ) : null}
            </div>
        </div>
    );

    // return (
    //     // <div className="flex flex-row justify-center items-center mx-auto rounded-md w-full h-24 border border-solid border-mainPurple bg-white">
    //     <div className="grid grid-cols-6 auto-rows-max rounded-md border border-solid border-mainPurple">
    //         <div className="col-start-1 col-end-5 p-1 bg-mainPurple rounded-l-md">
    //             <div>
    //                 <span>{createdTime}</span>
    //             </div>
    //             <h1 className="text-xl">{title}</h1>
    //         </div>
    //         <div className="col-start-5 col-end-7 p-1 bg-backgroundPurple rounded-r-md">
    //             <div className="flex flex-col justify-evenly ">
    //                 <div className="flex flex-row justify-between">
    //                     <div className="flex flex-row justify-between items-center">
    //                         <AiFillHeart style={{ color: "red" }} />
    //                         <p>{likeCnt}</p>
    //                     </div>
    //                     <div className="flex flex-row justify-between items-center">
    //                         <GiPartyPopper style={{ color: "#fcaaa1" }} />
    //                         {sadCnt}
    //                     </div>
    //                     <div className="flex flex-row justify-between items-center">
    //                         <RiEmotionSadFill style={{ color: "#6d93ff" }} />
    //                         {congratulationCnt}
    //                     </div>
    //                 </div>
    //                 <div className="flex flex-row justify-evenly overflow-ellipsis">
    //                     CommentCNT
    //                     <p>{commentLength}</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     // <div>
    //     // <div>댓글 수 {commentLength}</div>
    //     // <div>
    //     //     <AiFillHeart style={{ color: "red" }} />
    //     //     {likeCnt}
    //     // </div>
    //     // <div>
    //     //     <GiPartyPopper style={{ color: "#fcaaa1" }} />
    //     //     {sadCnt}
    //     // </div>
    //     // <div>
    //     //     <RiEmotionSadFill style={{ color: "#6d93ff" }} />
    //     //     {congratulationCnt}
    //     // </div>
    //     // </div>
    //     // </div>
    // );
};

// export const EventGridCard = ({
//     children,
//     commentLength,
//     createdTime,
//     congratulationCnt,
//     likeCnt,
//     sadCnt,
//     title,
// }) => {
//     const convertDate = (date) => {
//         const cardDate = new Date(date);

//         const year = cardDate.getFullYear();
//         const month = cardDate.getMonth() + 1; // 월은 0부터 시작하기 때문에 1을 더함!
//         const day = cardDate.getDate();
//         const dayOfWeek = cardDate.toLocaleDateString("ko-KR", {
//             weekday: "long",
//         });
//         const hour = cardDate.getHours();
//         const minute = cardDate.getMinutes();

//         return `${year}년 ${month}월 ${day}일 ${dayOfWeek} ${hour}:${minute}`;
//     };
//     // const date = convertDate(createdTime);

//     // console.log(date, commentLength, congratulationCnt, likeCnt, sadCnt, title);

//     return (
//         <div className="flex flex-row justify-center items-center mx-auto rounded-md w-full h-24 border border-solid border-mainPurple bg-white">
//             {/* <div className="grid grid-cols-5 auto-rows-[100px]"></div> */}
//             {/* <div className="col-start-1 col-end-4"></div> */}
//             <div>
//                 <span>{date}</span>
//             </div>
//             <div>{title}</div>
//             {/* <div className="col-start-4 col-span-1"></div> */}
//             <dic>
//                 <div>
//                     <AiFillHeart />
//                     {likeCnt}
//                 </div>
//                 <div>
//                     <GiPartyPopper />
//                     {sadCnt}
//                 </div>
//                 <div>
//                     <RiEmotionSadFill />
//                     {congratulationCnt}
//                 </div>
//             </dic>
//         </div>
//     );
// };

// color={liked ? "red" : "white"}

// color={grats ? "#fcaaa1" : "white"}

// color={sad ? "#6d93ff" : "white"}
