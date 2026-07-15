import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../styles/Slug.module.css";
export default function BlogMarkDown({ markdown }) {
  return (
    <div id="content">
      <ReactMarkdown
        components={{
          // react-markdown v9+ no longer passes an `inline` prop. Block code
          // is detected via the `language-*` class produced by fenced blocks.
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                style={docco}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          em: ({ node, ...props }) => <i className={styles.em} {...props} />,
        }}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
