import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import styled from "styled-components";
interface PropsType {
  label?: any;
  placeholder?: string;
  type?: string;
  onChange?: any;
  name?: string;
  value?: any;
}

function CustomDate({
  label,
  placeholder,
  type,
  onChange,
  name,
  value,
}: PropsType) {
  const dateFormat = "MM-DD-YYYY";

  return (
    <FlexIcon>
      {" "}
      <label>{label}</label>
      <DatePicker
        onChange={(e) => {
          onChange(e);
        }}
        name={name}
        placeholder={placeholder}
        value={value}
        format={dateFormat}
        style={{
          width: "90%",
          height: "40px",
          outline: "none",
          paddingLeft: "10px",
          border: "none",
        }}
      />
    </FlexIcon>
  );
}

const DateField = styled.div`
  border: none;
  width: 90%;
  height: 40px;
  outline: none;
  padding-left: 10px;
`;
const FlexIcon = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default CustomDate;
