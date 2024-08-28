import IconBlog from "@/assets/icons/icon-sns-blog.svg";
import IconInstargram from "@/assets/icons/icon-sns-instargram.svg";
import IconYoutube from "@/assets/icons/icon-sns-youtube.svg";
import IconTictok from "@/assets/icons/icon-sns-tictok.svg";
import IconEtc from "@/assets/icons/icon-sns-etc.svg";
import styles from "./index.module.scss";
import Input, { InputProps } from "../Input";

type SNSInputProps = {
  type: "blog" | "instargram" | "youtube" | "tictok" | "etc";
} & Omit<InputProps, "type">;

const SNSInput = ({ type, ...props }: SNSInputProps) => {
  const getSNSIcon = () => {
    switch (type) {
      case "blog":
        return <IconBlog />;
      case "instargram":
        return <IconInstargram />;
      case "youtube":
        return <IconYoutube />;
      case "tictok":
        return <IconTictok />;
      case "etc":
        return <IconEtc />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.sns}>
      {getSNSIcon()}
      <Input
        id="sns"
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        full
      />
    </div>
  );
};

export default SNSInput;
