import React from "react";
import { Layout } from "antd";
import useChatDetail from "@/hooks/useChatDetail";
import InputChat from "./InputChat";
import HeaderChatDetail from "./HeaderChatDetail";
import ContentChatDetail from "./ContentChatDetail";
import MessagePinned from "./MessagePinned";
import SearchMessage from "./SearchMessage";
import useUi from "@/hooks/useUi";
const { Content, Header, Footer } = Layout;
type Props = {};

const Chatpool = (props: Props) => {
  const { conversation_info } = useChatDetail();
  const { isSearchChat } = useUi();

  return (
    <Layout style={{ height: "100vh" }}>
      {conversation_info?.conversation_id ? (
        <>
          <Header style={style.header}>
            <HeaderChatDetail />
          </Header>
          {!!conversation_info?.message_pinned?.length && (
            <Header style={{ ...style.header, height: 45 }}>
              <MessagePinned
                message={
                  conversation_info?.message_pinned[
                    conversation_info?.message_pinned?.length - 1
                  ]
                }
              />
            </Header>
          )}
          {isSearchChat && (
            <Header style={{ ...style.header }}>
              <SearchMessage />
            </Header>
          )}
          <Content style={style.content as any}>
            <ContentChatDetail />
          </Content>
          <Footer style={style.footer}>
            <InputChat />
          </Footer>
        </>
      ) : (
        <div
          style={{
            height: "100vh",
            color: "#65676b",
            fontSize: 20,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
        </div>
      )}
    </Layout>
  );
};

const style = {
  header: {
    height: 64,
    backgroundColor: "#fff",
    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
    padding: "0px 16px",
  },
  content: {
    backgroundColor: "#fff",
    padding: "0 0 20px 0",
    overflowY: "hidden",
  },
  footer: { backgroundColor: "#fff", padding: "0 0 8px 0" },
};

export default Chatpool;
