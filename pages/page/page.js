import { useCallback, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/Page/Page.module.css";
import PostListElement from "../../components/Element/PostListElement";
import PortpolioListElement from "../../components/Element/PortpolioListElement";
import CareerListElement from "../../components/Element/CareerListElement";
import { LoadingOutlined } from "@ant-design/icons";
import List from "../../components/List";
const cx = classNames.bind(styles);
export default function Page({ goSlug, post, loading, pageView }) {
  const pageRef = useRef();
  const listRef = useRef();
  const createElement = useCallback(
    ({ element, idx }) => {
      if (!element) return null;
      if (pageView === "post") {
        if (!element.slug && !element.title) return null;
        return <PostListElement element={element} goSlug={goSlug} />;
      }
      if (pageView === "portpolio") {
        if (!element.title || element.slug) return null;
        return <PortpolioListElement element={element} />;
      }
      if (pageView === "career") {
        // 이전 페이지 목록이 남아 있으면 career 스키마가 아님
        if (!element.name || element.slug) return null;
        return <CareerListElement element={element} />;
      }
      return null;
    },
    [pageView, goSlug]
  );
  useEffect(() => {
    if (loading === null) return;
    if (!loading) {
      pageRef.current.style.transform = `translate3d(0, 0, 0)`;
      listRef.current.style.opacity = 1;
    } else {
      pageRef.current.style.transform = `translate3d(0, 12px, 0)`;
      listRef.current.style.opacity = 0;
    }
  }, [loading]);

  return (
    <div className={cx("page")}>
      <div className={cx("pageWrapper")} ref={pageRef}>
        <div
          className={cx("loading", { hide: !loading })}
          role="status"
          aria-live="polite"
          aria-busy={!!loading}
        >
          <LoadingOutlined />
          <span className={cx("loadingText")}>불러오는 중…</span>
        </div>
        <div ref={listRef} className={cx("listWrapper")}>
          {!loading && (
            <List dataList={post} createElement={createElement}></List>
          )}
        </div>
      </div>
    </div>
  );
}
