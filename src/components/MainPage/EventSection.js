import React from "react";

export const EventSection = ({ children, name }) => {
  return (
    <div className="w-1/2">
      <div className="flex flex-row justify-center items-center h-11 my-10 mx-16 rounded-md bg-mainPurple text-white">{name}</div>
      <div className="flex flex-col w-full h-screen">
        <div className="flex flex-col justify-start gap-7 items-center h-full pt-3 bg-colorForAreaTest">{children}</div>
      </div>
    </div>
  );
};
