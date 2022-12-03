import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import ContactsContainer from "./ListContactsContainer";
import ContactPoolContainer from "./ContactPoolContainer";
import { RelationServives } from "@/services/relation.service";
const { Sider, Content, Header, Footer } = Layout;
type Props = {};

const ContactContainer = (props: Props) => {
  const [listFriend, setListFriend] = useState<any>([]);
  const [listSuggest, setListSuggest] = useState<any>([]);
  const getListSending = async () => {
    try {
      const { data } = await RelationServives.getAllSuggest();
      setListSuggest(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getListFriend = async () => {
    try {
      const { data } = await RelationServives.getAllRelation();

      setListFriend(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListFriend();
    getListSending();
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={350} style={{ backgroundColor: "#fff" }}>
        <ContactsContainer data={listFriend} />
      </Sider>
      <Content>
        <ContactPoolContainer data={listSuggest} />
      </Content>
    </Layout>
  );
};

export default React.memo(ContactContainer);
