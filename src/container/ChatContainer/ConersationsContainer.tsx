import React from "react";
import Conversations from "@/components/Conversations";
import useUi from "@/hooks/useUi";
import ListMessageSearch from "@/components/ListMessageSearch";

type Props = {};

const ConersationsContainer = (props: Props) => {
  const { isSearchChat } = useUi();
  return isSearchChat ? <ListMessageSearch /> : <Conversations />;
};

export default ConersationsContainer;
