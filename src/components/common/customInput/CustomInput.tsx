import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface PropsType {
  label?: any;
  placeholder?: string;
  type?: string;
  onChange?: any;
  name?: string;
  value?: string;
}

function CustomInput({
  label,
  placeholder,
  type,
  onChange,
  name,
  value,
}: PropsType) {
  return (
    <FlexIcon>
      <label>{label}</label>
      <InputField
        name={name}
        onChange={onChange}
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
      ></InputField>
    </FlexIcon>
  );
}

const FlexIcon = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const InputField = styled.input`
  border: none;
  width: 90%;
  height: 40px;
  outline: none;
  padding-left: 10px;
`;

export default CustomInput;
