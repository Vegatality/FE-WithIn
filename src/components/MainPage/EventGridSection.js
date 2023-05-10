import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const EventGridSection = ({ children, name }) => {
    return (
        <div className="w-full">
            <div className="flex flex-row justify-center items-center h-11 my-5 w-60 rounded-md bg-mainPurple text-white">
                {name}
            </div>
            <div className="flex flex-row items-center p-4 w-full h-fit bg-sectionPurple shadow-sm rounded-md">
                <div>
                    <FaChevronLeft className="text-darkPurple text-5xl cursor-pointer hover:text-textPurple" />
                </div>
                <div className="w-full">
                    {/* <div className=" grid grid-cols-2 gap-2 p-2 grid-rows-[100px,150px,200px,100px] h-full bg-colorForAreaTest"> */}
                    <div className=" grid grid-cols-4 lg:grid-cols-6 gap-2   p-2  auto-cols-max auto-rows-max h-full">
                        {children}
                    </div>
                </div>
                <div>
                    <FaChevronRight className="text-darkPurple text-5xl cursor-pointer hover:text-textPurple" />
                </div>
            </div>
        </div>
    );
};
