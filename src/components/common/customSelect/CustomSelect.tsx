import React from "react";
import styled from "styled-components";
import { Select } from "antd";
const { Option } = Select;
interface PropsType {
  label?: any;
  type?: string;
  onChange?: any;
  name?: string;
  value?: any;
  defaultValue?: string;
  listOption?: any;
}
function CustomSelect({
  label,
  type,
  onChange,
  name,
  defaultValue,
  listOption,
  value,
}: PropsType) {
  const handleChange = (value: string) => {
    onChange(value);
  };
  return (
    <FlexIcon>
      <label>{label}</label>
      <Select
        defaultValue={defaultValue}
        style={{
          width: "90%",
          height: "40px",
          paddingLeft: "10px",
        }}
        onChange={handleChange}
      >
        {listOption?.map((item: any, index: number) => (
          <Option key={index} value={item.value}>
            {item.name}
          </Option>
        ))}
      </Select>
    </FlexIcon>
  );
}

const FlexIcon = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default CustomSelect;
