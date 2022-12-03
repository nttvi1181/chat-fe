import { Profile } from "@/interfaces/user";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

const initialState: {
  currentPage: "CHAT" | "CONTACT" | null;
  currentViewProfile: null | Profile;
  isSearchChat: boolean;
  loading: boolean;
  imagePreview: string;
  isOpenCreateGroupChat: boolean;
  addMemberGroupChat: null | any;
} = {
  currentPage: null,
  currentViewProfile: null,
  isSearchChat: false,
  loading: false,
  imagePreview: "",
  isOpenCreateGroupChat: false,
  addMemberGroupChat: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setCurrentViewProfile: (state, { payload }) => {
      state.currentViewProfile = payload;
    },
    setIsSearchChat: (state, { payload }) => {
      state.isSearchChat = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setImagePreview: (state, { payload }) => {
      state.imagePreview = payload;
    },
    setIsOpenCreateGroupChat: (state, { payload }) => {
      state.isOpenCreateGroupChat = payload;
    },
    setIsOpenAddMemberGroupChat: (state, { payload }) => {
      state.addMemberGroupChat = payload;
    },
  },
});

export const addMemberGroupChat = (state: AppState) => state.ui.addMemberGroupChat;
export const currentPage = (state: AppState) => state.ui.currentPage;
export const isOpenCreateGroupChat = (state: AppState) =>
  state.ui.isOpenCreateGroupChat;
export const loading = (state: AppState) => state.ui.loading;
export const imagePreview = (state: AppState) => state.ui.imagePreview;
export const isSearchChat = (state: AppState) => state.ui.isSearchChat;
export const currentViewProfile = (state: AppState) =>
  state.ui.currentViewProfile;

export const {
  setCurrentPage,
  setCurrentViewProfile,
  setIsSearchChat,
  setLoading,
  setImagePreview,
  setIsOpenCreateGroupChat,
  setIsOpenAddMemberGroupChat,
} = uiSlice.actions;

export default uiSlice.reducer;
