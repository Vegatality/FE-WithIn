import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: "pageNum",
    initialState: {
        totalPages: 0,
        currentPage: 0,
        nextPage: 0,
        boardContents: [
            {
                boardId: 0,
                title: "",
                image: "",
                createdTime: "",
                likeCnt: "",
                sadCnt: "",
                congratulationCnt: "",
                commentLength: 0,
            },
            {
                boardId: 1,
                title: "",
                image: "",
                createdTime: "",
                likeCnt: "",
                sadCnt: "",
                congratulationCnt: "",
                commentLength: 0,
            },
            {
                boardId: 2,
                title: "",
                image: "",
                createdTime: "",
                likeCnt: "",
                sadCnt: "",
                congratulationCnt: "",
                commentLength: 0,
            },
            {
                boardId: 3,
                title: "",
                image: "",
                createdTime: "",
                likeCnt: "",
                sadCnt: "",
                congratulationCnt: "",
                commentLength: 0,
            },
        ],
        profileList: [
            {
                userId: 17,
                username: "username123",
                email: "email123@naver.com",
                img: null,
            },
            {
                userId: 16,
                username: "asdf",
                email: "asdf1@gmail.com",
                img: null,
            },
            {
                userId: 15,
                username: "username",
                email: "asd123@naver.com",
                img: "https://within-s3-bucket.s3.ap-northeast-2.amazonaws.com/08c310a8-c337-4ca0-a1f0-b19d158ae9b2_blob.jpg",
            },
            {
                userId: 14,
                username: "cozy",
                email: "cozyboy@gmail.com",
                img: null,
            },
            {
                userId: 13,
                username: "username",
                email: "em343449979@naver.com",
                img: null,
            },
            {
                userId: 12,
                username: "username",
                email: "em349979@naver.com",
                img: null,
            },
        ],
    },

    // Refresh Token 은 브라우저 저장소(cookie)에, Access Token은 Redux를 이용하여 store에 사용.

    reducers: {
        SET_PAGES: (state, action) => {
            // action: {
            //     payload: { authenticated: true, userName: id, role: --- }
            // }
            state.totalPages = action.payload.totalPages;
            state.pages = action.payload.currentPage;
            state.nextPage = action.payload.currentPage + 1;
            state.boardContents = action.payload.content;
        },
        SET_PROFILE_PAGES: (state, action) => {
            // state.
        },
    },
});

export const { SET_PAGES } = pageSlice.actions;
export default pageSlice.reducer;

// 0 : [
//     {
//         boardId: 0,
//         title:"",
//         image:"",
//         createdTime:"",
//         likeCnt:"",
//         sadCnt:"",
//         congratulationCnt:"",
//         commentLength: 0
//     },
//     {
//         boardId: 1,
//         title:"",
//         image:"",
//         createdTime:"",
//         likeCnt:"",
//         sadCnt:"",
//         congratulationCnt:"",
//         commentLength: 0
//     }
// ],
// 1 : [
//     {
//         boardId: 2,
//         title:"",
//         image:"",
//         createdTime:"",
//         likeCnt:"",
//         sadCnt:"",
//         congratulationCnt:"",
//         commentLength: 0
//     },
//     {
//         boardId: 3,
//         title:"",
//         image:"",
//         createdTime:"",
//         likeCnt:"",
//         sadCnt:"",
//         congratulationCnt:"",
//         commentLength: 0
//     }
// ],
