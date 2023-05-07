import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import { FaEdit, FaSave, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../redux/modules/commentsSlice";

export const BoardCommentCard = ({ comment }) => {
  const [editingComment, setEditingComment] = useState(false);

  // { username: "New User", text: "hello", id: 4 }
  const [commentState, setCommentState] = useState({ ...comment });

  const dispatch = useDispatch();
  const handleEditComment = (newText) => {
    console.log("newtext", newText);
    console.log("commentState", commentState);
    if (newText.trim() === "") {
      return;
    }
    dispatch(editComment({ ...commentState }));
    setEditingComment(false);
  };

  const handleInputChange = (newText) => {
    console.log(newText);
    setCommentState({ ...commentState, text: newText });
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };

  const toolbar = {
    container: [["bold", "italic", "underline"]],
    handlers: {},
  };

  return (
    <div className="flex mx-3 mt-3 animate__animated animate__bounceIn">
      <div className="rounded-full bg-mainPurple w-12 h-12 mr-2 shadow-lg"></div>
      <div className="w-full">
        <div className="flex items-center justify-between mb-3 mr-7">
          <div className="flex items-center">
            <h3 className="font-bold text-sm">{comment.username}</h3>
            <p className="text-xs ml-3 text-gray-500">{comment.date}</p>
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
            defaultValue={commentState.text}
            onChange={handleInputChange}
            modules={{ toolbar }}
          ></ReactQuill>
        ) : (
          <p className="px-3 py-3 bg-white rounded text-sm mr-7 shadow-md" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.text) }}></p>
        )}
      </div>
    </div>
  );
};
