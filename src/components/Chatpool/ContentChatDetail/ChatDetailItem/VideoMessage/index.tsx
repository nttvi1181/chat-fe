import React from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { dowloadFile, getUrlLinks, setURL } from "@/utils/helper";
import style from "../style.module.scss";
import clsx from "clsx";
import { Col, Row } from "antd";
import useUi from "@/hooks/useUi";
import { BsFillCloudDownloadFill } from "react-icons/bs";
type Props = {
  isOwner: boolean;
  content: string;
  isHeaderMessageOfBlock?: boolean;
  isFinalMessageOfBlock?: boolean;
  isMessageReply?: boolean;
};

const VideoMessage = ({
  isOwner,
  content,
  isHeaderMessageOfBlock,
  isFinalMessageOfBlock,
  isMessageReply,
}: Props) => {
  const files = JSON.parse(content);
  const handleDownVideo = async (url: string) => {
    dowloadFile(url, "video/mp4", "video.mp4");
  };
  return (
    <Row gutter={[4, 4]} className="flex-row-reverse">
      {files?.map((url: string, index: number) => (
        <Col className="w-96 h-48 flex" key={index}>
          {isOwner && (
            <div>
              <BsFillCloudDownloadFill
                className="cursor-pointer"
                onClick={() => handleDownVideo(url)}
              />
            </div>
          )}
          <div className={clsx("rounded-md overflow-hidden w-full h-full")}>
            <video
              controls
              style={{ objectFit: "cover" }}
              className="w-full h-full"
              src={url}
            />
          </div>
          {!isOwner && (
            <div>
              <BsFillCloudDownloadFill
                className="cursor-pointer"
                onClick={() => handleDownVideo(url)}
              />
            </div>
          )}
        </Col>
      ))}
    </Row>
  );
};

export default VideoMessage;
