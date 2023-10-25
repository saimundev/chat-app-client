"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  getCookie } from 'cookies-next';
import jwtDecode from "jwt-decode";

interface AuthState {
  user: string | null;
  userToken: string | null;
  
}

const token = getCookie("userToken")

const initialState: AuthState = {
  user:token ? jwtDecode(token) : null,
  userToken:token ? token : null
    
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<string | any>) => {
      state.userToken = action.payload
      state.user = jwtDecode(action.payload);
    },
  },
});

export const { getUser } = authSlice.actions;
export default authSlice.reducer;
