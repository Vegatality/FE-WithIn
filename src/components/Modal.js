import { useState } from "react";
import useQuill from "../hooks/useQuillEditor";
import { MyProfilePicture } from "./Mypage/MyProfilePicture";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { convertHtmlToText } from "./util/convertHtmlToText";
const Modal = ({ isOpen, onClose, onSave }) => {
  const [eventType, setEventType] = useState("Event");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { quillValue, renderQuill, setQuillValue } = useQuill("");
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("");
  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    // console.log(`Option selected:`, selectedOption);
    // console.log("selected", selected);
  };

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      alert("The selected file is not an image.");
      return;
    }

    // Check file size
    const maxSize = 3 * 1024 * 1024; // 3 MB
    if (file.size > maxSize) {
      alert("File size is too large. Please select a file under 3 MB.");
      return;
    }
    // console.log(file);

    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setView(reader.result);
    };
  };

  const handleSaveClick = () => {
    const inputTitle = convertHtmlToText(title);
    const inputQuill = convertHtmlToText(quillValue);
    if (inputTitle.trim() === "") {
      alert("Please input Title");
      return;
    }
    if (inputQuill.trim() === "") {
      alert("Please input Title");
      return;
    }
    const formData = new FormData();
    const text = JSON.stringify({ title: title, contents: quillValue, category: selected.value });
    const imageBlob = new Blob([image], { type: "image/jpeg" });
    const textBlob = new Blob([text], { type: "application/json" });
    // console.log("text", text);
    formData.append("imageFile", imageBlob, "image.jpg");
    formData.append("boardRequestDto", textBlob);
    onSave(formData);
    // console.log("click");
  };
  const options = [
    { value: "Goodbye", label: "Goodbye" },
    { value: "Event", label: "Event" },
  ];
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="absolute inset-0 bg-mainPurple opacity-75" onClick={() => onClose()}></div>
      <div className="fixed bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 mx-40">Add Event</h2>
          <div className="flex w-full justify-center items-center">
            <div className="flex relative justify-center rounded-full items-center mb-4 mt-12 w-56 h-56">
              <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={handleImageChange} />
              <label
                htmlFor="imageInput"
                className="cursor-pointer absolute inset-0 w-full h-full flex items-center justify-center text-white bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-200"
                title="Upload Image"
              ></label>

              {view ? (
                <img className="w-full h-full rounded-full object-cover shadow-md" src={view} alt="" />
              ) : (
                <div className="flex justify-center items-center rounded-full bg-mainPurple w-56 h-56 shadow-lg">
                  <FontAwesomeIcon icon={faUser} size="4x" className=" text-white" />
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-2">
              Title
            </label>

            <input
              autoFocus
              className="appearance-none rounded w-full px-3 py-1 outline-none  focus:ring-2 focus: ring-mainPurple"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
              name="title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventType" className="block font-medium mb-2">
              Type of Event
            </label>
            <Select options={options} onChange={handleChange} autoFocus={false} />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-2">
              Contents
            </label>
            {renderQuill()}
          </div>

          <div className="flex justify-end">
            <button className="bg-mainPurple mr-3 text-white px-4 py-2 rounded-lg" onClick={handleSaveClick}>
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
