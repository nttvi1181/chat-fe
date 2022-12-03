import React, { useEffect, useState } from "react";
import useUi from "@/hooks/useUi";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  message,
  Modal,
  Row,
  Space,
  UploadProps,
} from "antd";
import { Input } from "antd";
import { Radio } from "antd";
import moment from "moment";
import { FORMAT_DATE } from "@/constant";
import { Upload } from "antd";
import styled from "styled-components";
import ImgCrop from "antd-img-crop";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import { Profile } from "@/interfaces/user";

type Props = { onUpdate: (value: any) => void; info: Profile | null };

const FormEditProfile = ({ onUpdate, info }: Props) => {
  const [loading, setLoading] = useState(false);
  const [infoUser, setInfoUser] = useState<any>({
    ...(info ? info : {}),
    fileAvatar: null,
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onUpdate(infoUser);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChangeValue = (keyName: string, value: string) => {
    setInfoUser((prev: any) => ({ ...prev, [keyName]: value }));
  };

  const handleChangeAvatar: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      return;
    }
    setInfoUser((prev: any) => ({
      ...prev,
      fileAvatar: info.file.originFileObj,
    }));
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
    if (isLt5M && isJpgOrPng) {
      setInfoUser((prev: any) => ({ ...prev, fileAvatar: file }));
    }

    return isLt5M && isJpgOrPng;
  };

  useEffect(() => {
    setInfoUser((prev: any) => ({ ...info, fileAvatar: null }));
    return () => setInfoUser(null);
  }, [info]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Avatar
            size={72}
            src={
              infoUser?.fileAvatar
                ? URL.createObjectURL(infoUser?.fileAvatar)
                : infoUser?.avatar_url || "/avatar-default.png"
            }
          />
          <div
            style={{ width: 26, height: 26 }}
            className="absolute bottom-0 right-0 cursor-pointer"
          >
            <ImgCrop shape="round" quality={1} rotate>
              <Upload
                onChange={handleChangeAvatar}
                showUploadList={false}
                beforeUpload={beforeUpload}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                accept="image/jpg, image/png, image/jpeg"
              >
                <img src="/camera-icon.png" />
              </Upload>
            </ImgCrop>
          </div>
        </div>
      </div>
      <Row className="mt-1">
        <Col>
          <TextLabelComponent>Tên hiện thị</TextLabelComponent>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col span={24}>
          <Input
            value={infoUser?.username}
            placeholder="Nhập tên hiện thị"
            onChange={(e) => onChangeValue("username", e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <TextLabelComponent className="font-medium">
            Thông tin cá nhân
          </TextLabelComponent>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col span={9}>
          <TextLabelComponent color="#72808e">Giới tính</TextLabelComponent>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col span={9}>
          <Radio.Group
            value={infoUser?.gender}
            onChange={(e) => onChangeValue("gender", e.target.value)}
          >
            <Space>
              <Radio value="Nam">Nam</Radio>
              <Radio value="Nữ">Nữ</Radio>
            </Space>
          </Radio.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col span={9}>
          <TextLabelComponent color="#72808e"> Ngày sinh</TextLabelComponent>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col span={24}>
          <DatePicker
            style={{ width: "100%" }}
            format={FORMAT_DATE}
            value={
              infoUser?.birthday
                ? moment(infoUser?.birthday, FORMAT_DATE)
                : undefined
            }
            onChange={(e) =>
              onChangeValue("birthday", e ? e.format(FORMAT_DATE) : "")
            }
          />
        </Col>
      </Row>
      <Row className="mt-7">
        <Col span={24}>
          <Space>
            <Button>Hủy</Button>
            <Button
              type="primary"
              disabled={!infoUser?.username}
              loading={loading}
              onClick={handleSubmit}
            >
              Cập nhật
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

const TextLabelComponent = styled.span`
  font-size: 14;
  color: ${(props) => (props.color ? props.color : "#050505")};
  font-weight: 400;
`;

export default FormEditProfile;
