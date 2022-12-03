import { Layout } from "antd";
const { Sider, Content, Header, Footer } = Layout;
import React from "react";
import ChatPoolContainer from "./ChatPoolContainer";
import ConersationsContainer from "./ConersationsContainer";

type Props = {};

const ChatContainer = (props: Props) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width={350}
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <ConersationsContainer />
      </Sider>
      <Content>
        <ChatPoolContainer />
      </Content>
    </Layout>
  );
};

export default React.memo(ChatContainer);
