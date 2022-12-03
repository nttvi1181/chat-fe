import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Typography } from "antd";
const { confirm } = Modal;
export const showConfirm = (
  msg: string,
  okeText = "Oke",
  onOK = () => {},
  onCancel = () => {}
) => {
  confirm({
    icon: <ExclamationCircleOutlined />,
    content: <Typography.Text>{msg}</Typography.Text>,
    okText: "Oke",
    cancelText: "Hủy",
    onOk() {
      onOK();
    },
    onCancel() {
      onCancel();
    },
  });
};
