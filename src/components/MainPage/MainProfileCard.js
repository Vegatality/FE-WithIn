import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const imageSize = {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
};

export const MainProfileCard = ({ img = "사진", username = "이름" }) => {
    return (
        <>
            <div className="flex flex-col w-1/6 items-center bg-white">
                <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
                    이미지
                </div>
                {img ? (
                    <img
                        className="w-full h-full rounded-full object-cover shadow-md"
                        src={img}
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
                <div>이름</div>
            </div>
            {/* <div className="flex flex-col w-1/6 items-center bg-white">
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
            </div> */}
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
