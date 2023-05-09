import Cookies from "js-cookie";
import React from "react";
import axios from "../api/axios";
import useModal from "../hooks/useModal";

export const MainPage = () => {
  const token = Cookies.get("access");
  console.log(token);

  const getUserList = async () => {
    const response = await axios.get("/members");
    console.log("user list", response.data);
  };
  const getBoardList = async () => {
    const response = await axios.get("/boards");
    console.log("board list", response.data);
  };
  const getOneUserList = async () => {
    const response = await axios.get("/members/1");
    console.log("user", response.data);
  };
  getUserList();
  getOneUserList();
  getBoardList();

  const [ModalComponent, openModal, closeModal] = useModal();

  const postBoard = async (data) => {
    const response = await axios.post("/boards", data);
    console.log("board data sent", response.data);
  };
  const handleSave = async (data) => {
    await postBoard({
      title: "title00",
      contents: "",
      category: "",
      image: "",
    });
    console.log(data);
    closeModal();
  };

  return (
    <div>
      <div> Api test page</div>
      <button onClick={openModal}>Open Modal</button>
      <ModalComponent onSave={handleSave} />
    </div>
  );
};
