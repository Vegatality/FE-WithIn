import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const MainProfileList = ({ children, movePrevPage, moveNextPage }) => {
  return (
    <div className="f-full p-2">
      <div className="flex flex-row justify-between items-center p-4 w-full h-fit bg-sectionPurple  shadow-sm rounded-md">
        <div>
          <FaChevronLeft className="text-darkPurple text-5xl cursor-pointer hover:text-textPurple" onClick={movePrevPage} />
        </div>
        <div className="w-full">
          <div className=" grid grid-cols-4 lg:grid-cols-6 gap-2   p-2  auto-cols-max auto-rows-max h-full">{children}</div>
        </div>
        <div>
          <FaChevronRight className="text-darkPurple text-5xl cursor-pointer hover:text-textPurple" onClick={moveNextPage} />
        </div>
      </div>
    </div>
  );
};
