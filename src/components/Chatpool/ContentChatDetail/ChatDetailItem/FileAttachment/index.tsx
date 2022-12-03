import { dowloadFile } from "@/utils/helper";
import { Space } from "antd";
import clsx from "clsx";
import React from "react";
import { GrDocumentText } from "react-icons/gr";

type Props = {
  isOwner: boolean;
  content: string;
  isHeaderMessageOfBlock?: boolean;
  isFinalMessageOfBlock?: boolean;
  isMessageReply?: boolean;
};

const FileAttachment = ({
  isOwner,
  content,
  isHeaderMessageOfBlock,
  isFinalMessageOfBlock,
  isMessageReply,
}: Props) => {
  const files = JSON.parse(content);
  const handleDownloadFile = (url: string, type: string, name: string) => {
    dowloadFile(url, type, name);
  };
  return (
    <div className={clsx("py-2 px-3 rounded-lg bg-slate-300")}>
      {files?.map((file: any) => (
        <Space className={clsx(isOwner ? "flex-row" : "flex-row-reverse")}>
          <div className="cursor-pointer">
            <GrDocumentText
              size={16}
              onClick={() => handleDownloadFile(file.url, file.type, file.name)}
            />
          </div>
          <div className="cursor-pointer">
            <span
              style={{
                display: "inline-block",
                maxWidth: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {file?.name}
            </span>
            <br />
            <span>{(file?.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        </Space>
      ))}
    </div>
  );
};

export default FileAttachment;
