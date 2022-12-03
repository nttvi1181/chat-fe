import useChatDetail from "@/hooks/useChatDetail";
import { ConversationService } from "@/services/conversation.service";
import { Col, Row, Tooltip } from "antd";
import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsFillPinAngleFill } from "react-icons/bs";

type Props = {
  message: any;
};

const MessagePinned = ({ message }: Props) => {
  const { conversation_info } = useChatDetail();
  const messagePinned = message;
  const handleUnpinMessage = async () => {
    try {
      ConversationService.unPinMessage({
        message: messagePinned,
        conversation_id: conversation_info.conversation_id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row justify="space-between" className="items-center relative">
      <Col span={24}>
        <Row>
          <Col span={20}>
            <Row className="items-center">
              <Col className="pr-2">
                <BiMessageRoundedDetail color="#0084ff" size={24} />
              </Col>
              <Col className="flex flex-col justify-center round">
                <div
                  style={{
                    fontSize: 14,
                    color: "#050505",
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                >
                  Tin nhắn
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#65676B",
                    fontWeight: "normal",
                    lineHeight: 1.5,
                  }}
                >
                  {messagePinned?.sender_id?.username}: {messagePinned?.content}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={4} className="flex items-center justify-center">
            <div className="flex items-center justify-center h-full cursor-pointer">
              <Tooltip title="bỏ ghim">
                <BsFillPinAngleFill size={20} onClick={handleUnpinMessage} />
              </Tooltip>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MessagePinned;
