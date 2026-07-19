import SanityService from "../services/SanityService";
import { useEffect, useRef } from "react";
import Page from "./page/page";
import { getLocalData } from "../utils/LocalStorage";
import HeadMeta from "../components/HeadMeta";

const PAGE_TYPE = "portpolio";

export default function PortfolioPage({
  cachedPathState,
  pageViewState,
  menuTypeState,
  subMenuState,
  post,
  loading,
  goPage,
  fetchPostData,
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
    // page만 portpolio이고 path는 home/recent인 경우가 있어 menu까지 검증
    if (!page || page !== PAGE_TYPE) {
      page = PAGE_TYPE;
      path = { menu: "portpolio", subMenu: null };
    }
    if (!path || path.menu !== "portpolio") {
      path = { menu: "portpolio", subMenu: null };
    }
    // 예전 기본값 htmlCss 등 존재하지 않는 타입은 로드 시 첫 항목으로 보정
    if (path.subMenu === "htmlCss") {
      path = { ...path, subMenu: null };
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
    // 다른 페이지 타입 선택 시 subMenu 유무와 관계없이 이동
    if (!routeReady.current || !menuType) return;
    goPage();
  }, [subMenu, menuType]);

  return (
    <>
      <HeadMeta image={home && home.thumbnail.imageUrl}></HeadMeta>
      <Page pageView="portpolio" post={post} loading={loading}></Page>
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
  return {
    props: {
      recentPost,
      popularPost,
      profile,
      category,
      home,
    },
  };
}
