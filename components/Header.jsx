import styles from "../styles/Header.module.css";
import classNames from "classnames/bind";
import DesktopMenu from "./Menu/DesktopMenu";
import MobileMenu from "./Menu/MobileMenu";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);

export default function Header({
  mobileHeaderState,
  pageState,
  menuState,
  menuTypeState,
  subMenuState,
  subMenuViewState,
  showAboutState,
  category,
  subCategory,
  goMain,
}) {
  const [page] = pageState;
  const [mobileHeaderHide, setMobileHeaderHide] = mobileHeaderState;
  const [showAbout, setShowAbout] = showAboutState;
  const menuOpen = !mobileHeaderHide;

  return (
    <header className={cx("header")}>
      <div className={cx("titleWrapper")}>
        <button
          type="button"
          className={cx("title")}
          aria-label="Dynamic_Kwon 홈으로"
          onClick={() => {
            if (page === "home") return;
            goMain();
          }}
        >
          <span className={cx("titleMark")} aria-hidden="true">
            <img
              className={cx("titleFavicon")}
              src="/favicon.ico"
              alt=""
              width={28}
              height={28}
            />
          </span>
          <span className={cx("titleText")}>
            <span className={cx("titleBrand")}>
              Dynamic<span className={cx("titleAccent")}>_</span>Kwon
            </span>
            <span className={cx("titleSub")}>
              배운것과 이룬것을 기록하는 블로그
            </span>
          </span>
        </button>
        <div className={cx("headerActions")}>
          <button
            type="button"
            className={cx("userInfo", "userInfoDesktop")}
            onClick={() => {
              setShowAbout(!showAbout);
            }}
          >
            ABOUT ME
          </button>
          <button
            type="button"
            className={cx("menuToggle", { open: menuOpen })}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            onClick={() => {
              setMobileHeaderHide(!mobileHeaderHide);
            }}
          >
            {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>
      <nav className={cx("desktopMenuWrapper")} aria-label="주 메뉴">
        <DesktopMenu
          pageState={pageState}
          menuState={menuState}
          menuTypeState={menuTypeState}
          subMenuViewState={subMenuViewState}
          subMenuState={subMenuState}
          menuInfo={category}
          subMenuInfo={subCategory}
        />
      </nav>
      <nav
        className={cx("mobileMenuWrapper", { open: menuOpen })}
        aria-label="모바일 메뉴"
        aria-hidden={!menuOpen}
      >
        <div className={cx("mobileMenuPanel")}>
          <div className={cx("mobileMenuPanel")}>
            <MobileMenu
              pageState={pageState}
              menuState={menuState}
              menuTypeState={menuTypeState}
              subMenuState={subMenuState}
              menuInfo={category}
              subMenuInfo={subCategory}
              showAboutState={showAboutState}
              onNavigate={() => setMobileHeaderHide(true)}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
