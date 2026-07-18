import styles from "../../styles/Comment.module.css";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import { createComment } from "../../utils/sanityApi";
const cx = classNames.bind(styles);

export default function CommentInput({ postInfo, commentTotalListState }) {
  const { id, slug, title } = postInfo;
  const [nickName, setNickName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [commentTotalList, setCommentTotalList] = commentTotalListState;

  const makeReview = useCallback(async () => {
    if (nickName === "") {
      setError("nickName");
      return;
    }
    if (comment === "") {
      setError("comment");
      return;
    }
    try {
      setSubmitting(true);
      setSubmitError(null);
      const now = new Date();
      const result = await createComment({
        id,
        slug,
        title,
        nickName: JSON.stringify(nickName),
        comment: JSON.stringify(comment),
        createdAt: new Date(now.getTime()).toISOString(),
      });
      setCommentTotalList([result, ...(commentTotalList || [])]);
      setNickName("");
      setComment("");
      setError(null);
    } catch (e) {
      setSubmitError("댓글 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }, [
    nickName,
    comment,
    commentTotalList,
    id,
    slug,
    title,
    setCommentTotalList,
  ]);

  return (
    <div className={cx("commentInput")}>
      <div className={cx("formPanel")}>
        <div className={cx("field")}>
          <div className={cx("fieldHeader")}>
            <label className={cx("fieldLabel")} htmlFor="nickNameInput">
              닉네임
            </label>
            <span className={cx("lengthCount")}>{nickName.length} / 20</span>
          </div>
          <input
            id="nickNameInput"
            className={cx("nickNameInput", { error: error === "nickName" })}
            onChange={(e) => {
              if (e.target.value.length > 20) return;
              setError(null);
              setNickName(e.target.value);
            }}
            value={nickName}
            type="text"
            placeholder="닉네임을 입력하세요"
            autoComplete="nickname"
            aria-invalid={error === "nickName"}
            aria-describedby={error === "nickName" ? "nickNameError" : undefined}
          />
          {error === "nickName" && (
            <p id="nickNameError" className={cx("errorMsg")} role="alert">
              닉네임을 입력해 주세요.
            </p>
          )}
        </div>

        <div className={cx("field")}>
          <div className={cx("fieldHeader")}>
            <label className={cx("fieldLabel")} htmlFor="commentInputTxt">
              댓글
            </label>
            <span className={cx("lengthCount")}>{comment.length} / 300</span>
          </div>
          <textarea
            id="commentInputTxt"
            className={cx("commentInputTxt", { error: error === "comment" })}
            onChange={(e) => {
              if (e.target.value.length > 300) return;
              setError(null);
              setComment(e.target.value);
            }}
            placeholder="의견을 남겨 주세요"
            value={comment}
            rows={4}
            aria-invalid={error === "comment"}
            aria-describedby={error === "comment" ? "commentError" : undefined}
          />
          {error === "comment" && (
            <p id="commentError" className={cx("errorMsg")} role="alert">
              댓글을 입력해 주세요.
            </p>
          )}
        </div>

        {submitError && (
          <p className={cx("errorMsg")} role="alert">
            {submitError}
          </p>
        )}

        <div className={cx("btnWrapper")}>
          <button
            type="button"
            className={cx("commentSubmitBtn", "secondary")}
            onClick={() => {
              setNickName("");
              setComment("");
              setError(null);
              setSubmitError(null);
            }}
          >
            지우기
          </button>
          <button
            type="button"
            className={cx("commentSubmitBtn", "primary")}
            disabled={submitting}
            onClick={() => {
              makeReview();
            }}
          >
            {submitting ? "등록 중…" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
}
