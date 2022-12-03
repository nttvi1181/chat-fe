import useSearchMessage from "@/hooks/useSearchMessage";
import React from "react";
import ListMessageSearchItem from "./ListMessageSearchItem";
import Styles from "./style.module.scss";

type Props = {};

const ListMessageSearch = (props: Props) => {
  const { listMessageSearch } = useSearchMessage();
  return (
    <div className={Styles.main}>
      <div className="h-1/5">
        <div className="py-5">
          <span className="font-bold text-base">Kết quả tìm kiếm</span>
          <br />
          <span>Đang hiện thị {listMessageSearch?.length} kết quả phù hợp</span>
        </div>
        <div className="py-3">
          <span className="font-medium">Tin nhắn</span>
        </div>
      </div>
      <div className="overflow-y-scroll h-4/5 py-4">
        {listMessageSearch?.map((item, index: number) => (
          <ListMessageSearchItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ListMessageSearch;
