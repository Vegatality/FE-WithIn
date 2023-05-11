import axios from "axios";
import Cookies from "js-cookie";

const getBoardProfileList = async (pageNumber = 0) => {
  const token = Cookies.get("access");
  const response = await axios.get(`${process.env.REACT_APP_TEST_SERVER_URL}/members?page=${pageNumber}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  //   console.log("response", response);
  return response;
};

const getBoardList = async (pageNumber = 0) => {
  const token = Cookies.get("access");
  const response = await axios.get(`${process.env.REACT_APP_TEST_SERVER_URL}/boards?page=${pageNumber}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  //   console.log("response", response);
  return response;
};

export { getBoardList, getBoardProfileList };
