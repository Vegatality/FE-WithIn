import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const imageSize = {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
};

export const MainProfileCard = ({ url = "사진", name = "이름" }) => {
    return (
        <>
            <div className="flex flex-col w-1/6 items-center bg-white">
                <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
                    이미지
                </div>
                <div>이름</div>
            </div>
            <div className="flex flex-col w-1/6 items-center bg-white">
                <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
                    이미지
                </div>
                <div>이름</div>
            </div>
            <div className="flex flex-col w-1/6 items-center bg-white">
                <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
                    이미지
                </div>
                <div>이름</div>
            </div>
            <div className="flex flex-col w-1/6 items-center bg-white">
                <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
                    이미지
                </div>
                <div>이름</div>
            </div>
            <div className="flex flex-col w-1/6 items-center bg-white">
                <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
                    이미지
                </div>
                <div>이름</div>
            </div>
            <div className="flex flex-col w-1/6 items-center bg-white">
                <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
                    이미지
                </div>
                <div>이름</div>
            </div>
        </>
        // <div className="flex flex-row justify-start m-2 w-full gap-20 ">
        //     <div className="flex flex-col w-1/6 items-center bg-white">
        //         <div
        //             className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full"
        //             style={{
        //                 backgroundSize: "contain",
        //                 backgroundRepeat: "no-repeat",
        //                 //  backgroundPosition: "center", backgroundImage: `${url}`
        //                 // backgroundPosition: "center", backgroundImage: `url(이미지 URL)`
        //             }}
        //         >
        //             {url}
        //         </div>
        //         <div>{name}</div>
        //     </div>
        //     <div className="flex flex-col w-1/6 items-center bg-white">
        //         <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
        //             이미지
        //         </div>
        //         <div>이름</div>
        //     </div>
        //     <div className="flex flex-col w-1/6 items-center bg-white">
        //         <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
        //             이미지
        //         </div>
        //         <div>이름</div>
        //     </div>
        //     <div className="flex flex-col w-1/6 items-center bg-white">
        //         <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
        //             이미지
        //         </div>
        //         <div>이름</div>
        //     </div>
        //     <div className="flex flex-col w-1/6 items-center bg-white">
        //         <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
        //             이미지
        //         </div>
        //         <div>이름</div>
        //     </div>
        //     <div className="flex flex-col w-1/6 items-center bg-white">
        //         <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
        //             이미지
        //         </div>
        //         <div>이름</div>
        //     </div>
        // </div>
    );
};
