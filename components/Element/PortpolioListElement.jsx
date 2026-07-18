import styles from "../../styles/Element/PortpolioListElement.module.css";
import { Image } from "antd";
import classNames from "classnames/bind";
import { GithubOutlined, PaperClipOutlined } from "@ant-design/icons";
import BlogMarkDown from "../BlogMarkDown";

const cx = classNames.bind(styles);
export default function PortpolioListElement({ element }) {
  if (!element?.title) return null;

  const { portpolioContent, demoUrl, repoUrl, thumbnail, title } = element;
  const markdown = portpolioContent?.markdown ?? "";

  return (
    <div className={cx("element")}>
      <div className={cx("elementInnerWrapper")}>
        <div className={cx("elementImageWrapper")}>
          {thumbnail?.imageUrl && (
            <Image
              src={thumbnail.imageUrl}
              alt={thumbnail.alt || title}
              className={cx("elementImage")}
              preview={false}
            />
          )}
        </div>
        <div className={cx("elementContentWrapper")}>
          <div className={cx("title")}>{title}</div>

          <div className={cx("content")}>
            {markdown ? <BlogMarkDown markdown={markdown} /> : null}
          </div>
          <div className={cx("btnWrapper")}>
            {repoUrl && (
              <a
                className={cx("btn")}
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubOutlined className={styles.icon} />
                <span>GIT Repo</span>
              </a>
            )}
            {demoUrl && (
              <a
                className={cx("btn")}
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PaperClipOutlined className={styles.icon} />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
