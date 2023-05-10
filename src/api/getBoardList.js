import axios from "./axios";

const getBoardList = async () => {
  const response = await axios.get("/boards");
  return response;
};

export { getBoardList };
