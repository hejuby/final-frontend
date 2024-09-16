"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ProfileInfo } from "@/@types/userProfile";
import useDialog from "@/hooks/useDialog";
import ProfileInfoEmployer from "@/components/Mypage/Employer/ProfileInfo";
import Line from "@/components/Line";
import Button from "@/components/Button";
import Loading from "@/app/Loading";
import NotFound from "@/components/NotFound";
import styles from "./page.module.scss";

const MypageProfileEmployer = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [isModify, setIsModify] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { alert, confirm } = useDialog();
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get<ProfileInfo>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/enterpriser/change`,
          {
            withCredentials: true,
          },
        );
        setProfileInfo(response.data);
        setIsLoading(false);
      } catch (fetchProfileDataError) {
        setError("프로필 정보를 불러오는 데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileInfoChange = (updatedField: Partial<ProfileInfo>) => {
    if (profileInfo) {
      setProfileInfo({
        ...profileInfo,
        ...updatedField,
      });
      setIsModify(true);
    }
  };

  const fetchProfileModifyData = (info: ProfileInfo) => {
    return {
      oldPassword: info.oldPassword || "",
      newPassword: info.newPassword || "",
      name: info.name,
      nickname: info.nickname,
      phone: info.phone,
      address: info.address || "",
      addressDetail: info.addressDetail || "",
      postalCode: info.postalCode || "",
    };
  };

  const handleProfileSave = async (data: ProfileInfo) => {
    if (!data) return;

    const requestBody = fetchProfileModifyData(data);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/enterpriser`,
        requestBody,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setProfileInfo((prev) => ({
          ...prev,
          ...response.data,
        }));
        setIsModify(false);
        await alert("저장되었습니다.");
      } else {
        await alert(`프로필 수정에 실패했습니다: ${response.statusText}`);
      }
    } catch (requestBodyError) {
      await alert("프로필 수정에 실패했습니다.");
    }
  };

  const handleUserDelete = async () => {
    try {
      const isConfirm = await confirm(
        "탈퇴 시 보유 포인트는 복구되지 않습니다. 계속하시겠습니까?",
      );
      if (isConfirm) {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
          {
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          await alert("회원탈퇴가 완료되었습니다.");
          router.push("/auth/login");
        } else {
          await alert("회원탈퇴에 실패했습니다.");
        }
      }
    } catch (useDeleteError) {
      await alert("회원탈퇴 처리 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }

  if (!profileInfo) {
    return null;
  }

  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h3 className={styles.title}>내 프로필 수정</h3>
        </header>
        <div className={styles.contents}>
          <ProfileInfoEmployer
            profileInfo={profileInfo}
            onChange={handleProfileInfoChange}
            onSubmit={handleProfileSave}
          />
        </div>
        <Line />
        <div className={styles["button-wrapper"]}>
          <Button
            size="large"
            disabled={!isModify}
            form="profileForm"
            type="submit"
          >
            저장하기
          </Button>
        </div>
      </section>
      <section className={styles.section}>
        <header className={styles.header}>
          <h3 className={styles.title}>회원탈퇴</h3>
        </header>
        <div className={styles.contents}>
          <Button color="outline--gray" onClick={handleUserDelete}>
            회원탈퇴하기
          </Button>
        </div>
      </section>
    </>
  );
};

export default MypageProfileEmployer;
