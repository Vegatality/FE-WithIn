import React from "react";

export const EventGridSection = ({ children, name }) => {
    return (
        <div className="w-1/2">
            <div className="flex flex-row justify-center items-center h-11 my-10 mx-16 rounded-md bg-mainPurple text-white">
                {name}
            </div>
            <div className="flex flex-col w-full h-screen">
                {/* <div className=" grid grid-cols-2 gap-2 p-2 grid-rows-[100px,150px,200px,100px] h-full bg-colorForAreaTest"> */}
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 auto-rows-[100px] h-full bg-colorForAreaTest">
                    {children}
                </div>
            </div>
        </div>
    );
};
