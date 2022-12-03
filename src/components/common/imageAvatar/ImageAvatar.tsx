import React from "react";
import styled from "styled-components";
import { SlUser } from "react-icons/sl";
interface PropsTypes {
  src?: string;
}

function ImageAvatar({ src }: PropsTypes) {
  return (
    <>
      {src ? (
        <ImageData src={src} alt=""></ImageData>
      ) : (
        <SlUser color="white" />
      )}
    </>
  );
}

const ImageData = styled.img`
  height: 50px;
  width: 50px;
`;

export default ImageAvatar;
