"use client";

import ms from "@/utils/modifierSelector";
import React, { useState } from "react";
import Checkbox from "../Checkbox";
import styles from "./index.module.scss";

interface TermsChecked {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

const cn = ms(styles, "terms");

const TermsAgreement = () => {
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [termsChecked, setTermsChecked] = useState<TermsChecked>({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleAllChecked = (checked: boolean) => {
    setAllChecked(checked);
    setTermsChecked({
      terms: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  const handleIndividualCheck = (
    name: keyof TermsChecked,
    checked: boolean,
  ) => {
    setTermsChecked((prevState) => {
      const newState = { ...prevState, [name]: checked };
      setAllChecked(newState.terms && newState.privacy && newState.marketing);
      return newState;
    });
  };

  return (
    <div className={cn("-agreement")}>
      <Checkbox
        id="all-terms"
        type="checkbox"
        checked={allChecked}
        onChange={(e) => handleAllChecked(e.target.checked)}
        gap={6}
      >
        이용약관 전체동의
      </Checkbox>

      <ul className={cn("__list")}>
        <li className={cn("__item")}>
          <Checkbox
            id="terms"
            type="checkbox"
            checked={termsChecked.terms}
            onChange={(e) => handleIndividualCheck("terms", e.target.checked)}
            gap={6}
          >
            이용약관 동의{" "}
            <span className={styles["text-require"]}>&#40;필수&#41;</span>
          </Checkbox>
        </li>
        <li className={cn("__item")}>
          <Checkbox
            id="privacy"
            type="checkbox"
            checked={termsChecked.privacy}
            onChange={(e) => handleIndividualCheck("privacy", e.target.checked)}
            gap={6}
          >
            개인정보 수집 및 이용 동의{" "}
            <span className={styles["text-require"]}>&#40;필수&#41;</span>
          </Checkbox>
        </li>
        <li className={cn("__item")}>
          <Checkbox
            id="marketing"
            type="checkbox"
            checked={termsChecked.marketing}
            onChange={(e) =>
              handleIndividualCheck("marketing", e.target.checked)
            }
            gap={6}
          >
            마케팅 정보 수신 &#40;선택&#41;
          </Checkbox>
        </li>
      </ul>
    </div>
  );
};

export default TermsAgreement;
