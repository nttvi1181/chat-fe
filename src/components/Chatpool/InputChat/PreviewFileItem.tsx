import { getThumbailVideo } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

type Props = {
  file: File;
  index: number;
  onRemoveFile: (index: number) => void;
};

const PreviewFileItem = ({ file, index, onRemoveFile }: Props) => {
  const [url, setUrl] = useState("");

  const getUrlPreviewFile = async (file: File) => {
    if (file.type.includes("image")) {
      setUrl(URL.createObjectURL(file));
    }
    if (file.type.includes("video")) {
      const { imageUrl }: any = await getThumbailVideo(
        URL.createObjectURL(file),
        48,
        48,
        true
      );
      setUrl(imageUrl as string);
    }
  };

  useEffect(() => {
    getUrlPreviewFile(file);
  }, [file]);
  return (
    <div className="mx-3 inline-block relative">
      <img style={{ width: 48, height: 48 }} src={url} />
      <div className="absolute top-0 right-0 text-white cursor-pointer">
        <AiFillCloseCircle size={16} onClick={() => onRemoveFile(index)} />
      </div>
    </div>
  );
};
export default PreviewFileItem;
