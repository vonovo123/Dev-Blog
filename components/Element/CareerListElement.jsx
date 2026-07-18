import styles from "../../styles/Element/CareerListElement.module.css";
import classNames from "classnames/bind";
import { Col, Row } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";
const cx = classNames.bind(styles);

function formatPeriod(from, to) {
  if (!from || !to) return "";
  return `${dayjs(from).format("YYYY.M.DD")} – ${dayjs(to).format("YYYY.M.DD")}`;
}

export default function CareerListElement({ element }) {
  const nodeRef = useRef(null);
  if (!element?.name) return null;

  const works = Array.isArray(element.works) ? element.works : [];

  return (
    <div className={cx("description")}>
      <div className={cx("descriptionHeader")}>
        <div className={cx("el")}>{element.name}</div>
        <div className={cx("el", "period")}>
          {formatPeriod(element.from, element.to)}
        </div>
      </div>
      <div className={cx("descriptionBody")} ref={nodeRef}>
        <Row className={cx("descriptionBodyHeader")} gutter={[24, 12]}>
          <Col xs={24} md={16}>
            업무
          </Col>
          <Col xs={24} md={8}>
            활용 기술
          </Col>
        </Row>
        {works.length === 0 && (
          <div className={cx("workDesc")}>등록된 업무가 없습니다.</div>
        )}
        {works.map((work, idx) => {
          const skills = Array.isArray(work?.skills) ? work.skills : [];
          return (
            <Row className={cx("descriptionCol")} gutter={[24, 12]} key={idx}>
              <Col xs={24} md={16}>
                <div className={cx("workPeriod")}>
                  {formatPeriod(work?.from, work?.to).replace("–", "~")}
                </div>
                <div className={cx("workName")}>{work?.name}</div>
                <div className={cx("workDesc")}>{work?.description}</div>
              </Col>
              <Col xs={24} md={8}>
                <div className={cx("tagWrapper")}>
                  {skills.map((skill, index) => (
                    <span key={index} className={cx("tag")}>
                      {skill?.name}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          );
        })}
      </div>
    </div>
  );
}
