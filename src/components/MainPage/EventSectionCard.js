import React from "react";

export const EventSectionCard = ({ children }) => {
    return (
        <div className="flex flex-row justify-center items-center rounded-md w-11/12 h-24 border border-solid border-mainPurple bg-white">
            {children}
        </div>
    );
};
