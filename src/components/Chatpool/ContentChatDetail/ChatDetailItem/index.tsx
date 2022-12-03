import { Avatar, Col, message, Popover, Row } from "antd";
import React, { useState } from "react";
import TextMessage from "./TextMessage";
import {
  BsCircle,
  BsCheckCircle,
  BsCheckCircleFill,
  BsEmojiSmile,
  BsReplyFill,
  BsPinFill,
} from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { showConfirm } from "@/utils/message.helper";
import ReactionMessage from "@/components/common/ReactionMessage";
import { TYPE_REACTION } from "@/utils/enum";
import useProfile from "@/hooks/useProfile";
import styles from "./style.module.scss";
import clsx from "clsx";
import ClickOutside from "@/components/common/ClickOutside";
import { SocketService } from "@/services/socket-io";
import useChatDetail from "@/hooks/useChatDetail";
import RenderReactions from "./renderReaction";
import styled from "styled-components";
import CustomAvatar from "@/components/common/CustomAvatar";
import { MessageService } from "@/services/message.service";
import { convertNumberToString } from "@/utils/helper";
import { ConversationService } from "@/services/conversation.service";
import useQueryListMessageByConversationId from "@/hooks/useQueryListMessageByConversationId";
import { UNLIMITED } from "@/constant";
import ImageMessage from "./ImageMessage";
import VideoMessage from "./VideoMessage";
import FileAttachment from "./FileAttachment";
type Props = {
  isOwner: boolean;
  username: string;
  avatar_url: string;
  content: string;
  type: string;
  isHeaderMessageOfBlock?: boolean;
  isFinalMessageOfBlock?: boolean;
  message: any;
  isSent: boolean;
};

