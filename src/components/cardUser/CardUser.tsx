import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RelationServives } from "@/services/relation.service";
import styled from "styled-components";

interface PropsType {
  username?: string;
  avatar?: string;
  _id?: string;
}

const CardUser: React.FC<PropsType> = ({ username, avatar, _id }) => {
  const handleAddFriend = async (_id: any) => {
    const res = RelationServives.sendRelation({ recive_id: _id });
  };
  return (
    <ContainerCard>
      <AvatarUser>
        <Avatar
          icon={
            <img
              src={
                avatar ||
                "https://www.pngall.com/wp-content/uploads/5/Profile.png"
              }
              alt=""
            />
          }
          size={64}
        />
      </AvatarUser>
      <TextName>{username}</TextName>
      <TextName>
        <span>Từ gợi ý kết bạn chưa có nhóm chung</span>
      </TextName>
      <BtnAccept
        onClick={() => {
          handleAddFriend(_id);
        }}
      >
        KẾT BẠN
      </BtnAccept>
    </ContainerCard>
  );
};

const ContainerCard = styled.div`
  height: 300px;
  background-color: white;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const AvatarUser = styled.div``;

const TextName = styled.div`
  font-size: 18px;
  font-weight: 600;
  width: 70%;
  span {
    font-size: 14px;
    color: #394e60;
    font-weight: 400;
  }
`;

const BtnAccept = styled.button`
  border: 1px solid #0068ff;
  width: 40%;
  height: 30px;
  border-radius: 7px;
  font-weight: 600;
  color: #0068ff;
  margin-top: 10px;
`;

export default CardUser;
