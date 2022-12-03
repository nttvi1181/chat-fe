import { Avatar } from "antd";
import React from "react";

type Props = {
  className?: string;
  style?: any;
  src?: string | undefined;
  size?: number;
  visibility?: boolean;
};

const CustomAvatar = ({
  className,
  style = {},
  visibility = true,
  src,
  size = 28,
}: Props) => {
  return (
    <Avatar
      className={className}
      style={{ ...style, visibility: visibility ? "visible" : "hidden" }}
      size={size}
      src={src || "/avatar-default.png"}
    />
  );
};

export default CustomAvatar;
