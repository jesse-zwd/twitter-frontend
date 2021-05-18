import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth";

export const login = createAsyncThunk(
    "login",
    async ({ payload, clearForm }) => {
        const user = await AuthService.login(payload)

        if (user.username) {
            clearForm()
            return user
        }
    }
)

export const signup = createAsyncThunk(
    "signup",
    async ({ payload, clearForm }) => {
        await AuthService.signup(payload)
        clearForm()
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: JSON.parse(localStorage.getItem("user")) || {}
    },
    reducers: {
        logout(state, action) {
            state.data = {} 
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.data = action.payload || {};
        },
        [signup.fulfilled]: (state, action) => {
            state.data = action.payload || {};
        },
    },
})

export const {
    logout,
} = userSlice.actions;

export default userSlice.reducer