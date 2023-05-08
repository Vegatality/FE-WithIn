import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/modules/commentsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BoardAddComment = () => {
  const [newCommentText, setNewCommentText] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);

  const dispatch = useDispatch();
  const usedIds = new Set(useSelector((state) => state.commentsSlice.map((comment) => comment.id))); //get existing task ids
  const toolbar = {
    container: [["bold", "italic", "underline"]],
    handlers: {},
  };

  const generateUniqueId = () => {
    let id = Math.floor(Math.random() * 1000);
    while (usedIds.has(id)) {
      id = Math.floor(Math.random() * 1000);
    }
    usedIds.add(id);
    return id;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newCommentText.trim() !== "" && newCommentText !== "<p><br></p>") {
      const newComment = { username: "New User", text: newCommentText, id: generateUniqueId() };
      dispatch(addComment(newComment));
      setNewCommentText("");
    } else {
      setIsCommentEmpty(true);
      toast.error("Comment cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
        toastId: "empty-comment-toast",
        autoClose: 2000,
      });
    }
  };

  const handleInputChange = (newValue) => {
    setNewCommentText(newValue);
  };

  return (
    <>
      {isCommentEmpty && <ToastContainer />}

      <form onSubmit={handleSubmit} className="flex w-full items-center">
        <ReactQuill
          className="bg-white rounded-sm mr-4 w-full mb-1 mx-3 shadow"
          value={newCommentText}
          onChange={handleInputChange}
          modules={{ toolbar }}
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="bg-mainPurple text-white font-bold py-6 px-2 mr-4 rounded-md hover:bg-[#826b99] transition duration-200 shadow-md"
        >
          Save
        </button>
      </form>
    </>
  );
};
