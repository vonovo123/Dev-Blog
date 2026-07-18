import styles from "../../styles/Menu/MobileMenu.module.css";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

export default function MobileMenu({
  menuState,
  menuTypeState,
  subMenuState,
  menuInfo,
  subMenuInfo,
  showAboutState,
  onNavigate,
}) {
  const [menu, setMenu] = menuState;
  const [, setMenuType] = menuTypeState;
  const [subMenu, setSubMenu] = subMenuState;
  const [, setShowAbout] = showAboutState;
  const [subMenuInfoView, setSubMenuInfoView] = useState(null);

  useEffect(() => {
    if (!subMenuInfo) {
      setSubMenuInfoView(null);
      return;
    }
    setSubMenuInfoView([...subMenuInfo]);
  }, [subMenuInfo]);

  const hasSub = Boolean(subMenuInfoView?.length);

  return (
    <div className={cx("menu")}>
      <div className={cx("mainMenuWrapper")}>
        <div className={cx("sectionLabel")}>메뉴</div>
        <div className={cx("mainMenu")}>
          {menuInfo &&
            menuInfo.map(({ type, name, slug }, idx) => {
              if (type === "recent") return null;
              return (
                <button
                  type="button"
                  className={cx("nav", { sel: menu === slug })}
                  key={idx}
                  onClick={() => {
                    setMenu(slug);
                    setMenuType(type);
                  }}
                >
                  <span className={cx("text")}>{name}</span>
                </button>
              );
            })}
          <button
            type="button"
            className={cx("nav", "aboutNav")}
            onClick={() => {
              setShowAbout(true);
              onNavigate?.();
            }}
          >
            <span className={cx("text")}>ABOUT ME</span>
          </button>
        </div>
      </div>
      <div className={cx("subMenuWrapper")}>
        <div className={cx("sectionLabel")}>카테고리</div>
        <div className={cx("subMenu", { empty: !hasSub })}>
          {hasSub ? (
            subMenuInfoView.map(({ type, name }) => (
              <button
                type="button"
                className={cx("nav", { sel: subMenu === type })}
                key={type}
                onClick={() => {
                  setSubMenu(type);
                  onNavigate?.();
                }}
              >
                <span className={cx("text")}>{name}</span>
              </button>
            ))
          ) : (
            <p className={cx("emptyText")}>메뉴를 선택하세요</p>
          )}
        </div>
      </div>
    </div>
  );
}
