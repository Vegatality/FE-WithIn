import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export const MainProfileList = ({ children }) => {
    const movePrevPage = () => {};

    const moveNextPage = () => {};

    return (
        <div className="f-full p-2">
            <div className="flex flex-row justify-between items-center w-full h-fit  bg-colorForAreaTest">
                <div>
                    <AiOutlineDoubleLeft />
                </div>
                <div className="flex flex-row w-full justify-between">
                    {children}
                </div>
                <div>
                    <AiOutlineDoubleRight />
                </div>
            </div>
        </div>
    );
};
