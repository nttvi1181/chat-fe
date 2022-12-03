import useAuth from "../../../hooks/useAuth";
import useProfile from "../../../hooks/useProfile";
import connectSocket from "../../../services/socket-io";
import React, { useEffect } from "react";
import useChatDetail from "@/hooks/useChatDetail";
import { ConversationService } from "@/services/conversation.service";
import useConversations from "@/hooks/useConversations";
import useUi from "@/hooks/useUi";

type Props = {};

const Socket = (props: Props) => {
  const { currentUser } = useProfile();
  const {
    conversation_info,
    pushNewMessage,
    updateNewMessage,
    updateMessage,
    setConversationInfo,
  } = useChatDetail();
  const { setConversations } = useConversations();
  const { setIsOpenAddMemberGroupChat } = useUi();

  const handleGetConversations = async () => {
    try {
      ConversationService.getAllConversations().then(({ data }) => {
        setConversations(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const socket = connectSocket();
    if (!socket) return;
    if (!currentUser?._id) return;
    socket.emit("JOIN_APP", { user_id: currentUser._id });
  }, [currentUser?._id]);

  useEffect(() => {
    if (!currentUser?._id) return;
    handleGetConversations();
    const socket = connectSocket();
    if (!socket) return;

    socket.on("SERVER_SEND_NEW_MESSAGE", (data: any) => {
      if (
        conversation_info.conversation_id &&
        conversation_info.conversation_id === data.conversation_id
      ) {
        if ((data.sender_id?._id ?? data.sender_id) === currentUser._id) {
          updateNewMessage(data);
        } else {
          pushNewMessage(data);
        }
      }
      handleGetConversations();
    });

    socket.on("CLIENT_SEND_MESSAGE_ERROR", (data: any) => {
      console.log("send message error ==>", data);
    });

    socket.on("SERVER_SEND_PIN_MESSAGE", (data: any) => {
      if (
        conversation_info.conversation_id &&
        conversation_info.conversation_id === data.conversation_id
      ) {
        setConversationInfo({
          ...conversation_info,
          message_pinned: data.message_pinned,
        });
      }
      handleGetConversations();
    });

    socket.on("SERVER_SEND_UNPIN_MESSAGE", (data: any) => {
      if (
        conversation_info.conversation_id &&
        conversation_info.conversation_id === data.conversation_id
      ) {
        setConversationInfo({
          ...conversation_info,
          message_pinned: data.message_pinned,
        });
      }
      handleGetConversations();
    });

    socket.on("SERVER_SEND_ADD_MEMBER_TO_CONVERSATION", (data: any) => {
      if (
        conversation_info.conversation_id &&
        conversation_info.conversation_id === data.conversation_id
      ) {
        setConversationInfo({
          ...conversation_info,
          conversation_members: data.members,
          conversation_id: data.conversation_id,
        });
      }
      handleGetConversations();
      setIsOpenAddMemberGroupChat(null);
      window.location.reload();
    });

    socket.on("SERVER_SEND_REMOVE_MEMBER_TO_CONVERSATION", (data: any) => {
      if (
        conversation_info.conversation_id &&
        conversation_info.conversation_id === data.conversation_id
      ) {
        setConversationInfo({
          ...conversation_info,
          conversation_members: data.members,
          conversation_id: data.conversation_id,
        });
      }
      handleGetConversations();
      setIsOpenAddMemberGroupChat(null);
      window.location.reload();
    });

    socket.on("SERVER_SEND_SEEN_MESSAGE", (data: any) => {
      if (
        conversation_info.conversation_id &&
        conversation_info.conversation_id === data.conversation_id
      ) {
        if ((data.sender_id?._id ?? data.sender_id) === currentUser._id) {
          updateMessage({
            member_seens: data?.member_seens,
            message_id: data.message_id,
          });
        }
      }
      handleGetConversations();
    });

    socket.on("SERVER_SEND_REACTION_MESSAGE", (data: any) => {
      const { reactions, conversation_id, message_id } = data;
      if (
        conversation_info.conversation_id &&
        conversation_info.conversation_id === conversation_id
      ) {
        updateMessage({
          reactions: reactions,
          message_id: message_id,
        });
      }
    });

    socket.on(
      "SERVER_SEND_DELETE_MESSAGE",
      (data: {
        message_id: string;
        conversation_id: string;
        messageChildren: string;
      }) => {
        const { message_id, conversation_id, messageChildren } = data;
        if (
          conversation_info.conversation_id &&
          conversation_info.conversation_id === conversation_id
        ) {
          updateMessage({
            is_deleted: true,
            message_id: message_id,
          });
          updateMessage({
            message_reply: null,
            message_id: messageChildren,
          });
        }
        handleGetConversations();
      }
    );

    return () => {
      socket.off("SERVER_SEND_NEW_MESSAGE");
      socket.off("SERVER_SEND_ADD_MEMBER_TO_CONVERSATION");
      socket.off("SERVER_SEND_REMOVE_MEMBER_TO_CONVERSATION");
      socket.off("SERVER_SEND_DELETE_MESSAGE");
      socket.off("CLIENT_SEND_MESSAGE_ERROR");
      socket.off("SERVER_SEND_UNPIN_MESSAGE");
      socket.off("SERVER_SEND_PIN_MESSAGE");
      socket.off("SERVER_SEND_SEEN_MESSAGE");
      socket.off("SERVER_SEND_REACTION_MESSAGE");
    };
  }, [currentUser?._id, conversation_info.conversation_id]);

  return <div></div>;
};
export default Socket;
