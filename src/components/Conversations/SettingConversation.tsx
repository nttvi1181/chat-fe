import { showConfirm } from "@/utils/message.helper";
import { ConversationService } from "@/services/conversation.service";
import clsx from "clsx";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Styles from "./style.module.scss";
import useConversations from "@/hooks/useConversations";
import useChatDetail from "@/hooks/useChatDetail";
type Props = {
  conversation_id: string;
};

const SettingConversation = ({ conversation_id }: Props) => {
  const { conversations, setConversations } = useConversations();
  const { resetChatDetail, chat_detail_info } = useChatDetail();
  const onDeleteConversation = async () => {
    await ConversationService.deleteConversation({ conversation_id });
    const newConversations = conversations.filter(
      (conversation) => conversation.conversation_id !== conversation_id
    );
    setConversations(newConversations);
    if (
      chat_detail_info.conversation_info.conversation_id === conversation_id
    ) {
      resetChatDetail();
    }
  };

  const handleDeleteConversation = () => {
    showConfirm(
      "Bạn không thể hoàn tác sau khi xóa bản sao của cuộc trò chuyện này.",
      "oke bạn",
      () => {
        onDeleteConversation();
      }
    );
  };

  return (
    <div style={{ width: 200 }}>
      <div
        className={clsx("flex items-center", Styles.itemSetting)}
        style={{ fontSize: 16, fontWeight: "bold", color: "#050505" }}
        onClick={handleDeleteConversation}
      >
        <RiDeleteBinLine />
        <span className="ml-3">Xóa đoạn chát</span>
      </div>
    </div>
  );
};

export default SettingConversation;
