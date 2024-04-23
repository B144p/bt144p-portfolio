import { ApiOutlined, BugFilled } from "@ant-design/icons";
import React from "react";
import "./scss/ProjectCard.scss";

type Props = {
  title: string;
  detail: string;
  tagList: string[];
};

const ProjectCard: React.FC<Props> = ({ title, detail, tagList }) => {
  return (
    <div className="main">
      <div className="card">
        <BugFilled />
      </div>
      <div className="detail">
        <div className="detail-img">
          <ApiOutlined />
        </div>
        <div className="detail-text">
          <div className="main-text">{title}</div>
          <div className="sub-text">{detail}</div>
        </div>
      </div>
      <div className="tag-container">
        {tagList.map((text, index) => (
          <div key={index} className="tag-item">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
