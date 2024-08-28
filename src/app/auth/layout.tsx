import React from "react";
import ms from "@/utils/modifierSelector";
import styles from "./layout.module.scss";

const cn = ms(styles, "account");

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("-container")}>
      <div className={cn("__form-container")}>{children}</div>
    </div>
  );
};

export default AccountLayout;
