import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export const MainProfileCard = ({ content }) => {
  return (
    <motion.div className="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="flex flex-col items-center rounded-xl shadow-md bg-secondaryBgColor py-3 ">
        <div className="flex justify-center items-center w-28 h-28 bg-mainPurple rounded-full">
          {content.img ? (
            <img className="w-full h-full rounded-full object-cover shadow-md" src={content.img} alt="" />
          ) : (
            <div className=" w-20 h-20 rounded-full bg-mainPurple flex items-center justify-center shadow-md">
              <FontAwesomeIcon icon={faUser} size="2x" className=" text-white" />
            </div>
          )}
        </div>
        <div className="font-bold antialiased mt-2">{content.username}</div>
      </div>
    </motion.div>
  );
};
