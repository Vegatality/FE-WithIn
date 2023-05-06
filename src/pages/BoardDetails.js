import React, { useState } from "react";
import { BoardCommentCard } from "../components/BoardDetails/BoardCommentCard";

export const BoardDetails = () => {
  const [comments, setComments] = useState([
    { username: "닉네임 1", text: "" },
    { username: "닉네임 2", text: "" },
    { username: "닉네임 3", text: "" },
  ]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xl bg-purple-100 shadow rounded-md p-6 my-4 flex flex-col items-center">
        <div className="rounded-full bg-gray-200 w-12 h-12 mb-4"></div>
        <div className="text-center">
          <h2 className="text-lg font-bold">Username</h2>
          <p className="text-gray-500">Event info</p>
        </div>
      </div>

      <div className="w-full max-w-xl bg-purple-100 shadow rounded-md px-4 py-6 my-4">
        <h2 className="text-lg font-bold mb-4">Comments</h2>
        <div className="space-y-8">
          {comments.map((comment, index) => (
            <BoardCommentCard key={index} comments={comments} index={index} comment={comment} setComments={setComments} />
          ))}
        </div>
      </div>
    </div>
  );
};
