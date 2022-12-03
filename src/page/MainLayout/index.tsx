import React from "react";
import withAuth from "../../components/common/WithAuth/WithAuth";
import useProfile from "../../hooks/useProfile";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content";
import ModalProfile from "@/container/ModalProfile";
import ModalCreateConversation from "@/container/ModalCreateConversation";
import ModaAddMemberConversation from "@/container/ModaAddMemberConversation";
import useUi from "@/hooks/useUi";
function Home() {
  const { addMemberGroupChat } = useUi();

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sidebar />
        <Content />
        <ModalProfile />
        <ModalCreateConversation />
        {addMemberGroupChat && <ModaAddMemberConversation />}
      </Layout>
    </>
  );
}

export default withAuth(Home);
