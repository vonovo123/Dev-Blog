import SanityService from "../services/SanityService";
import { useEffect, useRef } from "react";
import Page from "./page/page";
import { getLocalData } from "../utils/LocalStorage";
import HeadMeta from "../components/HeadMeta";

const PAGE_TYPE = "post";

export default function Home({
  cachedPathState,
  menuTypeState,
  pageViewState,
  subMenuState,
  post,
  loading,
  fetchPostData,
  goPage,
  goSlug,
  home,
}) {
  const [menuType, setMenuType] = menuTypeState;
  const [subMenu] = subMenuState;
  const [, setPageView] = pageViewState;
  const [, setCachedPath] = cachedPathState;
  const routeReady = useRef(false);

  useEffect(() => {
    routeReady.current = false;
    let page = getLocalData("page");
    let path = getLocalData("path");
    if (!page || page !== PAGE_TYPE) {
      page = PAGE_TYPE;
      path = { menu: "home", subMenu: "recent" };
    }
    // 포트폴리오/커리어 path가 남아 있으면 홈 최근글로 강제 복원하지 않고 기본값으로 정리
    if (
      !path ||
      !path.menu ||
      !path.subMenu ||
      path.menu === "portpolio" ||
      path.menu === "career"
    ) {
      path = { menu: "home", subMenu: "recent" };
    }

    setMenuType(PAGE_TYPE);
    setPageView(PAGE_TYPE);
    setCachedPath({
      page,
      ...path,
    });
  }, []);

  useEffect(() => {
    if (menuType === PAGE_TYPE) {
      routeReady.current = true;
    }
  }, [menuType]);

  useEffect(() => {
    if (menuType === PAGE_TYPE) {
      if (!subMenu) return;
      fetchPostData();
      return;
    }
    // 포트폴리오 등 다른 타입 선택 시 subMenu가 비워져도 바로 이동
    if (!routeReady.current || !menuType) return;
    goPage();
  }, [subMenu, menuType]);

  return (
    <>
      <HeadMeta image={home && home.thumbnail.imageUrl}></HeadMeta>
      <Page
        pageView="post"
        post={post}
        loading={loading}
        goSlug={goSlug}
      ></Page>
    </>
  );
}

export async function getServerSideProps() {
  const sanityService = new SanityService();
  const profile = await sanityService.getProfile();
  const category = await sanityService.getCategory();
  const recentPost = await sanityService.getData({
    type: "post",
    category: "home",
    subCategory: null,
  });
  const popularPost = await sanityService.getData({
    type: "popular",
    category: null,
    subCategory: null,
  });
  const home = await sanityService.getHome();
  const recentComment = await sanityService.getRecentComments();
  return {
    props: {
      recentPost,
      popularPost,
      profile,
      home,
      category,
      recentComment,
    },
  };
}
