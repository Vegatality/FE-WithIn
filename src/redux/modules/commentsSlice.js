import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { username: "User 1", text: "Gratz 🎉", id: 4 },
  { username: "User 2", text: "Lucky you...", id: 2 },
];

const commentsSlice = createSlice({
  name: "commentsReducer",
  initialState,
  reducers: {
    addComment: (state, action) => {
      return [action.payload, ...state];
    },
    editComment: (state, action) => {
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          return { ...comment, text: action.payload.text };
        }
        return comment;
      });
    },
    deleteComment: (state, action) => {
      return state.filter((comment) => comment.id !== action.payload);
    },
  },
});

export const { addComment, editComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
