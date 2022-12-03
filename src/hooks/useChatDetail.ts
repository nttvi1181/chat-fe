import { Profile } from "@interfaces/user";
import { useAppDispatch, useAppSelector } from ".";
import {
  list_messages as list_messages_selector,
  conversation_info as conversation_info_selector,
  chat_detail_info as chat_detail_selector,
  message_reply as message_reply_selector,
  setChatDetailInfo as setChatDetailInfoAction,
  setListMessages as setListMessagesAction,
  setConversationInfo as setConversationInfoAction,
  resetChatDetail as resetChatDetailAction,
  pushNewMessage as pushNewMessageAction,
  updateNewMessage as updateNewMessageAction,
  updateMessage as updateMessageAction,
  setMessageReply as setMessageReplyAction,
} from "../redux/slices/chatSlice";

const useChatDetail = () => {
  const dispatch = useAppDispatch();
  const list_messages = useAppSelector(list_messages_selector);
  const conversation_info = useAppSelector(conversation_info_selector);
  const chat_detail_info = useAppSelector(chat_detail_selector);
  const message_reply = useAppSelector(message_reply_selector);

  const setChatDetailInfo = (data: any) => {
    dispatch(setChatDetailInfoAction(data));
  };

  const setListMessages = (data: Array<any>) => {
    dispatch(setListMessagesAction(data));
  };

  const setConversationInfo = (data: any) => {
    dispatch(setConversationInfoAction(data));
  };

  const setMessageReply = (data: any) => {
    dispatch(setMessageReplyAction(data));
  };

  const pushNewMessage = (data: any) => {
    dispatch(pushNewMessageAction(data));
  };

  const updateNewMessage = (data: any) => {
    dispatch(updateNewMessageAction(data));
  };

  const updateMessage = (data: any) => {
    dispatch(updateMessageAction(data));
  };

  const resetChatDetail = () => {
    dispatch(resetChatDetailAction());
  };

  return {
    setConversationInfo,
    setListMessages,
    setChatDetailInfo,
    resetChatDetail,
    pushNewMessage,
    updateNewMessage,
    updateMessage,
    setMessageReply,
    chat_detail_info,
    conversation_info,
    list_messages,
    message_reply,
  };
};

export default useChatDetail;
