import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../services/http";

export const getProfile = createAsyncThunk("profile/getProfile", async (id) => {
  const res = await http.get(`api/v1/user/${id}`);
  return res.data.data;
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: true,
    data: {},
  },
  reducers: {
    clearProfile(state, action) {
      state.loading = true;
      state.data = {};
    },
  },
  extraReducers: {
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
