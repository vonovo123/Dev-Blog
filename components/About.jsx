import styles from "../styles/About.module.css";
import classNames from "classnames/bind";
import { Image } from "antd";
import {
  EnvironmentOutlined,
  GithubOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const cx = classNames.bind(styles);

/** Sanity profile.skills가 없을 때 경력기술서 기준 기본값 */
const DEFAULT_SKILLS = [
  "Java",
  "Spring / Spring Boot",
  "Oracle SQL",
  "HTML / CSS / SCSS",
  "JavaScript / TypeScript",
  "jQuery",
  "Vue.js",
  "React",
];

function resolveSkills(profile) {
  const fromSanity = (profile?.skills || [])
    .map((skill) => (typeof skill === "string" ? skill : skill?.name))
    .filter(Boolean);
  return fromSanity.length > 0 ? fromSanity : DEFAULT_SKILLS;
}

export default function About({ profile, onClose }) {
  if (!profile) return null;

  const skills = resolveSkills(profile);

  return (
    <div
      className={cx("about")}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={cx("profileWrapper")}>
        <div className={cx("profileHeader")}>
          <div className={cx("profileTitle")}>About Me</div>
          <button
            type="button"
            className={cx("closeBtn")}
            aria-label="About Me 닫기"
            onClick={() => onClose?.()}
          >
            닫기
          </button>
        </div>

        <div className={cx("profileBody")}>
          <div className={cx("profileDescImageWrapper")}>
            <Image
              src={profile.thumbnail.imageUrl}
              alt={profile.thumbnail?.alt || "프로필 이미지"}
              className={cx("profileDescImage")}
              preview={false}
            />
          </div>

          <div className={cx("profileBref")}>
            <div className={cx("chipRow")}>
              {profile.company && (
                <span className={cx("chip")}>
                  <TeamOutlined className={cx("chipIcon")} />
                  {profile.company}
                </span>
              )}
              {profile.location && (
                <span className={cx("chip")}>
                  <EnvironmentOutlined className={cx("chipIcon")} />
                  {profile.location}
                </span>
              )}
              {profile.gitUrl && (
                <a
                  href={profile.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx("chip", "chipLink")}
                >
                  <GithubOutlined className={cx("chipIcon")} />
                  GitHub
                </a>
              )}
            </div>

            {profile.intro && (
              <p className={cx("intro")}>{profile.intro}</p>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <div className={cx("skillsSection")}>
            <div className={cx("skillsTitle")}>기술 스택</div>
            <div className={cx("skillsRow")}>
              {skills.map((skill) => (
                <span key={skill} className={cx("skillTag")}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
