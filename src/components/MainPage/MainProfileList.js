import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const MainProfileList = ({ children }) => {
    const movePrevPage = () => {};

    const moveNextPage = () => {};

    return (
        <div className="f-full p-2">
            <div className="flex flex-row justify-between items-center p-4 w-full h-fit bg-sectionPurple  shadow-sm rounded-md">
                <div>
                    <FaChevronLeft className="text-darkPurple text-5xl cursor-pointer hover:text-textPurple" />
                </div>
                <div className="flex flex-row w-full justify-between">
                    {children}
                </div>
                <div>
                    <FaChevronRight className="text-darkPurple text-5xl cursor-pointer hover:text-textPurple" />
                </div>
            </div>
        </div>
    );
};
