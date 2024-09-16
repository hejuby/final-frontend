import { SNSResponse } from "@/@types/userProfile";
import SNSInput from "@/components/SNSInput";
import styles from "./index.module.scss";

interface ProfileSNSProps {
  snsInput: SNSResponse[];
  onChange: (updatedSNS: SNSResponse[]) => void;
}

const ProfileSNS = ({ snsInput, onChange }: ProfileSNSProps) => {
  const handleSNSChange = (id: string, value: string) => {
    const isSNSInput = snsInput.some((sns) => sns.snsType === id);

    let updateSNS;
    if (isSNSInput) {
      updateSNS = snsInput.map((sns) =>
        sns.snsType === id ? { ...sns, url: value } : sns,
      );
    } else {
      updateSNS = [...snsInput, { snsType: id, url: value }];
    }
    onChange(updateSNS);
  };

  return (
    <div className={styles.container}>
      <div className={styles["form-wrapper"]}>
        <form className={styles.form}>
          <SNSInput
            id="NAVER_BLOG"
            type="NAVER_BLOG"
            placeholder="네이버 블로그"
            gap={5}
            value={
              snsInput.find((sns) => sns.snsType === "NAVER_BLOG")?.url || ""
            }
            onSNSChange={handleSNSChange}
          />
          <SNSInput
            id="INSTAGRAM"
            type="INSTAGRAM"
            placeholder="인스타그램"
            gap={5}
            value={
              snsInput.find((sns) => sns.snsType === "INSTAGRAM")?.url || ""
            }
            onSNSChange={handleSNSChange}
          />
          <SNSInput
            id="YOUTUBE"
            type="YOUTUBE"
            placeholder="유튜브"
            gap={5}
            value={snsInput.find((sns) => sns.snsType === "YOUTUBE")?.url || ""}
            onSNSChange={handleSNSChange}
          />
          <SNSInput
            id="TIKTOK"
            type="TIKTOK"
            placeholder="틱톡"
            gap={5}
            value={snsInput.find((sns) => sns.snsType === "TIKTOK")?.url || ""}
            onSNSChange={handleSNSChange}
          />
          <SNSInput
            id="ETC"
            type="ETC"
            placeholder="기타"
            gap={5}
            value={snsInput.find((sns) => sns.snsType === "ETC")?.url || ""}
            onSNSChange={handleSNSChange}
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileSNS;
