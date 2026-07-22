import SanityService from "../../services/SanityService";
import styles from "../../styles/Slug.module.css";
import BlogMarkDown from "../../components/BlogMarkDown";
import { useState, useEffect, useRef, useCallback } from "react";
import { Image } from "antd";
import dayjs from "dayjs";
import { makeHeadings } from "../../utils/Headings";
import makeObserver from "../../utils/Observer";
import TableOfContents from "../../components/TableOfContents";
import { CaretLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import CommentInput from "../../components/Comment/CommentInput";
import CommentList from "../../components/Comment/CommentList";
import observeBottomOf from "../../utils/ObserveBottomOf";
import HeadMeta from "../../components/HeadMeta";
import BlogBlockContent from "../../components/BlogBlockContent";
import { fetchComments } from "../../utils/sanityApi";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Post({
  content,
  menuTypeState,
  pageViewState,
  subMenuState,
  cachedPathState,
  postTitleState,
  goPage,
  setMobileHeaderHide,
  home,
}) {
  const [menuType, setMenuType] = menuTypeState;
  const [pageView, setPageView] = pageViewState;
  const [subMenu, setSubMenu] = subMenuState;
  const [cachedPath, setCachedPath] = cachedPathState;
  const [postTitle, setPostTitle] = postTitleState;
  const [readKey, setReadkey] = useState(null);
  const [heading, setHeading] = useState([]);
  const [foldToc, setFoldToc] = useState(true);
  const commentListState = useState(null);
  const [commentList, setCommentList] = commentListState;
  const commentTotalListState = useState(null);
  const [commentTotalList, setCommentTotalList] = commentTotalListState;
  const [loading, setLoading] = useState(false);
  const sod = useRef(null);
  const eod = useRef(null);
  const commentRef = useRef(null);
  const commentListRef = useRef(null);
  // content 로드로 인해 자동으로 세팅되는 첫 subMenu 변경은
  // 사용자가 헤더 탭을 클릭한 것이 아니므로 goPage()를 건너뛰기 위한 플래그
  const initializingSubMenuRef = useRef(false);

  const loadNextComments = useCallback(
    async (id, start, end) => {
      setLoading(true);
      try {
        const result = await fetchComments({
          id,
          start,
          end,
        });
        setCommentList([...result]);
        if (result.length === 0) {
          return null;
        }
        return result;
      } catch (error) {
        console.log(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [content]
  );

  const infiniteLoadComment = (id, end) => {
    if (!end) end = 10;
    const option = {
      rootMargin: "600px",
    };
    const onBottom = async (unobserve) => {
      const result = await loadNextComments(id, end - 5, end);
      unobserve();
      if (result) {
        setTimeout(() => {
          infiniteLoadComment(id, end + 10);
        }, [1000]);
      }
    };
    observeBottomOf({ target: commentListRef.current, onBottom, option });
  };

  useEffect(() => {
    setPageView("slug");
    setMobileHeaderHide(true);
  }, []);

  useEffect(() => {
    if (!commentList) return;
    if (!commentTotalList) {
      setCommentTotalList([...commentList]);
    } else {
      setCommentTotalList([...commentTotalList, ...commentList]);
    }
  }, [commentList]);

  useEffect(() => {
    if (!content) return;
    setCommentTotalList(null);
    infiniteLoadComment(content._id, 0);
    const option = {
      rootMargin: "-50%",
    };
    const contentStartEndIoCallBack = (entry) => {
      setReadkey(entry.target.dataset.idx);
    };
    makeObserver({
      target: [sod.current, eod.current],
      option,
      inCB: contentStartEndIoCallBack,
      outCB: null,
    });

    const contentReadCb = (entry) => {
      setReadkey(entry.target._key);
    };
    const $contentNode = document.querySelector("#content");
    const contentReadIo = makeObserver({
      target: [],
      option,
      inCB: contentReadCb,
      outCB: null,
    });
    let ast = [...$contentNode.childNodes];
    const headings = makeHeadings({ ast, io: contentReadIo });

    setHeading(headings);
    const page = content.category.type;
    const path = {
      menu: content.category.slug,
      subMenu: content.subCategory.type,
    };
    const main = content.category.name;
    const sub = content.subCategory.name;
    const title = content.title;
    const newTitle = { main, sub, title };
    setPostTitle(newTitle);
    setMenuType(page);
    initializingSubMenuRef.current = true;
    setCachedPath({
      page,
      ...path,
    });
    window.scrollTo({
      top: sod.current.offsetTop - 120,
      behavior: "smooth",
    });
  }, [content]);
  useEffect(() => {
    if (!subMenu) {
      return;
    }
    // 글 로드 시 자동으로 세팅된 subMenu(초기화)는 페이지 이동을 트리거하지 않고,
    // 이후 사용자가 헤더의 다른 하위 탭을 직접 클릭했을 때만 목록으로 이동한다.
    if (initializingSubMenuRef.current) {
      initializingSubMenuRef.current = false;
      return;
    }
    goPage();
  }, [subMenu]);
  return (
    <>
      <HeadMeta image={home && home.thumbnail.imageUrl}></HeadMeta>
      <div className={cx("postWrapper")}>
        {content && (
          <>
            <div className={cx("post")}>
              <div className={cx("tocWrapper", { fold: foldToc })}>
                <TableOfContents
                  outline={heading}
                  readKey={readKey}
                  setFoldToc={setFoldToc}
                  sod={sod}
                  eod={eod}
                ></TableOfContents>
              </div>
              <div
                className={cx("tocFold", { fold: !foldToc })}
                onClick={() => {
                  setFoldToc(false);
                }}
              >
                <div className={cx("btn")}>
                  <CaretLeftOutlined />
                </div>
                <div className={cx("text")}>TOC</div>
              </div>
              <div
                className={cx("contentHeaderWrapper")}
                ref={sod}
                data-idx={"sod"}
              >
                <div className={cx("postImageWrapper")}>
                  <Image
                    src={content.thumbnail.imageUrl}
                    alt={content.thumbnail.alt}
                    className={cx("postImage")}
                    preview={false}
                  />
                  <div className={cx("postImageOverlay")} aria-hidden="true" />
                  <div className={cx("contentHeaderInfo")}>
                    <h1 className={cx("title")}>{content.title}</h1>
                    {content.subtitle && (
                      <p className={cx("subTitle")}>{content.subtitle}</p>
                    )}
                  </div>
                </div>
                <div className={cx("contentAuthor")}>
                  <div className={cx("authorInfo")}>
                    <Image
                      src={content.author.image}
                      alt={content.author.name}
                      className={cx("authorImage")}
                      preview={false}
                    />
                    <div className={cx("editInfo")}>
                      <div className={cx("createdAt")}>
                        {dayjs(content.createdAt).format("MMMM DD / YYYY")}
                      </div>
                      <div className={cx("authorName")}>
                        posted by {content.author.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("contentBody")}>
                <BlogMarkDown
                  markdown={content.postContent && content.postContent.markdown}
                />
                <BlogBlockContent
                  blocks={content.blockContent && content.blockContent}
                />
              </div>
            </div>

            <div className={cx("comment")} ref={eod} data-idx={"eod"}>
              <div className={cx("commentTitle")}>댓글</div>
              <div className={cx("commentInput")}>
                <CommentInput
                  postInfo={{
                    id: content._id,
                    slug: content.slug,
                    title: content.title,
                  }}
                  commentTotalListState={commentTotalListState}
                ></CommentInput>
              </div>

              <div className={cx("commentListWrapper")}>
                <div className={cx("commentListInnerWrapper")} ref={commentRef}>
                  <div ref={commentListRef} className={cx("commentList")}>
                    <CommentList
                      commentListState={commentTotalListState}
                    ></CommentList>
                  </div>
                  {loading && (
                    <div className={cx("loading")}>
                      <LoadingOutlined />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {!content && (
          <>
            <div>{"존재하지않는 포스트입니다."}</div>
          </>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const sanityService = new SanityService();
  const category = await sanityService.getCategory();
  const profile = await sanityService.getProfile();
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

  let content = await sanityService.getDataBySlug({ slug });
  if (content === undefined) content = null;
  const categoryPost = content
    ? await sanityService.getData({
        type: "post",
        category: content.category.slug,
        subCategory: content.subCategory.type,
      })
    : null;
  const subCategory = content
    ? await sanityService.getSubCategory(content.category.type)
    : null;
  const pageType = content ? content.category.type : null;
  if (content) sanityService.upCount({ id: content._id });
  const home = await sanityService.getHome();
  return {
    props: {
      slug,
      content,
      profile,
      recentPost,
      categoryPost,
      popularPost,
      category,
      subCategory,
      pageType,
      home,
    },
  };
}
