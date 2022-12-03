import useChatDetail from "@/hooks/useChatDetail";
import { Button, Col, Row, Tooltip } from "antd";
import React from "react";
import { Input, Space } from "antd";
import useUi from "@/hooks/useUi";
import { MessageService } from "@/services/message.service";
import useSearchMessage from "@/hooks/useSearchMessage";
const { Search } = Input;
type Props = {};

const SearchMessage = ({}: Props) => {
  const { setIsSearchChat } = useUi();
  const { conversation_info } = useChatDetail();
  const { setListMessageSearch } = useSearchMessage();

  const handleCloseSearch = () => {
    setIsSearchChat(false);
    setListMessageSearch([]);
  };

  const onSearch = async (value: string) => {
    try {
      if (!conversation_info?.conversation_id) return;
      const { data } = await MessageService.searchByContent(
        conversation_info?.conversation_id,
        value
      );
      setListMessageSearch(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row justify="space-between" className="items-center relative">
      <Col span={24}>
        <Row>
          <Col className="flex item-center justify-center" span={24}>
            <div className="mt-3 w-2/3 mx-auto flex">
              <Search
                style={{ width: "100%" }}
                allowClear
                onSearch={onSearch}
              />
              <Button onClick={handleCloseSearch}>Hủy</Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SearchMessage;
