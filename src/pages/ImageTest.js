import React from "react";
import { useState } from "react";
import axios from "../api/axios";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export const ImageTest = () => {
  const [image, setImage] = useState("");

  function handleImage(e) {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }

  const token = Cookies.get("access");
  let userId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    userId = decodedToken.userId;
  }

  async function handleSubmit() {
    const formData = new FormData();
    const text = JSON.stringify({ username: "username" });
    const imageBlob = new Blob([image], { type: "image/jpeg" });
    const textBlob = new Blob([text], { type: "application/json" });
    formData.append("imageFile", imageBlob, "image.jpg");
    formData.append("userPageRequestDto", textBlob);
    const response = await axios.put(`/members/${userId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
    console.log(response);
  }

  return (
    <div>
      <input type="file" onChange={handleImage} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};
