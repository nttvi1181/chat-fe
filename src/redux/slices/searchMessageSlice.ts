import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

const initialState: {
  listMessageSearch: Array<any>;
} = {
  listMessageSearch: [],
};

export const searchMessageSlice = createSlice({
  name: "searchMessageSlice",
  initialState,
  reducers: {
    setListMessageSearch: (state, { payload }) => {
      state.listMessageSearch = payload;
    },
  },
});

export const listMessageSearch = (state: AppState) =>
  state.searchMessage.listMessageSearch;

export const { setListMessageSearch } = searchMessageSlice.actions;

export default searchMessageSlice.reducer;
