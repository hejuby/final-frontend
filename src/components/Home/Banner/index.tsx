import React from "react";
import Link from "next/link";
import styles from "./index.module.scss";

interface IBannerProps {
  img: string;
  title: string;
  desc: string;
  href: string;
}
const Banner: React.FC<IBannerProps> = ({ title, desc, href, img }) => {
  return (
    <Link
      href={href}
      style={{ backgroundImage: `url(${img})` }}
      className={styles["top-banner"]}
    >
      <h2>
        다인리뷰
        <br />
        {title}
      </h2>
      <p>{desc}</p>
      <button type="button">바로가기</button>
    </Link>
  );
};

export default Banner;
