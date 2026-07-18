import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import classNames from "classnames/bind";
import styles from "../styles/Slug.module.css";

const cx = classNames.bind(styles);

const codeCustomStyle = {
  margin: 0,
  padding: "16px 18px",
  background: "transparent",
  fontSize: "0.875rem",
  lineHeight: 1.7,
  letterSpacing: 0,
};

export default function BlogMarkDown({ markdown }) {
  if (!markdown) return null;

  return (
    <div id="content" className={cx("prose")}>
      <ReactMarkdown
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeText = String(children).replace(/\n$/, "");
            if (match) {
              return (
                <div className={cx("codeBlock")}>
                  <div className={cx("codeBlockHeader")}>
                    <span className={cx("codeLang")}>{match[1]}</span>
                  </div>
                  <div className={cx("codeBlockBody")}>
                    <SyntaxHighlighter
                      style={atomOneLight}
                      language={match[1]}
                      PreTag="div"
                      customStyle={codeCustomStyle}
                    >
                      {codeText}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            }
            return <code className={className}>{children}</code>;
          },
          table({ children }) {
            return (
              <div className={cx("tableWrap")}>
                <table>{children}</table>
              </div>
            );
          },
          em: ({ children }) => <em className={cx("em")}>{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt || ""} loading="lazy" />
          ),
        }}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
