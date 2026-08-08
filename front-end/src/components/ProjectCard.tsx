import { ApiOutlined, BugFilled } from "@ant-design/icons";
import React from "react";
import { IProjectSource } from "../api/portfolioApi";
import "./scss/ProjectCard.scss";

type Props = {
  title: string;
  detail: string;
  tagList: string[];
  statusLabel?: string | null;
  sources?: IProjectSource[];
};

const ProjectCard: React.FC<Props> = ({
  title,
  detail,
  tagList,
  statusLabel,
  sources = [],
}) => {
  return (
    <div className={`main ${statusLabel ? "main-upcoming" : ""}`}>
      <div className={`card ${statusLabel ? "card-upcoming" : ""}`}>
        <BugFilled />
        {statusLabel && <span className="card-upcoming-text">{statusLabel}</span>}
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
      {sources.length > 0 && (
        <div className="source-container">
          {sources.map((source) => (
            <a
              key={source.id}
              className="source-item"
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              ↗ {source.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
