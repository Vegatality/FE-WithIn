import { useState } from "react";
import axios from "../api/axios";

export const useImage = (initialImage) => {
  const [image, setImage] = useState(initialImage);
  const handleImageChange = async (event) => {
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

    const formData = new FormData();
    formData.append("imageFile", image);
    try {
      const response = await axios.put("/members/1", formData);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return [image, handleImageChange];
};
