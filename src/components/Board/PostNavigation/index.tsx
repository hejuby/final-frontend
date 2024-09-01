import Link from "next/link";
import IconDirectionLeft from "@/assets/icons/icon-direction-left.svg";
import IconDirectionRight from "@/assets/icons/icon-direction-right.svg";
import styles from "./index.module.scss";

interface PostNavigationProps {
  list: string;
  previous?: string;
  next?: string;
}

const PostNavigation = ({ list, previous, next }: PostNavigationProps) => {
  return (
    <nav>
      <ul className={styles.navigation}>
        {previous && (
          <li>
            <Link href={previous} className={styles.direction}>
              <IconDirectionLeft viewBox="0 0 24 24" />
              <p>이전글</p>
            </Link>
          </li>
        )}
        <li>
          <Link href={list} className={styles.list}>
            <p>목록</p>
          </Link>
        </li>
        {next && (
          <li>
            <Link href={next} className={styles.direction}>
              <p>다음글</p>
              <IconDirectionRight viewBox="0 0 24 24" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PostNavigation;
