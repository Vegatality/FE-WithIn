import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/modules/commentsSlice";

export const BoardAddComment = () => {
  const [newCommentText, setNewCommentText] = useState("");
  const dispatch = useDispatch();
  const usedIds = new Set(useSelector((state) => state.commentsSlice.map((comment) => comment.id))); //get existing task ids
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
    if (newCommentText.trim() !== "") {
      const newComment = { username: "New User", text: newCommentText, id: generateUniqueId() };
      dispatch(addComment(newComment));
      setNewCommentText("");
    }
  };

  const handleInputChange = (newValue) => {
    setNewCommentText(newValue);
  };

  const toolbar = {
    container: [["bold", "italic", "underline"]],
    handlers: {},
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full items-center">
        <ReactQuill
          className="bg-white rounded-sm mr-4 w-full mb-1 mx-3 shadow"
          value={newCommentText}
          onChange={handleInputChange}
          modules={{ toolbar }}
          placeholder="Add a comment..."
        />
        <button type="submit" className="bg-mainPurple text-white font-bold py-3 px-2 mr-4 rounded shadow-md">
          Save
        </button>
      </form>
    </>
  );
};
