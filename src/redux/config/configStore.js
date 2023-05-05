import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import todo from "redux/modules/todoSlice";
import auth from "redux/modules/authSlice";

const store = configureStore({
  reducer: {
    todo,
    auth,
  },
  // development 는 개발 환경, production은 배포환경. 배포환경이 아닐 때만 devTool 보이게 설정.
  devTools: process.env.NODE_ENV !== "production",
  // devTools: process.env.NODE_ENV === "development",
});

export default store;
