import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authApi from "../apis/authApi";
import { LoginRequestDto, LoginResult } from "../../types/LoginDto";

// # initial state
const initialState = { loginSession: {} as LoginResult };

export const loginSession = createAsyncThunk(
  "login/login",
  async ({ userId, password }: LoginRequestDto) => {
    const resp = await authApi.sessionLogin(userId, password);
    return resp;
  }
);

const authSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginSession.fulfilled, (state, { payload: resp }) => {
      state.loginSession = resp;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
