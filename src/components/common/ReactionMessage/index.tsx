import { TYPE_REACTION } from "@/utils/enum";
import { Col, Row } from "antd";
import React from "react";

type Props = {
  onClick: (type: TYPE_REACTION) => void;
};

const ReactionMessage = ({ onClick }: Props) => {
  const handleReaction = (type: TYPE_REACTION) => {
    onClick(type);
  };

  return (
    <Row
      gutter={8}
      style={{
        height: 52,
        padding: "8px 12px",
        backgroundColor: "#fff",
        borderRadius: 24,
        boxShadow:
          "0 12px 28px 0 #00000033,0 2px 4px 0 #0000001a,inset 0 0 0 1px #ffffff80",
      }}
    >
      <Col className="cursor-pointer">
        <img
          style={{ width: 32, height: 32 }}
          src="/heart-reaction.png"
          onClick={() => handleReaction(TYPE_REACTION.HEART)}
        />
      </Col>
      <Col className="cursor-pointer">
        <img
          style={{ width: 32, height: 32 }}
          src="/haha-reaction.png"
          onClick={() => handleReaction(TYPE_REACTION.HAHA)}
        />
      </Col>
      <Col className="cursor-pointer">
        <img
          style={{ width: 32, height: 32 }}
          src="/wow-reaction.png"
          onClick={() => handleReaction(TYPE_REACTION.WOW)}
        />
      </Col>
      <Col className="cursor-pointer">
        <img
          style={{ width: 32, height: 32 }}
          src="/sad-reaction.png"
          onClick={() => handleReaction(TYPE_REACTION.SAD)}
        />
      </Col>
      <Col className="cursor-pointer">
        <img
          style={{ width: 32, height: 32 }}
          src="/angry-reaction.png"
          onClick={() => handleReaction(TYPE_REACTION.ANGRY)}
        />
      </Col>
      <Col className="cursor-pointer">
        <img
          style={{ width: 32, height: 32 }}
          src="/like-reaction.png"
          onClick={() => handleReaction(TYPE_REACTION.LIKE)}
        />
      </Col>
    </Row>
  );
};

export default ReactionMessage;
