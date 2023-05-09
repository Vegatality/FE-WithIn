import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export const MainProfileCard = () => {
    return (
        <div className="flex flex-row">
            <button>
                <AiOutlineDoubleLeft />
            </button>
            <div className="flex flex-row justify-start m-2 w-full gap-20 ">
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
            </div>
            <button>
                <AiOutlineDoubleRight />
            </button>
        </div>
    );
};
