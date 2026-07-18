import styles from "../../styles/Menu/DesktopMenu.module.css";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);
export default function DesktopMenu({
  pageState,
  menuState,
  menuTypeState,
  subMenuState,
  menuInfo,
  subMenuInfo,
}) {
  const [menu, setMenu] = menuState;
  const [menuType, setMenuType] = menuTypeState;
  const [subMenu, setSubMenu] = subMenuState;
  const [subMenuInfoView, setSubMenuInfoView] = useState(null);
  const menuRef = useRef();
  useEffect(() => {
    if (!subMenuInfo) {
      setSubMenuInfoView(null);
      return;
    }
    setSubMenuInfoView([...subMenuInfo]);
  }, [subMenuInfo]);
  return (
    <div className={cx("menu", { hide: !subMenuInfoView })}>
      <div className={cx("mainMenuWrapper", { hide: !subMenuInfoView })}>
        <div className={cx("main")} role="list">
          {menuInfo &&
            menuInfo.map(({ type, slug, name }, idx) => {
              return (
                <button
                  type="button"
                  className={cx("nav", { sel: menu === slug })}
                  key={idx}
                  onClick={() => {
                    setMenuType(type);
                    setMenu(slug);
                  }}
                >
                  {name}
                </button>
              );
            })}
        </div>
      </div>
      <div className={cx("subMenuWrapper", { hide: !subMenuInfoView })}>
        <div ref={menuRef} className={cx("sub")} role="list">
          {subMenuInfoView &&
            subMenuInfoView.map(({ type, name }) => (
              <button
                type="button"
                className={cx("nav", { sel: subMenu === type })}
                key={type}
                onClick={() => {
                  setSubMenu(type);
                }}
              >
                <span className={cx("text")}>{name}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
