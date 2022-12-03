import React from "react";
import styled from "styled-components";

function ContactHeaderLayout() {
  return (
    <WrapperMain>
      <ImageFriend
        src="https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png"
        alt=""
      />
      <TextContact>Danh sách kết bạn</TextContact>
    </WrapperMain>
  );
}

const ImageFriend = styled.img`
  height: 48px;
  width: 48px;
  margin: 0px 10px;
`;

const TextContact = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const WrapperMain = styled.div`
  background-color: white;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #e5e7eb;
  border-left: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
`;

export default ContactHeaderLayout;
