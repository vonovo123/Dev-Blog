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
  const [subMenu, setSubMenu] = subMenuState;
  const [, setPageView] = pageViewState;
  const [, setCachedPath] = cachedPathState;
  const routeReady = useRef(false);

  useEffect(() => {
    routeReady.current = false;
    let page = getLocalData("page");
    let path = getLocalData("path");
    if (!page || page !== PAGE_TYPE) {
      page = PAGE_TYPE;
      path = { menu: "portpolio", subMenu: "htmlCss" };
    }
    if (!path || !path.menu || !path.subMenu) {
      path = { menu: "portpolio", subMenu: "htmlCss" };
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
    if (!subMenu) return;
    if (menuType === PAGE_TYPE) {
      fetchPostData();
      return;
    }
    // 이전 페이지의 menuType이 남은 상태에서는 이동하지 않음
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
