import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { Input, Space } from "antd";

const { Search } = Input;

function SearchUserChat() {
  const onSearch = (value: string) => console.log(value);
  return (
    <Container>
      <Search placeholder="Tìm kiếm" allowClear onSearch={onSearch} />
    </Container>
  );
}

const Container = styled.div`
  height: 50px;
  width: 100%;
  padding: 5px 20px;
`;

export default SearchUserChat;
