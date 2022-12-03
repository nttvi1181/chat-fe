import React, { useEffect } from "react";
import Styles from "./style.module.scss";
import clsx from "clsx";
import CustomAvatar from "@/components/common/CustomAvatar";
import useQueryListMessageByConversationId from "@/hooks/useQueryListMessageByConversationId";
type Props = {
  item: any;
};

const ListMessageSearchItem = ({ item }: Props) => {
  const { handleScrollToReplyMessage } = useQueryListMessageByConversationId();

  const handleClickConversationItem = () => {
    handleScrollToReplyMessage(
      item.message_id,
      item.send_time || new Date(item.createdAt).getTime()
    );
  };

  return (
    <div className={clsx(Styles.itemWraper, "relative")}>
      <div className={clsx(Styles.listItem, "container-item")}>
        <div
          className="pr-2 flex-shrink-0 container-avatar"
          onClick={() => handleClickConversationItem()}
        >
          <CustomAvatar src={item?.sender_id?.avatar_url} size={48} />
        </div>
        <div
          className="flex-1 container-content"
          onClick={() => handleClickConversationItem()}
        >
          <div>
            <span className={clsx(Styles.nameChat, "font-semibold")}>
              {item?.sender_id?.username}
            </span>
          </div>
          <div className="flex flex-nowrap">
            <span className={clsx(Styles.textChat, Styles.textNotRead)}>
              {item?.content}
            </span>
            <span className={clsx(Styles.textChat, "relative bottom-1 pl-1")}>
              .
            </span>
            <span className={clsx(Styles.textChat)}>1 giờ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListMessageSearchItem;
