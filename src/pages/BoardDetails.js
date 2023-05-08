import { BoardCommentCard } from "../components/BoardDetails/BoardCommentCard";
import { BoardAddComment } from "../components/BoardDetails/BoardAddComment";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { GiPartyPopper } from "react-icons/gi";
import { RiEmotionSadFill } from "react-icons/ri";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const BoardDetails = () => {
  const comments = useSelector((state) => state.commentsSlice);
  const memoizedComments = useMemo(() => comments, [comments]);

  const [liked, setLiked] = useState(false);
  const [sad, setSad] = useState(false);
  const [congratulations, setCongratulations] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-sm bg-backgroundPurple rounded-md p-6 my-4 flex flex-col items-center shadow">
        <div className="flex justify-center items-center rounded-full bg-mainPurple w-40 h-40 mb-4 shadow-lg">
          <FontAwesomeIcon icon={faUser} size="4x" className=" text-white" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-commonTextColor">Username</h2>
          <p className="text-commonTextColor">Event info</p>
          <div className="flex gap-5">
            <div className="flex justify-center items-center mt-4">
              <motion.div animate={liked ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.2, ease: "easeInOut" }}>
                <AiFillHeart
                  className="text-2xl mr-2"
                  color={liked ? "red" : "white"}
                  onClick={() => setLiked(!liked)}
                  style={{ filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))" }}
                />
              </motion.div>

              <span className="text-sm">Like</span>
            </div>
            <div className="flex justify-center items-center mt-4">
              <motion.div animate={sad ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.2, ease: "easeInOut" }}>
                <RiEmotionSadFill
                  className="mr-2 text-2xl"
                  color={sad ? "#6d93ff" : "white"}
                  onClick={() => setSad(!sad)}
                  style={{ filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))" }}
                />
              </motion.div>
              <span className="text-sm">Sad</span>
            </div>

            <div className="flex justify-center items-center mt-4">
              <motion.div animate={congratulations ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.2, ease: "easeInOut" }}>
                <GiPartyPopper
                  className="text-2xl mr-2"
                  color={congratulations ? "#fcaaa1" : "white"}
                  onClick={() => setCongratulations(!congratulations)}
                  style={{ filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))" }}
                />
              </motion.div>
              <span className="ml-2  text-sm">Grats</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-backgroundPurple rounded-md px-4 py-6 my-4 shadow">
        <h2 className="text-lg font-bold mb-4">Comments</h2>
        <BoardAddComment />
        <div className="space-y-6">
          <AnimatePresence>
            {memoizedComments.map((comment) => (
              <BoardCommentCard key={comment.id} comment={comment} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
