import React, { forwardRef } from "react";
import IconBlog from "@/assets/icons/icon-sns-blog.svg";
import IconInstagram from "@/assets/icons/icon-sns-instagram.svg";
import IconYoutube from "@/assets/icons/icon-sns-youtube.svg";
import IconTictok from "@/assets/icons/icon-sns-tictok.svg";
import IconEtc from "@/assets/icons/icon-sns-etc.svg";
import styles from "./index.module.scss";
import Input, { InputProps } from "../Input";

type SNSInputProps = {
  type: "NAVER_BLOG" | "INSTAGRAM" | "YOUTUBE" | "TIKTOK" | "ETC";
} & Omit<InputProps, "type">;

const SNSInput = forwardRef<HTMLInputElement, SNSInputProps>(
  ({ type, ...props }, ref) => {
    const getSNSIcon = () => {
      switch (type) {
        case "NAVER_BLOG":
          return <IconBlog />;
        case "INSTAGRAM":
          return <IconInstagram />;
        case "YOUTUBE":
          return <IconYoutube />;
        case "TIKTOK":
          return <IconTictok />;
        case "ETC":
          return <IconEtc />;
        default:
          return null;
      }
    };

    return (
      <div className={styles.sns}>
        {getSNSIcon()}
        <Input
          {...props}
          ref={ref}
          id={props.id || "sns"}
          full
          gap={5}
          maxLength={300}
        />
      </div>
    );
  },
);

SNSInput.displayName = "SNSInput";

export default SNSInput;
