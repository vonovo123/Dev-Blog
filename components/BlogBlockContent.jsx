import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { PortableText } from "@portabletext/react";
import styles from "../styles/Slug.module.css";
import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "@sanity/client";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const builder = createImageUrlBuilder(
  createClient({
    dataset: "production",
    projectId: process.env.SANITY_PROJECT_ID,
    apiVersion: "2022-06-18",
    useCdn: process.env.NODE_ENV === "production",
  })
);
function urlFor(source) {
  return builder.image(source);
}

const codeCustomStyle = {
  margin: 0,
  padding: "16px 18px",
  background: "transparent",
  fontSize: "0.9rem",
  lineHeight: 1.65,
};

const components = {
  types: {
    code: ({ value }) => {
      const { code, language } = value || {};
      if (!code) return null;
      return (
        <div className={cx("codeBlock")}>
          <SyntaxHighlighter
            language={language || "javascript"}
            style={atomOneLight}
            customStyle={codeCustomStyle}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    },
    video: () => <p>video</p>,
    link: () => <p>link</p>,
    imageGallery: () => <p>imageGallery</p>,
    image: ({ value }) => {
      return (
        <figure className={cx("img-wrapper")}>
          {value?.caption && (
            <figcaption className={cx("img-caption")}>
              {value.caption}
            </figcaption>
          )}
          <img
            src={urlFor(value).width(960).url()}
            alt={value?.alt || value?.caption || ""}
            loading="lazy"
          />
        </figure>
      );
    },
  },
};

export default function BlogBlockContent({ blocks }) {
  if (!blocks) return null;

  return (
    <div id="content" className={cx("prose")}>
      <PortableText value={blocks} components={components} />
    </div>
  );
}
