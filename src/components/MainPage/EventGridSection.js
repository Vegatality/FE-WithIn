import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const EventGridSection = ({ children, name, role, openModal, movePrevPage, moveNextPage }) => {
  return (
    <div className="w-full">
      <div className=" flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center text-lg font-bold h-11 my-5 w-40 rounded-md bg-mainPurple text-white">{name}</div>
        {role === "ADMIN" ? (
          <div className="flex flex-row justify-end items-center ">
            <button
              className="px-5 py-3 mr-5 rounded-md text-white text-lg font-bold bg-buttonPurple hover:bg-[#826b99] transition duration-300 shadow-md cursor-pointer"
              onClick={openModal}
            >
              ADD EVENT
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-row items-center p-4 w-full h-fit bg-sectionPurple shadow-sm rounded-md">
        <div>
          <FaChevronLeft className="text-darkPurple text-5xl cursor-pointer hover:text-textPurple" onClick={movePrevPage} />
        </div>
        <div className="w-full">
          <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4   p-2  auto-cols-max auto-rows-max h-full">{children}</div>
        </div>
        <div>
          <FaChevronRight className="text-darkPurple text-5xl cursor-pointer hover:text-textPurple" onClick={moveNextPage} />
        </div>
      </div>
    </div>
  );
};
