import { BoardCommentCard } from "../components/BoardDetails/BoardCommentCard";
import { BoardAddComment } from "../components/BoardDetails/BoardAddComment";
import { useSelector } from "react-redux";

export const BoardDetails = () => {
  const comments = useSelector((state) => state.commentsSlice);
  console.log(comments);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-sm bg-backgroundPurple rounded-md p-6 my-4 flex flex-col items-center shadow">
        <div className="rounded-full bg-mainPurple w-24 h-24 mb-4 shadow-lg"></div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-commomTextColor">Username</h2>
          <p className="text-gray-400">Event info</p>
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
