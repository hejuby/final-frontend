"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import Loading from "@/app/Loading";

const NaverCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchNaverToken = async () => {
      const code = searchParams.get("code");
      const type = "NAVER";

      if (code) {
        try {
          // 인가 코드 API 요청
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/login/oauth2/code/naver`,
            { code, type },
          );

          const { isRegistered, token } = response.data;

          localStorage.setItem("authCode", code);

          if (isRegistered) {
            // 이미 가입된 회원인 경우
            localStorage.setItem("accessToken", token);
            router.push("/");
          } else {
            // 가입되지 않은 회원인 경우
            router.push(`/auth/signup?type=${type}`);
          }
        } catch (error) {
          router.push("/404");
        }
      }
    };

    fetchNaverToken();
  }, [router, searchParams]);

  return <Loading />;
};

export default NaverCallback;
