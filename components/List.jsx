import { Fragment } from "react";
import classNames from "classnames/bind";
import styles from "../styles/Page/List.module.css";
const cx = classNames.bind(styles);
export default function List({ dataList, title, createElement }) {
  return (
    <div className={cx("list")}>
      {title && <div className={cx("title")}>{title}</div>}
      <div className={cx("listWrapper")}>
        {dataList && dataList.length === 0 && (
          <div className={cx("empty")} role="status">
            {"카테고리에 글이 존재하지 않습니다."}
          </div>
        )}
        {dataList &&
          dataList.length > 0 &&
          dataList.map((element, idx) => (
            <Fragment key={element._id ?? element.postId ?? element.slug ?? idx}>
              {createElement({ element, idx })}
            </Fragment>
          ))}
      </div>
    </div>
  );
}
