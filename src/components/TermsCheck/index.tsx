import React, { useEffect } from "react";
import {
  FieldErrors,
  get,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import Link from "next/link";
import ms from "@/utils/modifierSelector";
import Checkbox from "../Checkbox";
import styles from "./index.module.scss";

interface TermsCheckProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

const cn = ms(styles, "terms");

const TermsCheck: React.FC<TermsCheckProps> = ({
  register,
  watch,
  setValue,
  errors,
}) => {
  const termsCheck = watch("termsCheck.terms") || false;
  const privacyCheck = watch("termsCheck.privacy") || false;
  const marketingCheck = watch("termsCheck.marketing") || false;

  const allCheck = termsCheck && privacyCheck && marketingCheck;

  useEffect(() => {
    setValue("termsCheck.all", allCheck);
  }, [termsCheck, privacyCheck, marketingCheck, setValue]);

  const handleAllCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setValue("termsCheck.terms", checked);
    setValue("termsCheck.privacy", checked);
    setValue("termsCheck.marketing", checked);
  };

  const termsError = get(errors, "termsCheck.terms");
  const privacyError = get(errors, "termsCheck.privacy");

  return (
    <div className={cn("-check")}>
      <Checkbox
        id="all-terms"
        type="checkbox"
        register={register("termsCheck.all")}
        onChange={handleAllCheckChange}
        gap={6}
        checked={allCheck}
      >
        이용약관 전체동의
      </Checkbox>

      <ul className={cn("__list")}>
        <li className={cn("__item")}>
          <Checkbox
            id="terms"
            type="checkbox"
            register={register("termsCheck.terms", {
              required: "이용약관 동의에 체크해주세요.",
            })}
            gap={6}
            onChange={(e) => setValue("termsCheck.terms", e.target.checked)}
            checked={termsCheck}
          >
            <Link href="/terms?tab=terms" target="_blank">
              이용약관 동의
            </Link>
            <span className={styles["text-require"]}>&#40;필수&#41;</span>
          </Checkbox>
          {termsError && (
            <p className={styles["error-message"]}>{termsError.message}</p>
          )}
        </li>
        <li className={cn("__item")}>
          <Checkbox
            id="privacy"
            type="checkbox"
            register={register("termsCheck.privacy", {
              required: "개인정보 수집 및 이용 동의에 체크해주세요.",
            })}
            gap={6}
            onChange={(e) => setValue("termsCheck.privacy", e.target.checked)}
            checked={privacyCheck}
          >
            <Link href="/terms?tab=privacy" target="_blank">
              개인정보 수집 및 이용 동의
            </Link>
            <span className={styles["text-require"]}>&#40;필수&#41;</span>
          </Checkbox>
          {privacyError && (
            <p className={styles["error-message"]}>{privacyError.message}</p>
          )}
        </li>
        <li className={cn("__item")}>
          <Checkbox
            id="marketing"
            type="checkbox"
            register={register("termsCheck.marketing")}
            gap={6}
            onChange={(e) => setValue("termsCheck.marketing", e.target.checked)}
            checked={marketingCheck}
          >
            마케팅 정보 수신 &#40;선택&#41;
          </Checkbox>
        </li>
      </ul>
    </div>
  );
};

export default TermsCheck;
