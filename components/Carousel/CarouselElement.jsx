import styles from "../../styles/Carousel/CarouselElement.module.css";
import { Image } from "antd";
import classNames from "classnames/bind";
import dayjs from "dayjs";
const cx = classNames.bind(styles);

export default function CarouselElement({ element, goPage }) {
  if (!element) return null;

  return (
    <button
      type="button"
      className={cx("elementWrapper")}
      onClick={() => {
        goPage({ slug: element.slug });
      }}
    >
      <div className={cx("elementInnerWrapper")}>
        {element.thumbnail?.imageUrl && (
          <Image
            src={element.thumbnail.imageUrl}
            alt={element.thumbnail.alt || element.title}
            className={cx("elementImage")}
            preview={false}
          />
        )}
        <div className={cx("overlay")} aria-hidden="true" />
        <div className={cx("elementContentWrapper")}>
          {element.createdAt && (
            <span className={cx("date")}>
              {dayjs(element.createdAt).format("MM.DD")}
            </span>
          )}
          <div className={cx("title")}>{element.title}</div>
          {element.subtitle && (
            <div className={cx("subtitle")}>{element.subtitle}</div>
          )}
        </div>
      </div>
    </button>
  );
}
