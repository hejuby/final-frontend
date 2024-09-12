"use client";

import IconAuthList from "@/assets/icons/icon-auth-list.svg";
import IconDirectionRight from "@/assets/icons/icon-direction-right-blue.svg";
import Button from "@/components/Button";
import axios from "axios";
import styles from "./index.module.scss";

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

declare let window: IamportWindow;

interface AuthenticationProps {
  setName: (name: string) => void;
  setImpUid: (impUid: string) => void;
  setCertified: (certified: boolean) => void;
}

const Authentication: React.FC<AuthenticationProps> = ({
  setName,
  setImpUid,
  setCertified,
}) => {
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
            // 인증 성공
            setImpUid(resp.imp_uid);
            setCertified(true);

            console.log("인증 성공:", resp.imp_uid);

            try {
              // imp_uid를 백엔드에서 요청한 URL로 전달
              const backendResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/port/one`,
                {
                  imp_uid: resp.imp_uid,
                },
              );

              const { name } = backendResponse.data;
              setName(name);

              console.log("백엔드 응답 성공:", backendResponse.data);
            } catch (error) {
              if (error instanceof axios.AxiosError) {
                console.error(
                  "백엔드 응답 에러:",
                  error.response?.data?.message || error.message,
                );
              } else {
                console.error("백엔드 응답 중 알 수 없는 에러:", error);
              }
            }
          } else {
            // 인증 실패
            console.error("인증 실패:", resp.error_msg);
          }
        },
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("인증 중 에러 발생:", error.message);
      } else {
        console.error("인증 중 알 수 없는 에러 발생:", error);
      }
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
