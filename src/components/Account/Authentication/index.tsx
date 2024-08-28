"use client";

import IconAuthList from "@/assets/icons/icon-auth-list.svg";
import IconDirectionRight from "@/assets/icons/icon-direction-right-blue.svg";
import Button from "@/components/Button";
import styles from "./index.module.scss";

// types/iamport.d.ts
interface IamportWindow extends Window {
  IMP: {
    init: (code: string) => void;
    certification: (
      data: {
        pg: string;
        merchant_uid: string;
      },
      callback: (response: CertificationResponse) => void,
    ) => void;
  };
}

interface CertificationResponse {
  success: boolean;
  imp_uid: string;
  error_code?: string;
  error_msg?: string;
}

// 전역적으로 IMP 객체를 추가
declare let window: IamportWindow;

const Authentication = () => {
  const Certification = async (): Promise<void> => {
    try {
      const IMP_CODE = process.env.NEXT_PUBLIC_IMP_CODE;
      const MID = process.env.NEXT_PUBLIC_MID;

      if (!IMP_CODE) {
        throw new Error("IMP_CODE가 설정되지 않았습니다.");
      }

      // IMP.init 호출
      window.IMP.init(IMP_CODE);

      // 인증 요청
      window.IMP.certification(
        {
          pg: `inicis_unified.${MID}`,
          merchant_uid: `mer_id_${Date.now()}`,
        },
        async (resp: CertificationResponse) => {
          console.log(`=== IMP 모달 인증 결과 ===`);
          console.log(resp);

          if (resp.success) {
            // 성공적인 인증 처리
            console.log("인증 성공:", resp.imp_uid);
            // 백엔드에서 만든 본인인증 조회 api에 uid 값을 넣어서 호출
            // 여기에 성공 시 서버 호출 로직을 추가
          } else {
            // 인증 실패 처리
            console.error("인증 실패:", resp.error_msg);
          }
        },
      );
    } catch (error) {
      console.error("인증 중 에러 발생:", error);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.contents}>
        <h2>간편인증</h2>
        <p>
          네이버 / 카카오 / KB모바일 / 페이코 / PASS / 삼성패스 / TOSS / 신한 /
          금융인증서를 이용하여 로그인 할 수 있습니다.
        </p>
        <IconAuthList />
      </div>
      <div className={styles["button-container"]}>
        <Button size="medium" color="outline" full onClick={Certification}>
          간편인증 하러가기
          <IconDirectionRight />
        </Button>
      </div>
    </section>
  );
};

export default Authentication;
