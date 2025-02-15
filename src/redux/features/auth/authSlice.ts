import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role:string
}

interface AuthState {
  user: User | null;
  token: string | null;
}
const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

export const currentToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;
