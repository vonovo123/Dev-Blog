import styles from "../../styles/Carousel/Nav.module.css";
import classNames from "classnames/bind";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);

export default function Nav({ index, size, move, limitSize }) {
  const drawDots = () => {
    const result = [];
    const now = index % size;
    const range = [];
    for (let i = 0; i < limitSize; i++) {
      range.push((now + i) % size);
    }

    for (let i = 0; i < size; i++) {
      result.push(
        <span
          key={i}
          className={cx("dot", { sel: range.indexOf(i) !== -1 })}
          aria-hidden="true"
        />
      );
    }
    return result;
  };

  return (
    <div className={cx("navigation")}>
      <div className={cx("wrapper")}>
        <button
          type="button"
          className={cx("arrow")}
          aria-label="이전 최근 글"
          onClick={() => move("prev")}
        >
          <CaretLeftOutlined />
        </button>
        <div className={cx("dots")} aria-hidden="true">
          {drawDots()}
        </div>
        <button
          type="button"
          className={cx("arrow")}
          aria-label="다음 최근 글"
          onClick={() => move("next")}
        >
          <CaretRightOutlined />
        </button>
      </div>
    </div>
  );
}
