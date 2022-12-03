import useUi from "@/hooks/useUi";
import { Avatar, Button, Col, message, Modal, notification, Row } from "antd";
import React, { useState } from "react";
import FormViewProfile from "@/components/FormViewProfile";
import FormEditProfile from "@/components/FormEditProfile";
import UserService from "@/services/userApi";
import useProfile from "@/hooks/useProfile";
import { MediaService } from "@/services/MediaService";
import { EditOutlined } from "@ant-design/icons";

const ModalProfile = () => {
  const [loading, setLoading] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { currentViewProfile, setCurrentViewProfile } = useUi();
  const { currentUser, setCurrentUser } = useProfile();

  const handleClose = () => {
    setCurrentViewProfile(null);
    setIsEditProfile(false);
  };

  const handleUpdateProfile = async (value: any) => {
    try {
      if (
        !currentViewProfile?._id ||
        currentUser?._id !== currentViewProfile?._id
      ) {
        message.error("Bạn không có quyền update");
        return;
      }

      const dataUpdate = {
        username: value.username,
        avatar_url: value.avatar_url,
        birthday: value.birthday,
        gender: value.gender,
      };

      if (value.fileAvatar) {
        const formData = new FormData();
        formData.append("fileUpload", value.fileAvatar);
        formData.append(
          `folder`,
          `/app-chat-fpt/avatar/${currentViewProfile?._id}`
        );

        const { data } = await MediaService.uploadImageAvatar(formData);
        dataUpdate.avatar_url = data.url;
      }

      const { data } = await UserService.updateInfo(
        currentViewProfile?._id,
        dataUpdate
      );
      setCurrentUser(data);
      message.success("Cập nhật thông tin thành công");
    } catch (error) {
      message.error("Cập nhật thông tin thất bại");
      throw new Error();
    }
  };

  return (
    <Modal
      title="Thông tin tài khoản"
      width={350}
      open={!!currentViewProfile}
      onCancel={handleClose}
      footer={null}
    >
      {!isEditProfile ? (
        <>
          <FormViewProfile info={currentViewProfile} />
          {currentUser?._id === currentViewProfile?._id && (
            <Row>
              <Col span={24} className="p-4 mx-auto">
                <div
                  style={{ backgroundColor: "#e5e7eb" }}
                  className="px-4 py-2 rounded-lg text-center flex items-center justify-center cursor-pointer"
                  onClick={() => setIsEditProfile(true)}
                >
                  <EditOutlined style={{ fontSize: 18, marginRight: 10 }} />
                  <span
                    style={{ fontSize: 14, color: "#050505", fontWeight: 500 }}
                  >
                    Cập nhật thông tin
                  </span>
                </div>
              </Col>
            </Row>
          )}
        </>
      ) : (
        <FormEditProfile onUpdate={handleUpdateProfile} info={currentUser} />
      )}
    </Modal>
  );
};

export default React.memo(ModalProfile);
