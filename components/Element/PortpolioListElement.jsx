import styles from "../../styles/Element/PortpolioListElement.module.css";
import { Image } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import {
  DownOutlined,
  GithubOutlined,
  LinkOutlined,
  UpOutlined,
} from "@ant-design/icons";
import BlogMarkDown from "../BlogMarkDown";

const cx = classNames.bind(styles);

export default function PortpolioListElement({ element }) {
  const [expanded, setExpanded] = useState(false);

  if (!element?.title) return null;

  const { portpolioContent, demoUrl, repoUrl, thumbnail, title, skills } =
    element;
  const markdown = portpolioContent?.markdown ?? "";
  const skillList = Array.isArray(skills)
    ? skills.map((s) => (typeof s === "string" ? s : s?.name)).filter(Boolean)
    : [];
  const hasMarkdown = Boolean(markdown.trim());

  return (
    <article className={cx("element")}>
      <div className={cx("elementInnerWrapper")}>
        <div className={cx("elementImageWrapper")}>
          {thumbnail?.imageUrl ? (
            <Image
              src={thumbnail.imageUrl}
              alt={thumbnail.alt || title}
              className={cx("elementImage")}
              preview={false}
            />
          ) : (
            <div className={cx("imageFallback")} aria-hidden="true" />
          )}
        </div>

        <div className={cx("elementContentWrapper")}>
          <h3 className={cx("title")}>{title}</h3>

          {skillList.length > 0 && (
            <div className={cx("tagWrapper")}>
              {skillList.map((name) => (
                <span key={name} className={cx("tag")}>
                  {name}
                </span>
              ))}
            </div>
          )}

          {hasMarkdown && (
            <div className={cx("contentSection")}>
              <div
                className={cx("content", { collapsed: !expanded })}
                id={`portfolio-content-${element._id || title}`}
              >
                <BlogMarkDown markdown={markdown} />
              </div>
              <button
                type="button"
                className={cx("toggleBtn")}
                aria-expanded={expanded}
                aria-controls={`portfolio-content-${element._id || title}`}
                onClick={() => setExpanded((prev) => !prev)}
              >
                <span>{expanded ? "접기" : "더 보기"}</span>
                {expanded ? <UpOutlined /> : <DownOutlined />}
              </button>
            </div>
          )}

          {(repoUrl || demoUrl) && (
            <div className={cx("btnWrapper")}>
              {repoUrl && (
                <a
                  className={cx("btn", "secondary")}
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubOutlined className={cx("icon")} />
                  <span>GitHub</span>
                </a>
              )}
              {demoUrl && (
                <a
                  className={cx("btn", "primary")}
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkOutlined className={cx("icon")} />
                  <span>Demo</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
