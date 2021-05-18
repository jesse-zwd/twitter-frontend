import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../services/http";

export const getUsers = createAsyncThunk("whotofollow/getUsers", async () => {
  const res = await axios.get(`api/v1/users`);
  return res.data.data.items
});

const whoToFollowSlice = createSlice({
  name: "whotofollow",
  initialState: {
    loading: true,
    users: [],
  },
  reducers: {
    clearWhoToFollow(state, action) {
      state.loading = true;
      state.data = {};
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
  },
});

export const { clearWhoToFollow } = whoToFollowSlice.actions;

export default whoToFollowSlice.reducer;
