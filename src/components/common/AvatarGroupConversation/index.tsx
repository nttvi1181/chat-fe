import { Avatar } from "antd";
import React from "react";

type Props = {
  avatar1: string | undefined;
  avatar2: string | undefined;
};

const AvatarGroupCustom = ({ avatar1, avatar2 }: Props) => {
  return (
    <div className="relative" style={{ width: 48, height: 48 }}>
      <Avatar
        className="left-0 bottom-0 z-10 border-white border-solid border-2 "
        style={{ position: "absolute", boxSizing: "content-box" }}
        size={32}
        src={avatar1 || "/avatar-default.png"}
      />
      <Avatar
        className="right-0 top-0"
        style={{ position: "absolute" }}
        size={32}
        src={avatar2 || "/avatar-default.png"}
      />
    </div>
  );
};

export default AvatarGroupCustom;
