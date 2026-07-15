import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
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
    apiVersion: "2022-06-18", // use a UTC date string
    token: process.env.SANITY_AUTH_TOKEN, // or leave blank for unauthenticated usage
    useCdn: process.env.NODE_ENV === "production",
  })
);
function urlFor(source) {
  return builder.image(source);
}

// @portabletext/react components. Each custom type receives `{ value }`
// (the block node), replacing the `{ node }` prop from the old
// @sanity/block-content-to-react serializers.
const components = {
  types: {
    code: ({ value }) => {
      const { code } = value;
      return (
        <div>
          <SyntaxHighlighter language="javascript" style={docco}>
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
          <figcaption className={cx("img-caption")}># {value.caption}</figcaption>
          <img
            src={urlFor(value).width(400).height(400).url()}
            alt={value.alt}
            style={{ borderRadius: "5px" }}
          />
        </figure>
      );
    },
  },
};

export default function BlogBlockContent({ blocks }) {
  return (
    blocks && (
      <div id="content">
        <PortableText value={blocks} components={components} />
      </div>
    )
  );
}
