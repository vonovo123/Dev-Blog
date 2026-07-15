import { Col, Row } from "antd";
import styles from "../styles/About.module.css";
import classNames from "classnames/bind";
import { Image } from "antd";
import {
  EnvironmentOutlined,
  GithubOutlined,
  MessageOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import BlogMarkDown from "./BlogMarkDown";

const cx = classNames.bind(styles);
export default function About({ profile, home }) {
  return (
    profile && (
      <div className={cx("about")}>
        <div className={cx("profileWrapper")}>
          <div className={cx("profileTitle")}>ABOUT ME</div>
          <Row className={cx("profileContent")} align="middle" gutter={[24, 16]}>
            <Col className={cx("profileDescImageWrapper")} xs={24} sm={8}>
              <Image
                src={profile.thumbnail.imageUrl}
                alt={"profile_image"}
                className={cx("profileDescImage")}
                preview={false}
              />
            </Col>
            <Col className={cx("profileBref")} xs={24} sm={16}>
              <ul className={cx("infoList")}>
                <li className={cx("profileDescInfoDetail")}>
                  <TeamOutlined className={cx("icon")} />
                  <span className={cx("text")}>{profile.company}</span>
                </li>
                <li className={cx("profileDescInfoDetail")}>
                  <EnvironmentOutlined className={cx("icon")} />
                  <span className={cx("text")}>{profile.location}</span>
                </li>
                <li className={cx("profileDescInfoDetail")}>
                  <GithubOutlined className={cx("icon")} />
                  <a
                    href={profile.gitUrl}
                    target={"_blank"}
                    rel="noreferrer"
                    className={cx("aTag", "text")}
                  >
                    {profile.gitUrl}
                  </a>
                </li>
                <li className={cx("profileDescInfoDetail")}>
                  <MessageOutlined className={cx("icon")} />
                  <span className={cx("text")}>{profile.intro}</span>
                </li>
              </ul>
            </Col>
            {/* <Col span={24}>
              <BlogMarkDown markdown={home.homeContent.markdown} />
            </Col> */}
          </Row>
        </div>
      </div>
    )
  );
}
