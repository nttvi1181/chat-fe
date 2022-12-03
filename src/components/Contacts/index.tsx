import SearchUserChat from "@/components/searchUserChat/SearchUserChat";
import React from "react";
import Styles from "./style.module.scss";
import ContactItem from "./ContactItem";
import { Profile } from "@/interfaces/user";
import useProfile from "@/hooks/useProfile";
import { createConversationId } from "@/utils/helper";
import useChatDetail from "@/hooks/useChatDetail";
import useUi from "@/hooks/useUi";

type Props = {
  data: Array<Profile>;
};

const Contacts = ({ data }: Props) => {
  const { currentUser } = useProfile();
  const { setChatDetailInfo } = useChatDetail();
  const { setCurrentPage } = useUi();
  console.log({ currentUser });

  const handleClickContactItem = (profile: any) => {
    if (!currentUser) return;
    if (currentUser._id === profile.recive_id._id) {
      const conversation_id = createConversationId([
        currentUser._id,
        profile.sender_id._id,
      ]);
      const data = {
        conversation_info: {
          conversation_id: conversation_id,
          origin_conversation_id: null,
          conversation_name: profile?.sender_id?.username,
          conversation_avatar: [profile?.sender_id?.avatar_url],
          conversation_members: [currentUser._id, profile?.sender_id?._id],
        },
        list_messages: [],
      };
      setChatDetailInfo(data);
      setCurrentPage("CHAT");
    } else {
      const conversation_id = createConversationId([
        currentUser._id,
        profile?.recive_id._id,
      ]);
      const data = {
        conversation_info: {
          conversation_id: conversation_id,
          origin_conversation_id: null,
          conversation_name: profile?.recive_id.username,
          conversation_avatar: [profile?.recive_id.avatar_url],
          conversation_members: [currentUser._id, profile?.recive_id._id],
        },
        list_messages: [],
      };
      setChatDetailInfo(data);
      setCurrentPage("CHAT");
    }
  };

  return (
    <div className={Styles.main}>
      <SearchUserChat />
      <div>
        {data
          // ?.filter((pr) => pr._id !== currentUser?._id)
          ?.map((profile) => (
            <ContactItem
              key={profile._id}
              profile={profile}
              onClick={handleClickContactItem}
            />
          ))}
      </div>
    </div>
  );
};

export default Contacts;
