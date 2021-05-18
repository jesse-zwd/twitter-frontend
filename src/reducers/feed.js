import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../services/http";

export const getFeed = createAsyncThunk("feed/getFeed", async () => {
  const res = await http.get(`api/v1/tweets`);
  return res.data.data;
});

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    loading: true,
    data: [],
  },
  reducers: {
    addTweet(state, action) {
      state.data = [
        action.payload, ...state.data
      ];
    },
    removeTweet(state, action) {
      state.data = state.data.filter((tweet) => tweet.id !== action.payload);
    },
  },
  extraReducers: {
    [getFeed.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const { addTweet, removeTweet } = feedSlice.actions;

export default feedSlice.reducer;
