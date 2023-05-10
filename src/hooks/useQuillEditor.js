import { useState } from "react";
import ReactQuill from "react-quill";

const useQuill = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const toolbar = {
    container: [["bold", "italic", "underline"]],
    handlers: {},
  };

  const renderQuill = () => (
    <ReactQuill className=" bg-white rounded-sm shadow-md max-h-sm" defaultValue={value} onChange={handleChange} modules={{ toolbar }} />
  );

  return { value, renderQuill };
};

export default useQuill;
