import styles from "../../styles/Carousel/CarouselElement.module.css";
import { Image } from "antd";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function CarouselElement({ element, goPage }) {
  return (
    <button
      type="button"
      className={cx("elementWrapper")}
      onClick={() => {
        goPage({ def: "slug", slug: element.slug });
      }}
    >
      <div className={cx("element")}>
        <div className={cx("elementInnerWrapper")}>
          <Image
            src={element.thumbnail.imageUrl}
            alt={element.thumbnail.alt}
            className={cx("elementImage")}
            preview={false}
          />
          <div className={cx("elementContentWrapper")}>
            <div className={cx("title")}>{element.title}</div>
          </div>
        </div>
      </div>
    </button>
  );
}
