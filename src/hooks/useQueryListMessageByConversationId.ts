import { MessageService } from "@/services/message.service";
import { UNLIMITED } from "@/constant";
import { convertNumberToString } from "@/utils/helper";
import React, { useState } from "react";
import useChatDetail from "./useChatDetail";

type Props = {};

const useQueryListMessageByConversationId = () => {
  const { list_messages, setListMessages, conversation_info } = useChatDetail();
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMessage = async (
    params = {
      skip: 0,
      limit: 20,
      send_time: 0,
    }
  ) => {
    if (!conversation_info.conversation_id || isLoading) return;
    try {
      setIsLoading(true);
      const { data } = await MessageService.getByConversationId(
        conversation_info.conversation_id,
        params.skip,
        params.limit,
        params.send_time
      );
      setHasMore(!!data?.length);
      // check có phải loadmore hay k => nếu loadmore push => nếu không thì unshift
      if (params.skip === 0) {
        setListMessages([...data, ...Object.values(list_messages)]);
      } else {
        setListMessages([...Object.values(list_messages), ...data]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleScrollToReplyMessage = async (
    id: string,
    send_time: number
  ) => {
    const message_id = convertNumberToString(id)
    const isAvailable = Object.values(list_messages).find((message: any) => {
      return convertNumberToString(message.message_id) === message_id;
    });
    if (!isAvailable) {
      await fetchMessage({
        skip: Object.values(list_messages).length,
        limit: UNLIMITED,
        send_time,
      }); //max limit
      setTimeout(() => {
        const element: HTMLElement = document.querySelector(
          `#${message_id}`
        ) as HTMLElement;
        element?.scrollIntoView();
      }, 1000);
    } else {
      const element: HTMLElement = document.querySelector(
        `#${message_id}`
      ) as HTMLElement;
      element?.scrollIntoView();
    }
  };

  return { fetchMessage, handleScrollToReplyMessage, hasMore, isLoading };
};

export default useQueryListMessageByConversationId;
