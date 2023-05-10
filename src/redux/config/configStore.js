import { configureStore } from "@reduxjs/toolkit";
import auth from "../modules/authSlice";
import commentsSlice from "../modules/commentsSlice";
import pageSlice from "../modules/pageSlice";

const store = configureStore({
    reducer: {
        auth,
        commentsSlice,
        pageSlice,
    },
    // development 는 개발 환경, production은 배포환경. 배포환경이 아닐 때만 devTool 보이게 설정.
    devTools: process.env.NODE_ENV !== "production",
    // devTools: process.env.NODE_ENV === "development",
});

export default store;
