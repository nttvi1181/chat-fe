import React from "react";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import { createConversationId } from "@/utils/helper";
import useChatDetail from "@/hooks/useChatDetail";
import useUi from "@/hooks/useUi";
import { MdOutlineContactSupport } from "react-icons/md";
import { USER_ID_ADMIN } from "@/constant";

function SettingPopup() {
  const { onLogout } = useAuth();
  const { setCurrentPage } = useUi();
  const { setChatDetailInfo } = useChatDetail();
  const { currentUser } = useProfile();
  const onClickSupport = () => {
    const userAdminId = USER_ID_ADMIN;
    if (!currentUser) return;
    const conversation_id = createConversationId([
      currentUser._id,
      userAdminId,
    ]);
    const data = {
      conversation_info: {
        conversation_id: conversation_id,
        origin_conversation_id: null,
        conversation_name: "Admin",
        conversation_avatar: [currentUser.avatar_url],
        conversation_members: [currentUser._id, userAdminId],
      },
      list_messages: [],
    };
    setChatDetailInfo(data);
    setCurrentPage("CHAT");
  };
  return (
    <Container>
      <FlexItem>
        <AiOutlineUser />
        <TextAlign>Thông tin tài khoản</TextAlign>
      </FlexItem>
      <FlexItem>
        <GrLanguage />
        <TextAlign>Ngôn ngữ</TextAlign>
      </FlexItem>
      {currentUser?._id !== USER_ID_ADMIN && (
        <FlexItem>
          <MdOutlineContactSupport />
          <TextAlign onClick={onClickSupport}>Hỗ trợ</TextAlign>
        </FlexItem>
      )}

      <FlexItem>
        <BiLogOut />
        <TextAlign onClick={onLogout}>Đăng xuất</TextAlign>
      </FlexItem>
    </Container>
  );
}

const FlexItem = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 150px;
`;
const TextAlign = styled.div`
  margin-left: 10px;
`;

export default SettingPopup;
