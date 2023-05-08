import Cookies from "js-cookie";
import React from "react";
import axios from "../api/axios";

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
  return (
    <div>
      <div> Api test page</div>
    </div>
  );
};
