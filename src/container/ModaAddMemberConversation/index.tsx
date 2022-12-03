import useUi from "@/hooks/useUi";
import CustomAvatar from "@/components/common/CustomAvatar";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Input,
  message,
  Modal,
  notification,
  Row,
  Space,
  Tag,
  Upload,
  UploadProps,
} from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import UserService from "@/services/userApi";
import ImgCrop from "antd-img-crop";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import useProfile from "@/hooks/useProfile";
import { createConversationId } from "@/utils/helper";
import useChatDetail from "@/hooks/useChatDetail";
import _ from "lodash";
import { ConversationService } from "@/services/conversation.service";
import { AiFillCloseCircle } from "react-icons/ai";
const ModalCreateConversation = () => {
  const { currentUser } = useProfile();
  const { setChatDetailInfo } = useChatDetail();
  const { setIsOpenAddMemberGroupChat, addMemberGroupChat } = useUi();
  const [listUser, setListUser] = useState([]);
  const [listUserSelected, setListUserSelected] = useState<Array<any>>([]);
  const [listUserCurrent, setListUserCurrent] = useState([]);
  const onRemoveSelectUser = (userId: string) => {
    setListUserSelected(listUserSelected.filter((us) => us?._id !== userId));
  };

  useEffect(() => {
    handleGetInfoConversation();
  }, []);

  const handleGetInfoConversation = async () => {
    try {
      const { data } = await ConversationService.getInfoConversation(
        addMemberGroupChat?.conversation_id ?? ""
      );
      setListUserCurrent(data?.members);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInputSearch = async (e: any) => {
    try {
      const value = e.target.value;
      const { data } = await UserService.search({ searchKey: value });
      setListUser(
        data?.filter(
          (user: any) =>
            !addMemberGroupChat?.conversation_members?.includes(user?._id)
        ) ?? []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSelectUser = (value: boolean, user: any) => {
    if (value) {
      setListUserSelected([...listUserSelected, user]);
    } else {
      setListUserSelected(
        listUserSelected.filter((us) => us?._id !== user._id)
      );
    }
  };

  const getNameConversation = () => {
    return listUserSelected
      ?.filter((member: any) => member._id !== currentUser?._id)
      ?.map((member: any) => member?.username)
      ?.join(", ");
  };

  const getAvatarConversation = () => {
    return listUserSelected
      ?.filter((member: any) => member._id !== currentUser?._id)
      ?.map((member: any) => member?.avatar_url);
  };

  const handAddMemberGroup = async () => {
    try {
      const response: any = await ConversationService.addMember({
        conversation_id: addMemberGroupChat?.conversation_id,
        userIds: listUserSelected?.map((user) => user._id),
      });
      if (response?.code === 3) {
        message.warning("Nhóm đã tồn tại");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handRemoveMemberGroup = async (userId: string) => {
    try {
      const response: any = await ConversationService.removeMember({
        conversation_id: addMemberGroupChat?.conversation_id,
        userId,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Thêm thành viên"
      width={350}
      open={!!addMemberGroupChat}
      onCancel={() => setIsOpenAddMemberGroupChat(null)}
      okButtonProps={{
        style: { display: listUserSelected?.length ? "inline" : "none" },
      }}
      onOk={handAddMemberGroup}
    >
      <Row gutter={8} className="mt-3">
        <Col span={24}>Thêm bạn vào nhóm</Col>
        <Col span={24}>
          <Search onChange={onChangeInputSearch} />
        </Col>
      </Row>
      <Row className="mt-3">
        <span className="font-bold">Tất cả</span>
      </Row>
      <Row style={{ height: 200, overflowY: "auto", overflowX: "hidden" }}>
        <Col span={16}>
          {listUser?.map((user: any, index: number) => (
            <div key={user?._id}>
              <Space className="mt-3">
                <span>
                  <Checkbox
                    onChange={(e) => onChangeSelectUser(e.target.checked, user)}
                    checked={listUserSelected?.some(
                      (u) => u?._id === user?._id
                    )}
                  />
                </span>
                <span>
                  <CustomAvatar src={user?.avatar_url} />
                </span>
                <span>{user?.username}</span>
              </Space>
            </div>
          ))}
        </Col>
        <Col span={8}>
          {listUserSelected?.map((user: any) => (
            <div className="mt-2">
              <Tag closable onClose={() => onRemoveSelectUser(user?._id)}>
                {user?.username}
              </Tag>
            </div>
          ))}
        </Col>
      </Row>
      <Row>Danh sách thành viên trong phòng</Row>
      <Row>
        <Col
          span={24}
          style={{
            height: 200,
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {listUserCurrent?.map((user: any) => (
            <Space className="mt-3">
              <span>
                <CustomAvatar src={user?.avatar_url} />
              </span>
              <span>{user?.username}</span>
              <span>
                <AiFillCloseCircle
                  className="cursor-pointer"
                  onClick={() => handRemoveMemberGroup(user?._id)}
                />
              </span>
            </Space>
          ))}
        </Col>
      </Row>
    </Modal>
  );
};

export default React.memo(ModalCreateConversation);
