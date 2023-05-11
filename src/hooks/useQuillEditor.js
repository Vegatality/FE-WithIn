import { useState } from "react";
import ReactQuill from "react-quill";

const useQuill = (initialValue = "") => {
  const [quillValue, setQuillValue] = useState(initialValue);

  const handleQuillChange = (newValue) => {
    setQuillValue(newValue);
  };

  const toolbar = {
    container: [["bold", "italic", "underline"]],
    handlers: {},
  };

  const renderQuill = (plain) => (
    <ReactQuill
      className="bg-white rounded shadow max-h-sm"
      defaultValue={quillValue}
      onChange={handleQuillChange}
      modules={
        plain
          ? {
              toolbar: false, // Set toolbar to false to hide it
            }
          : { toolbar }
      }
    />
  );

  return { quillValue, renderQuill, setQuillValue };
};

export default useQuill;
