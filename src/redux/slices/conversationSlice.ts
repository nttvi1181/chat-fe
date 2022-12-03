import { Profile } from "@/interfaces/user";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

const initialState: {
  conversations: Array<any>;
} = {
  conversations: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, { payload }) => {
      state.conversations = payload;
    },
  },
});

export const conversations = (state: AppState) =>
  state.conversation.conversations;
export const { setConversations } = conversationSlice.actions;

export default conversationSlice.reducer;
