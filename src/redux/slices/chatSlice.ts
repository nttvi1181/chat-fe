import { Profile } from "@/interfaces/user";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

const initialState: {
  conversation_info: {
    conversation_id: string | null;
    origin_conversation_id: string | null;
    conversation_name: string | null;
    conversation_avatar: Array<string> | null;
    conversation_members: Array<any>;
    message_pinned: Array<any>;
  };
  list_messages: {};
  message_reply: any;
} = {
  conversation_info: {
    conversation_id: null,
    origin_conversation_id: null,
    conversation_name: null,
    conversation_avatar: [],
    conversation_members: [],
    message_pinned: [],
  },
  list_messages: {},
  message_reply: null,
};

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setConversationInfo: (state, { payload }) => {
      state.conversation_info = payload;
    },
    setListMessages: (state, { payload }) => {
      const newListMessages: any = {};
      payload.forEach((message: any) => {
        newListMessages[message.message_id] = message;
      });
      state.list_messages = newListMessages;
    },
    setMessageReply: (state, { payload }) => {
      state.message_reply = payload;
    },
    pushNewMessage: (state, { payload }) => {
      const newListMessages: any = {};
      newListMessages[payload.message_id] = payload;
      Object.values(state.list_messages).forEach((message: any) => {
        newListMessages[message.message_id] = message;
      });
      state.list_messages = newListMessages;
    },
    updateNewMessage: (state, { payload }) => {
      const newListMessages: any = {};
      Object.values(state.list_messages).forEach((message: any) => {
        newListMessages[message.message_id] = message;
      });
      newListMessages[payload.message_id] = payload;
      state.list_messages = newListMessages;
    },
    updateMessage: (state, { payload }) => {
      const newListMessages: any = {};
      Object.values(state.list_messages).forEach((message: any) => {
        newListMessages[message.message_id] = message;
      });
      if (newListMessages[payload.message_id])
        newListMessages[payload.message_id] = {
          ...newListMessages[payload.message_id],
          ...payload,
        };
      state.list_messages = newListMessages;
    },
    setChatDetailInfo: (state, { payload }) => {
      state = { ...payload };
      return state;
    },

    resetChatDetail: (state) => {
      state = {
        conversation_info: {
          conversation_id: null,
          origin_conversation_id: null,
          conversation_name: null,
          conversation_avatar: null,
          message_pinned: [],
          conversation_members: [],
        },
        list_messages: [],
        message_reply: null,
      };
      return state;
    },
  },
});

export const conversation_info = (state: AppState) =>
  state.chat.conversation_info;
export const list_messages = (state: AppState) => state.chat.list_messages;
export const chat_detail_info = (state: AppState) => state.chat;
export const message_reply = (state: AppState) => state.chat.message_reply;
export const {
  setConversationInfo,
  setListMessages,
  setChatDetailInfo,
  resetChatDetail,
  pushNewMessage,
  updateNewMessage,
  updateMessage,
  setMessageReply,
} = chatSlice.actions;

export default chatSlice.reducer;
