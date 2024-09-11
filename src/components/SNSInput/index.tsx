import React, { forwardRef } from "react";
import IconBlog from "@/assets/icons/icon-sns-blog.svg";
import IconInstagram from "@/assets/icons/icon-sns-instagram.svg";
import IconYoutube from "@/assets/icons/icon-sns-youtube.svg";
import IconTictok from "@/assets/icons/icon-sns-tictok.svg";
import IconEtc from "@/assets/icons/icon-sns-etc.svg";
import styles from "./index.module.scss";
import Input, { InputProps } from "../Input";

export type SNSInputType =
  | "NAVER_BLOG"
  | "INSTAGRAM"
  | "YOUTUBE"
  | "TIKTOK"
  | "ETC";
export type SNSInputName =
  | "sns.naverBlog"
  | "sns.instagram"
  | "sns.youtube"
  | "sns.tiktok"
  | "sns.etc";

interface SNSInputProps extends Omit<InputProps, "type"> {
  id: string;
  type: SNSInputType;
  placeholder: string;
}

const SNSInput = forwardRef<HTMLInputElement, SNSInputProps>(
  ({ id, type, name, placeholder, ...props }, ref) => {
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
          ref={ref}
          id={id}
          placeholder={placeholder}
          full
          gap={5}
          maxLength={300}
          {...props}
        />
      </div>
    );
  },
);

SNSInput.displayName = "SNSInput";

export default SNSInput;
