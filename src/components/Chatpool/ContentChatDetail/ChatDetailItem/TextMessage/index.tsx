import React from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { getUrlLinks, setURL } from "@/utils/helper";
import style from "../style.module.scss";
import clsx from "clsx";
type Props = {
  isOwner: boolean;
  content: string;
  isHeaderMessageOfBlock?: boolean;
  isFinalMessageOfBlock?: boolean;
  isMessageReply?: boolean;
};

const TextMessage = ({
  isOwner,
  content,
  isHeaderMessageOfBlock,
  isFinalMessageOfBlock,
  isMessageReply,
}: Props) => {
  const links = getUrlLinks(content || "");
  let className = "";
  if (isOwner) {
    className = " rounded-l-2xl ";
    if (isHeaderMessageOfBlock) {
      className += " rounded-br-2xl ";
    }

    if (isFinalMessageOfBlock) {
      className += " rounded-tr-2xl ";
    }
  } else {
    className = " rounded-r-2xl ";
    if (isHeaderMessageOfBlock) {
      className += " rounded-bl-2xl ";
    }

    if (isFinalMessageOfBlock) {
      className += " rounded-tl-2xl ";
    }
  }

  if (isMessageReply) className = "rounded-2xl";
  return (
    <div
      className={clsx("py-2 px-3", className)}
      style={{
        minHeight: 36,
        backgroundColor: isMessageReply
          ? "#f6f9fa"
          : !isOwner
          ? "#e4e6eb"
          : "#F1B792",
        color: isMessageReply ? "#65676b" : !isOwner ? "#050505" : "#fff",
        whiteSpace: "pre-wrap",
      }}
    >
      <span
        className={style.content_text_massage}
        dangerouslySetInnerHTML={{ __html: setURL(content || "") }}
      />
      {links.length > 0 && <LinkPreview url={links[0]} imageHeight={100} />}
    </div>
  );
};

export default TextMessage;
