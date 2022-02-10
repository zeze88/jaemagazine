import React from "react";
import styled from "styled-components";

const TextArea = (props) => {
  const { id, width, height, row, placeholder, onChange } = props;
  const styles = {
    width: width,
    height: height,
    row: row,
  };
  return (
    <TextStyle
      {...styles}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      className="border mb-6"
      value={props.value}></TextStyle>
  );
};
const TextStyle = styled.textarea`
  resize: none;
  padding: 16px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

TextArea.defaultProps = {
  id: "",
  width: "100%",
  height: "300px",
  post_content: "안녕여러분",
  placeholder: "입력해주세요",
  onchange: () => {},
  row: 5,
};
export default TextArea;
