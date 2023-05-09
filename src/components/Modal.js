import { useState } from "react";
import useQuill from "../hooks/useQuillEditor";
import { MyProfilePicture } from "./Mypage/MyProfilePicture";

const Modal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { value, renderQuill } = useQuill("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleSaveClick = () => {
    onSave({ title: title, contents: name, image });
    console.log("click");
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="absolute inset-0 bg-mainPurple opacity-75" onClick={() => onClose()}></div>
      <div className="fixed bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 mx-32">Add Event</h2>
          <div className="flex justify-center">
            <MyProfilePicture />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Title
            </label>
            <input
              autoFocus
              className="appearance-none rounded w-full px-3 py-1 outline-none  focus:ring-2 focus: ring-mainPurple"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
              name="name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              className="appearance-none rounded w-full px-3 py-1 outline-none  focus:ring-2 focus: ring-mainPurple"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              name="name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-2">
              Description
            </label>
            {renderQuill()}
          </div>

          <div className="flex justify-end">
            <button className="bg-mainPurple text-white px-4 py-2 rounded-lg" onClick={handleSaveClick}>
              Save
            </button>
            <button className="bg-mainPurple text-white px-4 py-2 rounded-lg mr-2" onClick={() => onClose()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
