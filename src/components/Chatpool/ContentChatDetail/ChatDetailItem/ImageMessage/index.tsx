import React from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { getUrlLinks, setURL } from "@/utils/helper";
import style from "../style.module.scss";
import clsx from "clsx";
import { Col, Row } from "antd";
import useUi from "@/hooks/useUi";
type Props = {
  isOwner: boolean;
  content: string;
  isHeaderMessageOfBlock?: boolean;
  isFinalMessageOfBlock?: boolean;
  isMessageReply?: boolean;
};

const ImageMessage = ({
  isOwner,
  content,
  isHeaderMessageOfBlock,
  isFinalMessageOfBlock,
  isMessageReply,
}: Props) => {
  const files = JSON.parse(content);
  const { setImagePreview } = useUi();
  return (
    <Row gutter={[4, 4]} className="flex-row-reverse">
      {files?.map((url: string, index: number) => (
        <Col className="w-32 h-32" key={index}>
          <div className={clsx("rounded-md overflow-hidden w-full h-full")}>
            <img
              style={{ objectFit: "cover" }}
              className="w-full h-full"
              src={url}
              onClick={() => {
                if (isMessageReply) return;
                setImagePreview(url);
              }}
            />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ImageMessage;
