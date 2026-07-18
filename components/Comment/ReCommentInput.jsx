import styles from "../../styles/ReComment.module.css";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import { createReComment } from "../../utils/sanityApi";
const cx = classNames.bind(styles);
export default function ReCommentInput({ id, reCommentListState }) {
  const [reCommentList, setReCommentList] = reCommentListState;
  const [nickName, setNickName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const makeReview = useCallback(async () => {
    if (nickName === "") {
      setError("nickName");
      return;
    } else if (comment === "") {
      setError("comment");
      return;
    }
    try {
      setSubmitError(null);
      const now = new Date();
      const recomment = await createReComment({
        id,
        nickName: JSON.stringify(nickName),
        comment: JSON.stringify(comment),
        createdAt: new Date(now.getTime()).toISOString(),
      });
      setReCommentList([recomment, ...reCommentList]);
      setNickName("");
      setComment("");
      setError(null);
    } catch (e) {
      setSubmitError("답글 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }, [nickName, comment, id, reCommentList, setReCommentList]);
  return (
    <div className={cx("commentInput")}>
      <div className={cx("commentInputWrapper")}>
        <div className={cx("commentInputInnerWrapper")}>
          <label className={cx("fieldLabel")} htmlFor={`reNickName-${id}`}>
            닉네임
          </label>
          <div className={cx("lengthCount")}>{`${nickName.length} / 20`}</div>
          <input
            id={`reNickName-${id}`}
            className={cx("nickNameInput", { error: error === "nickName" })}
            onChange={(e) => {
              if (e.target.value.length > 20) return;
              setError(null);
              setNickName(e.target.value);
            }}
            value={nickName}
            type="text"
            placeholder="닉네임을 입력하세요"
            aria-invalid={error === "nickName"}
            aria-describedby={
              error === "nickName" ? `reNickNameError-${id}` : undefined
            }
          />
          {error === "nickName" && (
            <p
              id={`reNickNameError-${id}`}
              className={cx("errorMsg")}
              role="alert"
            >
              닉네임을 입력해 주세요.
            </p>
          )}
        </div>
        <div className={cx("commentInputInnerWrapper")}>
          <label className={cx("fieldLabel")} htmlFor={`reComment-${id}`}>
            코멘트
          </label>
          <div className={cx("lengthCount")}>{`${comment.length} / 100`}</div>
          <textarea
            id={`reComment-${id}`}
            className={cx("commentInputTxt", { error: error === "comment" })}
            onChange={(e) => {
              if (e.target.value.length > 100) return;
              setError(null);
              setComment(e.target.value);
            }}
            placeholder="코멘트를 입력하세요"
            value={comment}
            aria-invalid={error === "comment"}
            aria-describedby={
              error === "comment" ? `reCommentError-${id}` : undefined
            }
          ></textarea>
          {error === "comment" && (
            <p
              id={`reCommentError-${id}`}
              className={cx("errorMsg")}
              role="alert"
            >
              코멘트를 입력해 주세요.
            </p>
          )}
        </div>
      </div>
      {submitError && (
        <p className={cx("errorMsg")} role="alert">
          {submitError}
        </p>
      )}
      <div className={cx("btnWrapper")}>
        <button
          type="button"
          className={cx("commentSubmitBtn")}
          onClick={() => {
            makeReview();
          }}
        >
          {"등록"}
        </button>
        <button
          type="button"
          className={cx("commentSubmitBtn")}
          onClick={() => {
            setNickName("");
            setComment("");
            setError(null);
            setSubmitError(null);
          }}
        >
          {"지우기"}
        </button>
      </div>
    </div>
  );
}
