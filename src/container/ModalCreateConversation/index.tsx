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
import React, { useState } from "react";
import UserService from "@/services/userApi";
import ImgCrop from "antd-img-crop";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import useProfile from "@/hooks/useProfile";
import { createConversationId } from "@/utils/helper";
import useChatDetail from "@/hooks/useChatDetail";
import _ from "lodash";
const ModalCreateConversation = () => {
  const { currentUser } = useProfile();
  const { setChatDetailInfo } = useChatDetail();
  const { setIsOpenCreateGroupChat, setCurrentPage, isOpenCreateGroupChat } =
    useUi();
  const [listUser, setListUser] = useState([]);
  const [listUserSelected, setListUserSelected] = useState<Array<any>>([]);
  const [name, setName] = useState("");
  const [fileAvatar, setFileAvatar] = useState<any>(null);
  const onRemoveSelectUser = (userId: string) => {
    setListUserSelected(listUserSelected.filter((us) => us?._id !== userId));
  };

  const onChangeInputSearch = async (e: any) => {
    try {
      const value = e.target.value;
      const { data } = await UserService.search({ searchKey: value });
      setListUser(data?.filter((user:any) => user._id !== currentUser?._id) ?? []);
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

  const handleChangeAvatar: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      return;
    }
    setFileAvatar(info.file.originFileObj);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("File không đúng định dạng");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("File phải nhỏ hơn 5Mb");
    }
    return isLt5M && isJpgOrPng;
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

  const handCreateGroup = () => {
    const conversation_id = createConversationId(
      _.uniq([...listUserSelected?.map((user) => user?._id), currentUser?._id])
    );
    const data = {
      conversation_info: {
        conversation_id: conversation_id,
        origin_conversation_id: null,
        conversation_name: getNameConversation(),
        conversation_avatar: getAvatarConversation(),
        conversation_members: _.uniq([
          ...listUserSelected?.map((user) => user?._id),
          currentUser?._id,
        ]),
      },
      list_messages: [],
    };
    setChatDetailInfo(data);
    setCurrentPage("CHAT");
    setIsOpenCreateGroupChat(false);
  };

  return (
    <Modal
      title="Tạo nhóm"
      width={350}
      open={isOpenCreateGroupChat}
      onCancel={() => setIsOpenCreateGroupChat(false)}
      okButtonProps={{
        style: { display: listUserSelected?.length ? "inline" : "none" },
      }}
      onOk={handCreateGroup}
    >
      {/* <Row gutter={8}>
        <Col span={3}>
          <ImgCrop shape="round" quality={1} rotate>
            <Upload
              onChange={handleChangeAvatar}
              showUploadList={false}
              beforeUpload={beforeUpload}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              accept="image/jpg, image/png, image/jpeg"
            >
              {fileAvatar ? (
                <Avatar src={URL.createObjectURL(fileAvatar)} />
              ) : (
                <img src="/camera-icon.png" />
              )}
            </Upload>
          </ImgCrop>
        </Col>
        <Col span={21}>
          <Input
            className="w-100"
            placeholder="Nhập tên nhóm"
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
      </Row> */}
      <Row gutter={8} className="mt-3">
        <Col span={24}>Thêm bạn vào nhóm</Col>
        <Col span={24}>
          <Search onChange={onChangeInputSearch} />
        </Col>
      </Row>
      <Row className="mt-3">
        <span className="font-bold">Tất cả</span>
      </Row>
      <Row style={{ height: 350, overflowY: "auto", overflowX: "hidden" }}>
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
    </Modal>
  );
};

export default React.memo(ModalCreateConversation);
