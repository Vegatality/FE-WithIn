import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";

export const BoardCommentCard = ({ comments, index, comment, setComments }) => {
  const [editingCommentIndex, setEditingCommentIndex] = useState(false);
  const [value, setValue] = useState("");
  const handleEditComment = (index, newText) => {
    const newComments = [...comments];
    newComments[index].text = newText;
    setComments(newComments);
    setEditingCommentIndex(false);
  };
  const handleInputChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex-grow ">
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="rounded-full bg-gray-200 w-8 h-8 mr-2"></div>
          <h3 className="font-bold">{comment.username}</h3>
          <p className="text-xs ml-3 pt-1">2023-05-06 11:20</p>
        </div>
        {editingCommentIndex === index ? (
          <button className="text-blue-500" onClick={() => handleEditComment(index, value)}>
            Save
          </button>
        ) : (
          <button className="text-blue-500" onClick={() => setEditingCommentIndex(index)}>
            Edit
          </button>
        )}
      </div>
      {editingCommentIndex === index ? (
        <ReactQuill
          className="mx-8 bg-white"
          defaultValue={comment.text}
          onChange={handleInputChange}
          style={{ borderRadius: "6px", padding: "-1px", border: "none", overflow: "hidden" }}
        />
      ) : (
        <p className="mx-10 px-3 py-1 bg-white rounded" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.text) }}></p>
      )}
    </div>
  );
};
