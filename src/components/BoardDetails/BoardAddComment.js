import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/modules/commentsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../api/axios";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

export const BoardAddComment = ({ id }) => {
  const [newCommentText, setNewCommentText] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const queryClient = useQueryClient();
  const params = useParams();
  const toolbar = {
    container: [["bold", "italic", "underline"]],
    handlers: {},
  };

  const convertHtmlToText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const postNewCommentApi = async (newComment) => {
    try {
      const response = await axios.post(`/boards/${id}/comments`, newComment);
      // console.log(response.data);
    } catch (err) {
      // console.log(err);
    }
  };
  const addCommentMutation = useMutation(postNewCommentApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${params.id}`);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = convertHtmlToText(newCommentText);
    if (text.trim() !== "") {
      const newComment = { comment: newCommentText };
      addCommentMutation.mutate(newComment);
      setNewCommentText("");
    } else {
      setIsCommentEmpty(true);
      toast.error("Comment cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
        toastId: "empty-comment-toast",
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
