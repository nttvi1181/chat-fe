import SearchUserChat from "@/components/searchUserChat/SearchUserChat";
import useConversations from "@/hooks/useConversations";
import useUi from "@/hooks/useUi";
import { Button, Space } from "antd";
import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ConversationItem from "./ConversationItem";
import Styles from "./style.module.scss";

type Props = {};

const Conversations = (props: Props) => {
  const { conversations } = useConversations();
  const { setIsOpenCreateGroupChat } = useUi();
  return (
    <div className={Styles.main}>
      <Space>
        <SearchUserChat />
        <AiOutlineUsergroupAdd
          className="cursor-pointer"
          size={24}
          onClick={() => setIsOpenCreateGroupChat(true)}
        />
      </Space>

      <div>
        {conversations?.map((item, index) => (
          <ConversationItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Conversations;
