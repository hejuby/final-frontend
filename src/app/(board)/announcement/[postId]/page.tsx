import { CommunityItemProps } from "@/components/Board/ListItem";
import AnnouncementTitle from "@/components/Board/AnnouncementTitle";
import PostContent from "@/components/Board/PostContent";
import PostNavigation from "@/components/Board/PostNavigation";
import mockData from "@/assets/mockData.json";
import styles from "./page.module.scss";

const Post = async ({ params }: { params: { postId: string } }) => {
  const data = mockData.announcement as CommunityItemProps[];
  const post = data.find((item) => item.id === Number(params.postId));

  if (!post) {
    return null;
  }

  return (
    <>
      <section className={styles.content}>
        <AnnouncementTitle post={post} />
        <PostContent content={post.content} />
      </section>
      <PostNavigation
        previous="/announcement/0"
        next="/announcement/0"
        list="/announcement"
      />
    </>
  );
};

export default Post;
