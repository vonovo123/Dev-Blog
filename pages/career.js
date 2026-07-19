import SanityService from "../services/SanityService";
import { useEffect, useRef } from "react";
import Page from "./page/page";
import { getLocalData } from "../utils/LocalStorage";
import HeadMeta from "../components/HeadMeta";

const PAGE_TYPE = "career";

export default function CareerPage({
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
      path = { menu: "career", subMenu: "career" };
    }
    if (!path || path.menu !== "career" || !path.subMenu) {
      path = { menu: "career", subMenu: "career" };
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
    if (!routeReady.current || !menuType) return;
    goPage();
  }, [subMenu, menuType]);

  return (
    <>
      <HeadMeta image={home && home.thumbnail.imageUrl}></HeadMeta>
      <Page
        pageView="career"
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
