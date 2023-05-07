import { BoardCommentCard } from "../components/BoardDetails/BoardCommentCard";
import { BoardAddComment } from "../components/BoardDetails/BoardAddComment";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSadTear, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export const BoardDetails = () => {
  const comments = useSelector((state) => state.commentsSlice);
  const [liked, setLiked] = useState(false);
  const [sad, setSad] = useState(false);
  const [congratulations, setCongratulations] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-sm bg-backgroundPurple rounded-md p-6 my-4 flex flex-col items-center shadow">
        <div className="rounded-full bg-mainPurple w-24 h-24 mb-4 shadow-lg"></div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-commomTextColor">Username</h2>
          <p className="text-gray-400">Event info</p>
          <div className="flex gap-5">
            <div className="flex justify-center items-center mt-4">
              <motion.div
                animate={liked ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                onClick={() => setLiked(!liked)}
              >
                <FontAwesomeIcon className="mr-2" icon={faHeart} color={liked ? "red" : "white"} size="sm" />
              </motion.div>

              <span className="text-sm">Like</span>
            </div>
            <div className="flex justify-center items-center mt-4">
              <FontAwesomeIcon className="mr-2" icon={faSadTear} color={sad ? "#b185dd" : "white"} size="sm" onClick={() => setSad(!sad)} />
              <span className="text-sm">Sad</span>
            </div>

            {/* <div className="flex justify-center items-center mt-4">
              <button
                className="rounded-full bg-transparent text-green-500 w-8 h-8 flex justify-center items-center hover:bg-green-500 hover:text-white focus:outline-none"
                onClick={() => setCongratulations(!congratulations)}
              >
                <FontAwesomeIcon icon={faTrophy} color={congratulations ? "yellow" : "white"} size="sm" />
              </button>
              <span className="ml-2 text-gray-400 text-sm">Congratulations</span>
            </div> */}
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-backgroundPurple rounded-md px-4 py-6 my-4 shadow">
        <h2 className="text-lg font-bold mb-4">Comments</h2>
        <BoardAddComment />
        <div className="space-y-6">
          {comments.map((comment) => (
            <BoardCommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};
