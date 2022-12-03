import React from "react";
import useUi from "@/hooks/useUi";
import { Avatar, Button, Col, Modal, Row } from "antd";
import { Profile } from "@/interfaces/user";
type Props = {
  info: Profile | null;
};

const FormViewProfile = ({ info }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <div>
          <Avatar size={72} src={info?.avatar_url || "/avatar-default.png"} />
        </div>
        <div>
          <span style={{ fontSize: 18, color: "#050505", fontWeight: 500 }}>
            {info?.username}
          </span>
        </div>
      </div>
      <div style={{ minHeight: 280 }} className="mt-3">
        <Row>
          <Col>
            <span style={{ fontSize: 14, color: "#050505", fontWeight: 500 }}>
              Thông tin cá nhân
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={9}>
            <span style={{ fontSize: 14, color: "#72808e", fontWeight: 400 }}>
              Điện thoại
            </span>
          </Col>
          <Col>
            <span style={{ fontSize: 14, color: "#050505", fontWeight: 400 }}>
              {info?.phone}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={9}>
            <span style={{ fontSize: 14, color: "#72808e", fontWeight: 400 }}>
              Giới tính
            </span>
          </Col>
          <Col>
            <span style={{ fontSize: 14, color: "#050505", fontWeight: 400 }}>
              {info?.gender}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={9}>
            <span style={{ fontSize: 14, color: "#72808e", fontWeight: 400 }}>
              Ngày sinh
            </span>
          </Col>
          <Col>
            <span style={{ fontSize: 14, color: "#050505", fontWeight: 400 }}>
              {`${info?.birthday?.split("/")[0]} tháng ${
                info?.birthday?.split("/")?.[1]
              }, ${info?.birthday?.split("/")?.[2]}`}
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FormViewProfile;
