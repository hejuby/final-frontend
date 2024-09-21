"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import Loading from "@/app/Loading";

const KakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchKakaoToken = async () => {
      const code = searchParams.get("code");
      const type = "KAKAO";

      if (code) {
        try {
          // 인가 코드 API 요청
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/login/oauth2/code/kakao`,
            { code, type },
            { validateStatus: (status) => status === 200 || status === 400 },
          );

          if (response.status === 200) {
            // 200: 로그인 성공
            router.push("/");
          } else if (response.status === 400) {
            // 400: 회원가입 페이지로 이동
            router.push(`/auth/signup?type=${type}`);
          }
        } catch (error) {
          router.push("/404");
        }
      }
    };

    fetchKakaoToken();
  }, [router, searchParams]);

  return <Loading />;
};

export default KakaoCallback;
