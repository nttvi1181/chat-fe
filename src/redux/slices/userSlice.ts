import { Profile } from "@interfaces/user";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

const initialState: {
  currentUser: Profile | null;
} = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    removeCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const currentUser = (state: AppState) => state.user.currentUser;

export const { setCurrentUser, removeCurrentUser } = userSlice.actions;

export default userSlice.reducer;