const ChatDetailItem = ({
  isOwner,
  username,
  avatar_url,
  content,
  isHeaderMessageOfBlock,
  isFinalMessageOfBlock,
  message,
  isSent,
  type,
}: Props) => {
  const { sendReactionMessage } = SocketService();
  const { currentUser } = useProfile();
  const [isOpentReaction, setIsOpentReaction] = useState(false);
  const [isOpentActionMessage, setIsOpenActionMessage] = useState(false);
  const { conversation_info, setMessageReply, list_messages } = useChatDetail();
  const { message_reply } = message;
  const { handleScrollToReplyMessage } = useQueryListMessageByConversationId();
  const handleClickPinMessage = () => {
    try {
      ConversationService.pinMessage({
        message,
        conversation_id: conversation_info.conversation_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickReplyMessage = () => {
    setMessageReply(message);
  };

  const handleDeleteMessage = () => {
    showConfirm(
      "Tin nhắn này sẽ bị thu hồi với mọi người trong đoạn chat",
      "ok",
      onDeleteMessage
    );
  };

  const onDeleteMessage = async () => {
    try {
      MessageService.deleteMessage(
        message._id,
        conversation_info.conversation_members
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReaction = (type: TYPE_REACTION) => {
    sendReactionMessage({
      message_id: message.message_id,
      conversation_id: conversation_info.conversation_id,
      user_id: currentUser?._id,
      type,
      conversation_members: conversation_info.conversation_members,
    });
    setIsOpentReaction(false);
    setIsOpenActionMessage(false);
  };

  const handleMoveOverMessage = () => {
    setIsOpenActionMessage(true);
  };

  const handleMoveLeaveMessage = () => {
    if (isOpentReaction) return;
    setIsOpenActionMessage(false);
    setIsOpentReaction(false);
  };

  const handleClickOutsideReaction = () => {
    setIsOpenActionMessage(false);
    setIsOpentReaction(false);
  };

  const renderIconSent = () => {
    if (!isOwner) return null;
    if (message?.member_seens?.length > 1)
      return <BsCheckCircleFill style={{ width: 14 }} />;
    return isSent ? (
      <BsCheckCircle style={{ width: 14 }} />
    ) : (
      <BsCircle style={{ width: 14 }} />
    );
  };

  const renderAvatarMessage = () => {
    return isOwner ? (
      <Col
        className="w-5 self-end flex justify-center"
        style={{ color: "#d9d9d9" }}
      >
        {renderIconSent()}
      </Col>
    ) : (
      <Col className="self-end pl-3 pr-2">
        <CustomAvatar
          visibility={isHeaderMessageOfBlock}
          src={avatar_url}
          size={28}
        />
      </Col>
    );
  };

  const renderNameAuthorMessage = () => (
    <Col span={24}>
      <Row>
        <Col className="w-14"></Col>
        <Col>
          <div
            style={{
              fontSize: 11,
              color: "#65676b",
            }}
          >
            {username}
          </div>
        </Col>
      </Row>
    </Col>
  );

  const renderContent = () => {
    switch (type) {
      case "TEXT":
        return (
          <TextMessage
            isHeaderMessageOfBlock={isHeaderMessageOfBlock}
            isFinalMessageOfBlock={isFinalMessageOfBlock}
            isOwner={isOwner}
            content={content}
          />
        );
      case "IMAGE":
        return (
          <ImageMessage
            isHeaderMessageOfBlock={isHeaderMessageOfBlock}
            isFinalMessageOfBlock={isFinalMessageOfBlock}
            isOwner={isOwner}
            content={content}
          />
        );
      case "VIDEO":
        return (
          <VideoMessage
            isHeaderMessageOfBlock={isHeaderMessageOfBlock}
            isFinalMessageOfBlock={isFinalMessageOfBlock}
            isOwner={isOwner}
            content={content}
            isMessageReply
          />
        );
      case "ATTACH":
        return (
          <FileAttachment
            isHeaderMessageOfBlock={isHeaderMessageOfBlock}
            isFinalMessageOfBlock={isFinalMessageOfBlock}
            isOwner={isOwner}
            content={content}
            isMessageReply
          />
        );
    }
  };

  const renderContentMessageReply = (message_reply: any) => {
    switch (message_reply?.type) {
      case "TEXT":
        return (
          <TextMessage
            isMessageReply
            isHeaderMessageOfBlock={isHeaderMessageOfBlock}
            isFinalMessageOfBlock={isFinalMessageOfBlock}
            isOwner={isOwner}
            content={message_reply?.content}
          />
        );
      case "IMAGE":
        return (
          <ImageMessage
            isHeaderMessageOfBlock={isHeaderMessageOfBlock}
            isFinalMessageOfBlock={isFinalMessageOfBlock}
            isOwner={isOwner}
            content={message_reply?.content}
            isMessageReply
          />
        );
      case "VIDEO":
        return (
          <VideoMessage
            isHeaderMessageOfBlock={isHeaderMessageOfBlock}
            isFinalMessageOfBlock={isFinalMessageOfBlock}
            isOwner={isOwner}
            content={message_reply?.content}
            isMessageReply
          />
        );
      case "ATTACH":
        return (
          <FileAttachment
            isHeaderMessageOfBlock={isHeaderMessageOfBlock}
            isFinalMessageOfBlock={isFinalMessageOfBlock}
            isOwner={isOwner}
            content={message_reply?.content}
            isMessageReply
          />
        );
    }
  };

  return (
    <Row
      id={convertNumberToString(message.message_id)}
      className="align-center"
      style={{
        marginTop: isFinalMessageOfBlock ? "8px" : "2px",
        marginBottom: !!message.reactions?.length ? "20px" : "0",
      }}
    >
      {!isOwner &&
        isFinalMessageOfBlock &&
        !message_reply &&
        renderNameAuthorMessage()}
      <Col span={24}>
        {message_reply && (
          <div
            className="relative top-2 cursor-pointer"
            onClick={() =>
              handleScrollToReplyMessage(
                message_reply.message_id,
                message_reply.send_time
              )
            }
          >
            <Row
              style={{
                flexDirection: isOwner ? "row-reverse" : "row",
              }}
            >
              <Col className="w-5 self-end flex justify-center"></Col>
              <Col className={clsx(styles.contentMessage)}>
                <div className="relative flex items-center">
                  <IconReplyMessage size={12} />
                  <span style={{ fontSize: 12, color: "#65676b" }}>
                    {isOwner
                      ? `Bạn đã trả lời ${message_reply.sender_id.username}`
                      : `${message.sender_id.username} đã trả lời ${message_reply.sender_id.username}`}
                  </span>
                </div>
              </Col>
            </Row>
            <Row
              style={{
                flexDirection: isOwner ? "row-reverse" : "row",
              }}
            >
              <Col
                className={clsx(
                  "self-end flex justify-center",
                  isOwner ? "w-5" : "w-11"
                )}
              ></Col>
              <Col className={clsx(styles.contentMessage)}>
                <div className="relative">
                  {renderContentMessageReply(message_reply)}
                  {/* <TextMessage
                    isMessageReply
                    isHeaderMessageOfBlock={isHeaderMessageOfBlock}
                    isFinalMessageOfBlock={isFinalMessageOfBlock}
                    isOwner={isOwner}
                    content={message_reply.content}
                  /> */}
                </div>
              </Col>
            </Row>
          </div>
        )}
        {/* end replymessage  */}
        <Row style={{ flexDirection: isOwner ? "row-reverse" : "row" }}>
          {renderAvatarMessage()}
          <Col
            className={clsx(styles.contentMessage, "content-message")}
            onMouseOver={handleMoveOverMessage}
            onMouseLeave={handleMoveLeaveMessage}
          >
            <div className="relative">
              {renderContent()}
              {!!message.reactions?.length && (
                <RenderReactions reactions={message.reactions} />
              )}
            </div>
          </Col>
          {isOpentActionMessage && (
            <Col
              className={clsx("flex items-center")}
              onMouseOver={handleMoveOverMessage}
              onMouseLeave={handleMoveLeaveMessage}
            >
              {isOwner ? (
                <div className="flex items-center justify-center">
                  <IconDeleteMessage size={16} onClick={handleDeleteMessage} />
                </div>
              ) : (
                <div className="relative flex">
                  <IconReaction
                    size={16}
                    onClick={() => setIsOpentReaction(true)}
                  />
                  <IconReplyMessage
                    size={16}
                    onClick={handleClickReplyMessage}
                  />
                  <IconPinMessage size={16} onClick={handleClickPinMessage} />
                  {isOpentReaction && (
                    <div className="absolute w-64 -top-14 left-5 z-30">
                      <ClickOutside onClickOutside={handleClickOutsideReaction}>
                        <ReactionMessage onClick={handleReaction} />
                      </ClickOutside>
                    </div>
                  )}
                </div>
              )}
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default ChatDetailItem;

const IconDeleteMessage = styled(MdDelete)`
  color: #65676b;
  font-weight: 700;
  display: block;
  margin: 0 4px;
  cursor: pointer;
`;

const IconReaction = styled(BsEmojiSmile)`
  color: #65676b;
  font-weight: 700;
  display: block;
  margin: 0 4px;
  cursor: pointer;
`;

const IconReplyMessage = styled(BsReplyFill)`
  color: #65676b;
  font-weight: 700;
  display: block;
  margin: 0 4px;
  cursor: pointer;
`;
const IconPinMessage = styled(BsPinFill)`
  color: #65676b;
  font-weight: 700;
  display: block;
  margin: 0 4px;
  cursor: pointer;
`;
