import styles from "../../styles/Element/PostListElement.module.css";
import { Image } from "antd";
import classNames from "classnames/bind";
import dayjs from "dayjs";
const cx = classNames.bind(styles);

function getPreviewText(element) {
  const raw = element.preview || element.postContent?.markdown || "";
  const normalized = String(raw).replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  return normalized.length > 180
    ? `${normalized.slice(0, 180).trim()}…`
    : normalized;
}

export default function PostListElement({ element, goSlug }) {
  const preview = getPreviewText(element);
  return (
    element && (
      <button
        type="button"
        className={cx("elementWrapper")}
        onClick={() => {
          goSlug({ menu: element.category.slug, slug: element.slug });
        }}
      >
        <div className={cx("element")}>
          <div className={cx("elementImageWrapper")}>
            <Image
              src={element.thumbnail.imageUrl}
              alt={element.thumbnail.alt}
              className={cx("elementImage")}
              preview={false}
            />
            <div className={cx("imageOverlay")} aria-hidden="true" />
          </div>
          <div className={cx("elementContentWrapper")}>
            <div className={cx("contentDate")}>
              {dayjs(element.createdAt).format("MM.DD")}
            </div>
            <div className={cx("titleWrapper")}>
              <div className={cx("title")}>{element.title}</div>
              <div className={cx("subtitle")}>{element.subtitle}</div>
            </div>
            {preview && <div className={cx("short")}>{preview}</div>}
          </div>
        </div>
      </button>
    )
  );
}
