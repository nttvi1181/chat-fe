import { Spin } from "antd";
import React from "react";
import styles from "./style.module.scss";
const Loading: React.FC = () => (
  <div className={styles.spinWrapper}>
    <Spin className={styles.spin} />
  </div>
);

export default Loading;
