import React from "react";
import Contacts from "@/components/Contacts";
import { Profile } from "@/interfaces/user";

type Props = {
  data: Array<Profile>;
};

const ContactsContainer = ({ data }: Props) => {
  return <Contacts data={data} />;
};

export default ContactsContainer;
