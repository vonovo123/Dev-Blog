import "antd/dist/reset.css";
import "../styles/globals.css";
import { useCallback, useEffect, useRef, useState } from "react";

import RecentPosts from "../components/ThemePosts/RecentPosts";
import About from "../components/About";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UpCircleOutlined } from "@ant-design/icons";
import { setLocalData } from "../utils/LocalStorage";
import {
  fetchPostData as fetchSanityData,
  fetchSubCategory,
} from "../utils/sanityApi";
import PostTitle from "../components/PostTitle";
import makeObserver from "../utils/Observer";
import Side from "../components/Side";

import classNames from "classnames/bind";
import styles from "../styles/App.module.css";
import HeadMeta from "../components/HeadMeta";
const cx = classNames.bind(styles);
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // 뷰포트 화면 크기
  const [windowWidth, setWindowWidth] = useState(null);
  const [contentWidth, setContentWidth] = useState();
  const bodyRef = useRef(null);
  const upbtnRef = useRef(null);
  const [upBtnHide, setUpBtnHide] = useState(true);
  const showAboutState = useState(false);
  const [showAbout, setShowAbout] = showAboutState;
  // 케시 데이터 정보
  const cachedPathState = useState(null);
  const [cachedPath, setCachedPath] = cachedPathState;
  // 메뉴 정보
  const categoryState = useState(null);
  const [category, setCategory] = categoryState;
  // 하위 메뉴 정보
  const subCategoryState = useState(null);
  const [subCategory, setSubcategory] = subCategoryState;
  //page 타입
  const pageState = useState(null);
  const [page, setPage] = pageState;
  //선택퇸 메뉴
  const menuState = useState(null);
  const [menu, setMenu] = menuState;
  // 선택된 매뉴 타입
  const menuTypeState = useState(null);
  const [menuType, setMenuType] = menuTypeState;

  //페이지 타입
  const pageViewState = useState(null);
  const [pageView, setPageView] = pageViewState;
  //선택된 하위 메뉴
  const subMenuState = useState(null);
  const [subMenu, setSubMenu] = subMenuState;
  // 모바일 헤더 숨김
  const mobileHeaderState = useState(true);
  const [mobileHeaderHide, setMobileHeaderHide] = mobileHeaderState;
  //네비정보
  const postTitleState = useState(null);
  const [postTitle, setPostTitle] = postTitleState;
  //포스팅 리스트
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(null);
  // cachedPath 복원 시 적용할 하위메뉴 (없으면 첫 번째 카테고리로 보정)
  const pendingSubMenuRef = useRef(undefined);
  const initState = useCallback(() => {
    setPage(null);
    setMenuType(null);
    setMenu(null);
    setSubMenu(null);
    setLocalData("page", null);
    setLocalData("path", null);
    setPost(null);
    setPostTitle(null);
    setMobileHeaderHide(true);
  });

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    setContentWidth(bodyRef.current.getBoundingClientRect().width);
    setCategory(pageProps.category);
  }, []);

  const goPage = useCallback(() => {
    if (!menuType) return;
    setPage(menuType);
    setLocalData("page", menuType);

    const target =
      menuType === "post"
        ? "/"
        : menuType === "portpolio"
          ? "/portfolio"
          : `/${menuType}`;

    // 페이지 타입이 바뀔 때 path가 이전 페이지(home/recent 등)로 남지 않도록 동기화
    let nextPath;
    if (menuType === "post") {
      const stayingOnPost = router.pathname === "/";
      const isPostMenu =
        menu && menu !== "portpolio" && menu !== "career";
      nextPath =
        stayingOnPost && isPostMenu
          ? { menu, subMenu: subMenu || "recent" }
          : { menu: "home", subMenu: "recent" };
    } else if (menuType === "portpolio") {
      const stayingOnPortfolio = router.pathname === "/portfolio";
      // subMenu는 실제 Sanity 타입(js/react/vue 등)만 유지. 없으면 로드 시 첫 항목으로 보정
      nextPath =
        stayingOnPortfolio && menu === "portpolio" && subMenu
          ? { menu: "portpolio", subMenu }
          : { menu: "portpolio", subMenu: null };
    } else if (menuType === "career") {
      nextPath = { menu: "career", subMenu: "career" };
    }
    if (nextPath) {
      setLocalData("path", nextPath);
    }

    if (router.pathname === target) return;
    router.push({ pathname: target });
  }, [menuType, menu, subMenu, router]);
  const goMain = useCallback(() => {
    if (page === "post") {
      setCachedPath({ page, menu: "home", subMenu: "recent" });
    } else {
      initState();
      router.push({ pathname: `/` });
    }
  }, [router, page, menu, subMenu]);

  const goSlug = useCallback(({ slug }) => {
    initState();
    router.push({ pathname: `/post/${slug}` });
  }, []);

  const fetchPostData = useCallback(async () => {
    setPost(null);
    const param = {
      type: page,
      category: menu,
      subCategory: subMenu,
    };
    window.scrollTo({
      top: bodyRef.current.offsetTop - 15,
      behavior: "smooth",
    });
    setLoading(true);
    try {
      const post = await fetchSanityData(param);
      setPost(post);
    } catch (error) {
      console.log(error);
      setPost([]);
    } finally {
      setLoading(false);
    }
  }, [page, menu, subMenu]);

  useEffect(() => {
    const option = {
      rootMargin: "-10% 0px -90% 0px",
    };
    const inCB = () => {
      setUpBtnHide(false);
    };
    const outCB = () => {
      setUpBtnHide(true);
    };
    makeObserver({ target: [bodyRef.current], option, inCB, outCB });
  }, [bodyRef.current]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (!cachedPath) return;
    const { page, menu: pathMenu, subMenu: pathSubMenu } = cachedPath;
    setPost(null);
    setLoading(true);
    setPage(page);
    // null도 "복원 요청"으로 취급 → 로드 후 첫 하위메뉴로 보정
    pendingSubMenuRef.current = pathSubMenu ?? null;
    setLocalData("page", page);
    setLocalData("path", { menu: pathMenu, subMenu: pathSubMenu });

    setMenu((prev) => {
      if (prev === pathMenu) {
        // 동일 메뉴면 effect가 스킵되므로 한 번 비웠다가 다시 설정
        queueMicrotask(() => setMenu(pathMenu));
        return null;
      }
      return pathMenu;
    });
  }, [cachedPath]);

  useEffect(() => {
    if (!menu) return;
    setSubcategory(null);
    setSubMenu(null);
    let cancelled = false;
    async function loadSubCategory() {
      try {
        const result = await fetchSubCategory(menu);
        if (cancelled) return;
        setSubcategory(result || []);
        // cachedPath 복원 중이면 유효한 subMenu(또는 첫 항목)로 설정
        if (pendingSubMenuRef.current !== undefined) {
          const preferred = pendingSubMenuRef.current;
          pendingSubMenuRef.current = undefined;
          const matched = (result || []).find((cat) => cat.type === preferred);
          const next = matched?.type ?? result?.[0]?.type ?? null;
          if (next) setSubMenu(next);
        }
      } catch (error) {
        console.log(error);
        if (!cancelled) {
          setSubcategory([]);
          pendingSubMenuRef.current = undefined;
        }
      }
    }
    loadSubCategory();
    return () => {
      cancelled = true;
    };
  }, [menu]);

  useEffect(() => {
    if (!subMenu) return;
    setPostTitle(null);
    if (category && subCategory) {
      const main = category.find((cat) => cat.slug === menu)?.name;
      const sub = subCategory.find((cat) => cat.type === subMenu)?.name;
      if (main && sub) {
        setPostTitle({ main, sub });
      }
    }
    setLocalData("path", { menu, subMenu });
  }, [subMenu, category, subCategory, menu]);

  return (
    <div className={cx("app")}>
      <button
        type="button"
        ref={upbtnRef}
        className={cx("upBtn", { hide: upBtnHide })}
        aria-label="맨 위로"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <UpCircleOutlined />
      </button>
      <div
        className={cx("about", { show: showAbout })}
        onClick={() => {
          setShowAbout(false);
        }}
      >
        <About
          profile={pageProps.profile && pageProps.profile[0]}
          home={pageProps.home && pageProps.home[0]}
          onClose={() => setShowAbout(false)}
        />
      </div>
      <div className={cx("appWrapper")}>
        <div className={cx("header")}>
          <Header
            mobileHeaderState={mobileHeaderState}
            pageState={pageState}
            menuState={menuState}
            menuTypeState={menuTypeState}
            subMenuState={subMenuState}
            category={category}
            subCategory={subCategory}
            showAboutState={showAboutState}
            goMain={goMain}
          ></Header>
        </div>
        <div className={cx("body")} ref={bodyRef}>
          <div className={cx("mainRow", { fullWidth: pageView !== "post" && pageView !== "slug" })}>
            <div className={cx("content")}>
              <div className={cx("titleWrapper")}>
                <PostTitle postTitleState={postTitleState}></PostTitle>
              </div>
              {/* <AdTop></AdTop> */}
              <Component
                {...pageProps}
                cachedPathState={cachedPathState}
                pageState={pageState}
                menuState={menuState}
                menuTypeState={menuTypeState}
                pageViewState={pageViewState}
                subMenuState={subMenuState}
                setMobileHeaderHide={setMobileHeaderHide}
                postTitleState={postTitleState}
                post={post}
                loading={loading}
                fetchPostData={fetchPostData}
                goPage={goPage}
                goSlug={goSlug}
                home={pageProps.home && pageProps.home[0]}
              />
            </div>
            {(pageView === "post" || pageView === "slug") && (
              <div className={cx("side")}>
                <Side
                  pageView={pageView}
                  categoryPost={pageProps.categoryPost}
                  popularPost={pageProps.popularPost}
                  recentComment={pageProps.recentComment}
                  goSlug={goSlug}
                ></Side>
              </div>
            )}
          </div>
          {/* <AdBottom></AdBottom> */}

          <div className={cx("banner", "mb20")}>
            <RecentPosts
              post={pageProps.recentPost}
              windowWidth={windowWidth}
              contentWidth={contentWidth}
              goSlug={goSlug}
            />
          </div>
        </div>

        <div className={cx("footer")}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
