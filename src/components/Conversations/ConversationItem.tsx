import React, { useEffect } from "react";
import Styles from "./style.module.scss";
import Avatarimg from "../../assets/images/dejong.jpg";
import { Avatar, Dropdown, MenuProps, Popover, Tooltip } from "antd";
import clsx from "clsx";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import AvatarGroupCustom from "@/components/common/AvatarGroupConversation";
import useProfile from "@/hooks/useProfile";
import useChatDetail from "@/hooks/useChatDetail";
import CustomAvatar from "@/components/common/CustomAvatar";
import { BsThreeDots } from "react-icons/bs";
import SettingConversation from "./SettingConversation";
type Props = {
  item: any;
};

const ConversationItem = ({ item }: Props) => {
  const { last_message } = item;
  const { currentUser } = useProfile();
  const last_message_isOwner = last_message?.sender_id?._id === currentUser?._id;
  const { setChatDetailInfo, conversation_info } = useChatDetail();
  const isGroupChat = item.members.length > 2;

  const handleClickConversationItem = (conversation: any) => {
    if (
      !currentUser ||
      conversation_info?.conversation_id === conversation.conversation_id
    )
      return;
    const data = {
      conversation_info: {
        conversation_id: conversation.conversation_id,
        origin_conversation_id: conversation?._id,
        message_pinned:conversation.message_pinned,
        conversation_name: getNameConversation(),
        conversation_avatar: getAvatarConversation(),
        conversation_members: conversation.members?.map(
          (member: any) => member._id
        ),
      },
      list_messages: [],
    };
    setChatDetailInfo(data);
  };

  useEffect(() => {
    const containerItems: NodeListOf<HTMLDivElement> =
      document.querySelectorAll(
        ".container-item"
      ) as NodeListOf<HTMLDivElement>;
    if (!Array.from(containerItems).length) return;
    containerItems.forEach((item) => {
      const containerAvatar: HTMLDivElement = item.querySelector(
        ".container-avatar"
      ) as HTMLDivElement;
      const containerSeen: HTMLDivElement = item.querySelector(
        ".container-seen"
      ) as HTMLDivElement;
      const totalSubWidth =
        containerAvatar?.clientWidth + containerSeen?.clientWidth ?? 0;
      const containerContent: HTMLDivElement = item.querySelector(
        ".container-content"
      ) as HTMLDivElement;
      containerContent.style.maxWidth = `calc(100% - ${totalSubWidth}px)`;
    });
  }, [item._id, last_message?.member_seens?.length]);

  const getNameConversation = () => {
    if (item?.display_name) return item?.display_name;
    return item?.members
      ?.filter((member: any) => member._id !== currentUser?._id)
      ?.map((member: any) => member?.username)
      ?.join(", ");
  };

  const getAvatarConversation = () => {
    if (item?.avatar_url) return item?.avatar_url;
    return item?.members
      ?.filter((member: any) => member._id !== currentUser?._id)
      ?.map((member: any) => member?.avatar_url);
  };

  const getDatSeenMessage = () => {
    if (!last_message) return [];
    return item?.members?.filter(
      (member: any) =>
        member?._id !== currentUser?._id &&
        last_message?.member_seens?.includes(member?._id)
    );
  };

  const getContentLastMessage = () => {
    if (!last_message) return "";
    switch (last_message.type) {
      case "TEXT":
        if (last_message_isOwner) {
          return `Bạn: ${last_message.content}`;
        }
        return `${isGroupChat ? last_message.sender_id.username + ": " : ""}${
          last_message.content
        }`;
    }
  };

  const checkIsReadLastMessage = () => {
    return (
      last_message_isOwner ||
      last_message?.member_seens?.includes(currentUser?._id)
    );
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
    <div className={clsx(Styles.itemWraper, "relative")}>
      <div
        className={clsx(
          Styles.listItem,
          "container-item",
          conversation_info.conversation_id === item.conversation_id &&
            Styles.active
        )}
      >
        <div
          className="pr-2 flex-shrink-0 container-avatar"
          onClick={() => handleClickConversationItem(item)}
        >
          {getAvatarConversation()?.length >= 2 ? (
            <AvatarGroupCustom
              avatar1={getAvatarConversation()?.[0]}
              avatar2={getAvatarConversation()?.[1]}
            />
          ) : (
            <CustomAvatar src={getAvatarConversation()?.[0]} size={48} />
          )}
        </div>
        <div
          className="flex-1 container-content"
          onClick={() => handleClickConversationItem(item)}
        >
          <div>
            <span
              className={clsx(
                Styles.nameChat,
                !checkIsReadLastMessage() && "font-semibold"
              )}
            >
              {getNameConversation()}
            </span>
          </div>
          <div className="flex flex-nowrap">
            <span
              className={clsx(
                Styles.textChat,
                !checkIsReadLastMessage() && Styles.textNotRead
              )}
            >
              {getContentLastMessage()}
            </span>
            <span className={clsx(Styles.textChat, "relative bottom-1 pl-1")}>
              .
            </span>
            <span className={clsx(Styles.textChat)}>1 giờ</span>
          </div>
        </div>
        <div
          className={clsx(
            Styles.seensImageWraper,
            "flex-shrink-0 container-seen"
          )}
        >
          {!checkIsReadLastMessage() ? (
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#1876f2",
              }}
            ></div>
          ) : (
            <Avatar.Group size="small">
              {getDatSeenMessage()?.map((user: any, index: number) => (
                <CustomAvatar key={index} src={user?.avatar_url} size={16} />
              ))}
            </Avatar.Group>
          )}
        </div>
      </div>
      <Popover
        content={<SettingConversation conversation_id={item?.conversation_id} />}
        placement="rightTop"
        trigger="click"
      >
        <div className={Styles.iconMore}>
          <BsThreeDots style={{ fontWeight: "bold", fontSize: 22 }} />
        </div>
      </Popover>
    </div>
  );
};
export default ConversationItem;
