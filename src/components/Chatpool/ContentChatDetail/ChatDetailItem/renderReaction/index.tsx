import { TYPE_REACTION } from "@/utils/enum";
import React from "react";

type Props = {
  reactions: Array<any>;
};

const RenderReactions = ({ reactions }: Props) => {
  const renderReaction = () => {
    return reactions.map((reaction: any, index: number) => {
      switch (reaction.type) {
        case TYPE_REACTION.HAHA:
          return (
            <div key={index}>
              <img style={{ width: 16, height: 16 }} src="/haha-reaction.png" />
            </div>
          );
        case TYPE_REACTION.HEART:
          return (
            <img
              key={index}
              style={{ width: 16, height: 16 }}
              src="/heart-reaction.png"
            />
          );
        case TYPE_REACTION.SAD:
          return (
            <img
              key={index}
              style={{ width: 16, height: 16 }}
              src="/sad-reaction.png"
            />
          );
        case TYPE_REACTION.ANGRY:
          return (
            <img
              key={index}
              style={{ width: 16, height: 16 }}
              src="/angry-reaction.png"
            />
          );
        case TYPE_REACTION.LIKE:
          return (
            <div key={index} style={{ width: 16, height: 16 }}>
              <img src="/like-reaction.png" />
            </div>
          );
        case TYPE_REACTION.WOW:
          return (
            <img
              key={index}
              style={{ width: 16, height: 16 }}
              src="/wow-reaction.png"
            />
          );
        default:
          return null;
      }
    });
  };
  return (
    <div
      className="absolute shadow-md"
      style={{
        display: "flex",
        padding: 2,
        bottom: -14,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
      }}
    >
      {renderReaction()}
    </div>
  );
};

export default RenderReactions;
