import { FC } from "react";
import Image from "next/image";
import styles from "./index.module.scss";

type SNSType = "NAVER_BLOG" | "INSTAGRAM" | "YOUTUBE" | "TIKTOK" | "ETC";

export interface SNSResponse {
  snsType: SNSType;
  url: string;
}

interface SNSListProps {
  snsResponseList: SNSResponse[];
}

const snsIcons: { [key in SNSType]: { active: string; inactive: string } } = {
  NAVER_BLOG: {
    active: "/icons/icon-sns-blog.svg",
    inactive: "/icons/icon-sns-blog-gray.svg",
  },
  INSTAGRAM: {
    active: "/icons/icon-sns-instagram.svg",
    inactive: "/icons/icon-sns-instagram-gray.svg",
  },
  YOUTUBE: {
    active: "/icons/icon-sns-youtube.svg",
    inactive: "/icons/icon-sns-youtube-gray.svg",
  },
  TIKTOK: {
    active: "/icons/icon-sns-tictok.svg",
    inactive: "/icons/icon-sns-tictok-gray.svg",
  },
  ETC: {
    active: "/icons/icon-sns-etc.svg",
    inactive: "/icons/icon-sns-etc-gray.svg",
  },
};

const SNSList: FC<SNSListProps> = ({ snsResponseList }) => {
  const snsTypes: SNSType[] = [
    "NAVER_BLOG",
    "INSTAGRAM",
    "YOUTUBE",
    "TIKTOK",
    "ETC",
  ];

  const activeSnsList = snsResponseList.map((sns) => sns.snsType);

  return (
    <ul className={styles.sns__list}>
      {snsTypes.map((sns) => (
        <li key={sns} aria-disabled={!activeSnsList.includes(sns)}>
          <Image
            src={
              activeSnsList.includes(sns)
                ? snsIcons[sns].active
                : snsIcons[sns].inactive
            }
            alt={`${sns} icon`}
            width={30}
            height={30}
          />
        </li>
      ))}
    </ul>
  );
};

export default SNSList;
