import React from "react";
import Styles from "./style.module.scss";
import { Profile } from "@/interfaces/user";
import { Avatar } from "antd";

type Props = {
  profile: any;
  onClick: (data: Profile) => void;
};

const ContactItem = ({ profile, onClick }: Props) => {
  const handleClickItem = () => onClick(profile);
  console.log({ profile });

  return (
    <div className={Styles.listItem} onClick={handleClickItem}>
      <div className="pr-2">
        <Avatar
          size={48}
          src={profile?.sender_id?.avatar_url || "/avatar-default.png"}
        >
          {profile?.sender_id?.username}
        </Avatar>
      </div>
      <div>
        <div className={Styles.nameChat}>{profile?.sender_id?.username}</div>
      </div>
    </div>
  );
};

export default ContactItem;
