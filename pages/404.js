import { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../styles/index.module.css";
const cx = classNames.bind(styles);
import SanityService from "../services/SanityService";

export default function Custom404({
  pageState,
  subMenuState,
  goPage,
  postTitleState,
}) {
  const [page] = pageState;
  const [subMenu] = subMenuState;
  const [, setPostTitle] = postTitleState;
  useEffect(() => {
    setPostTitle({ main: "Error", sub: "404" });
  }, [setPostTitle]);
  useEffect(() => {
    if (!subMenu) return;
    goPage({ def: page });
  }, [subMenu, goPage, page]);
  return <div className={cx("e404")}>{"존재하지 않는 페이지입니다."}</div>;
}

export async function getStaticProps() {
  const sanityService = new SanityService();
  const profile = await sanityService.getProfile();
  const category = await sanityService.getCategory();
  const recentPost = await sanityService.getData({
    type: "post",
    category: "home",
    subCategory: null,
  });
  return {
    props: {
      recentPost,
      profile,
      category,
    },
  };
}
