import { useRouter } from "next/router";
import classNames from "classnames/bind";
import styles from "../styles/Footer.module.css";

const cx = classNames.bind(styles);

const GITHUB_URL = "https://github.com/vonovo123";
const YEAR = 2026;

export default function Footer() {
  const router = useRouter();

  const go = (path) => {
    if (router.pathname === path) return;
    router.push(path);
  };

  return (
    <footer className={cx("footer")}>
      <div className={cx("inner")}>
        <div className={cx("brandRow")}>
          <span className={cx("mark")} aria-hidden="true">
            <img
              className={cx("favicon")}
              src="/favicon.ico"
              alt=""
              width={24}
              height={24}
            />
          </span>
          <div className={cx("brandText")}>
            <span className={cx("brandName")}>
              Dynamic<span className={cx("brandAccent")}>_</span>Kwon
            </span>
            <span className={cx("brandTag")}>
              배운것과 이룬것을 기록하는 블로그
            </span>
          </div>
        </div>

        <div className={cx("meta")}>
          <nav className={cx("nav")} aria-label="푸터 링크">
            <button type="button" className={cx("link")} onClick={() => go("/")}>
              Posts
            </button>
            <span className={cx("sep")} aria-hidden="true" />
            <button
              type="button"
              className={cx("link")}
              onClick={() => go("/career")}
            >
              Career
            </button>
            <span className={cx("sep")} aria-hidden="true" />
            <button
              type="button"
              className={cx("link")}
              onClick={() => go("/portfolio")}
            >
              Portfolio
            </button>
            <span className={cx("sep")} aria-hidden="true" />
            <a
              href={GITHUB_URL}
              className={cx("link")}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </nav>
          <p className={cx("copy")}>
            © {YEAR} Hyunwoo Kwon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
