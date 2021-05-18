import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../services/http";

export const getTweet = createAsyncThunk("tweet/getTweet", async (id) => {
  const res = await http.get(`api/v1/tweet/${id}`);
  return res.data.data;
});

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    loading: true,
    data: {},
  },
  reducers: {
    clearTweet(state, action) {
      state.loading = true;
      state.data = {};
    },
    addComment(state, action) {
      state.data = {
        ...state.data,
        comments: [action.payload, ...state.data.comments],
        commentCount: state.data.commentCount + 1,
      };
    },
    removeComment(state, action) {
      state.data = {
        ...state.data,
        comments: state.data.comments.filter(
          (comment) => comment.id !== action.payload
        ),
        commentCount: state.data.commentCount - 1,
      };
    },
  },
  extraReducers: {
    [getTweet.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const { clearTweet, addComment, removeComment } = tweetSlice.actions;

export default tweetSlice.reducer;
