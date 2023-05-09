import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../redux/modules/commentsSlice";
import { FaEdit, FaSave, FaTrashAlt } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

export const BoardCommentCard = ({ comment }) => {
  // { username: "New User", text: "hello", id: 4 }
  const [commentState, setCommentState] = useState({ ...comment });
  const [editingComment, setEditingComment] = useState(false);
  const [liked, setLiked] = useState(false);

  const params = useParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const toolbar = {
    container: [["bold", "italic", "underline"]],
    handlers: {},
  };

  const convertHtmlToText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const putEditedComment = async (newText) => {
    try {
      const response = await axios.put(
        `/boards/${params.id}/comments/${comment.commentId}`,
        { comment: newText },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const editCommentMutation = useMutation(putEditedComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${params.id}`);
    },
  });

  const handleEditComment = async (newText) => {
    const text = convertHtmlToText(newText);
    console.log(text);
    if (text.trim() === "") {
      return;
    }

    editCommentMutation.mutate(newText);
    dispatch(editComment({ ...commentState }));
    setEditingComment(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (newText) => {
    console.log(newText);
    setCommentState({ ...commentState, text: newText });
  };

  const requestDeleteComment = async (id) => {
    try {
      const response = await axios.delete(`/boards/${params.id}/comments/${id}`);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(comment.commentId);
    // dispatch(deleteComment(params.id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const deleteCommentMutation = useMutation(requestDeleteComment, {
    onSuccess: () => {
      console.log("success", params.id);
      queryClient.invalidateQueries(`${params.id}`);
    },
  });

  return (
    <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="flex mx-3 mt-3">
        <div className="rounded-full bg-mainPurple w-12 h-12 mr-2 shadow-lg"></div>

        <div className="w-full">
          <div className="flex items-center justify-between mb-3 mr-7">
            <div className="flex items-center">
              <h3 className="font-bold text-sm">{comment.username}</h3>
            </div>
            {editingComment ? (
              <div className="flex items-center">
                <FaSave className="text-textPurple cursor-pointer text-lg mr-2" onClick={() => handleEditComment(commentState.text)} />
                <FaTrashAlt className="text-textPurple cursor-pointer text-lg" onClick={() => handleDeleteComment(comment.id)} />
              </div>
            ) : (
              <div className="flex items-center">
                <FaEdit className="text-textPurple cursor-pointer text-lg mr-2" onClick={() => setEditingComment(true)} />
                <FaTrashAlt className="text-textPurple cursor-pointer text-lg" onClick={() => handleDeleteComment(comment.id)} />
              </div>
            )}
          </div>
          {editingComment ? (
            <ReactQuill
              className=" bg-white rounded-sm mr-7 shadow-md"
              defaultValue={commentState.comment}
              onChange={handleInputChange}
              modules={{ toolbar }}
            ></ReactQuill>
          ) : (
            <p
              className="px-3 py-3 bg-white rounded text-sm mr-7 shadow-md"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.comment) }}
            ></p>
          )}
          <div className="flex pl-3">
            <div className="flex">
              <motion.div
                className="mt-3"
                animate={liked ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                onClick={() => setLiked(!liked)}
              >
                <AiFillHeart
                  className="text-md"
                  color={liked ? "red" : "white"}
                  onClick={() => setLiked(!liked)}
                  style={{ filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))" }}
                />
              </motion.div>
              <p className="text-xs ml-3">{comment.date}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
