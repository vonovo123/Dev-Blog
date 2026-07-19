import styles from "../../styles/RecentPosts.module.css";
import classNames from "classnames/bind";
import { useCallback } from "react";
import Carousel from "../Carousel/Carousel";
import CarouselElement from "../Carousel/CarouselElement";
const cx = classNames.bind(styles);

export default function RecentPosts({
  post,
  windowWidth,
  contentWidth,
  goSlug,
}) {
  const makeElement = useCallback(({ element, goPage }) => {
    return <CarouselElement element={element} goPage={goPage} />;
  }, []);

  if (!post?.length) return null;

  return (
    <section className={cx("recentPosts")} aria-labelledby="recent-posts-title">
      <div className={cx("header")}>
        <h2 id="recent-posts-title" className={cx("title")}>
          최근 글
        </h2>
        <p className={cx("lead")}>새로 올린 글을 빠르게 살펴보세요</p>
      </div>
      <div className={cx("carouselWrapper")}>
        <Carousel
          data={post}
          makeElement={makeElement}
          windowWidth={windowWidth}
          contentWidth={contentWidth}
          goSlug={goSlug}
        />
      </div>
    </section>
  );
}
