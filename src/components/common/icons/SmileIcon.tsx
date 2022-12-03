import Icon from "@ant-design/icons";
import React from "react";
const IconSvg = () => (
  <svg height="22px" viewBox="0 0 22 22" width="22px">
    <circle
      className="xbh8q5q xmb71p3"
      cx="11"
      cy="11"
      r="7"
      stroke-width="1.5px"
    ></circle>
    <path
      className="xbh8q5q xmb71p3"
      d="M8,13Q11,16,14,13"
      stroke-width="1.5px"
    ></path>
    <circle className="x148u3ch" cx="9" cy="10" r="1.2"></circle>
    <circle className="x148u3ch" cx="13" cy="10" r="1.2"></circle>
  </svg>
);

const SmileIcon: React.FC = (props) => <Icon component={IconSvg} {...props} />;

export default SmileIcon;
