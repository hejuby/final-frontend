import axios from "axios";
import { BoardPostResponse } from "@/@types/board";
import AnnouncementTitle from "@/components/Board/AnnouncementTitle";
import PostContent from "@/components/Board/PostContent";
import PostNavigation from "@/components/Board/PostNavigation";
import styles from "./page.module.scss";

const Post = async ({ params }: { params: { postId: string } }) => {
  const data: BoardPostResponse = await axios.get(
    `https://g6-server.dainreview.kr/api/post/notices/${params.postId}`,
  );
  const post = data.data;

  console.log(post);

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
        previous={post.previousPostId}
        next={post.nextPostId}
        list="/announcement"
      />
    </>
  );
};

export default Post;
