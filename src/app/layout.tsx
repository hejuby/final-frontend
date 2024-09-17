import { Suspense } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import Providers from "@/providers";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import FloatingTopButton from "@/components/FloatingTopButton";
import FloatingKakaoButton from "@/components/FloatingKakaoButton";
import Footer from "@/components/Footer";
import MobileGnb from "@/components/MobileGnb";
import Dialog from "@/components/Dialog";
import Loading from "./Loading";
import "../styles/reset.scss";

export const metadata: Metadata = {
  title: "다인리뷰",
  description: "체험단 플랫폼 다인리뷰입니다.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <Script src="https://cdn.iamport.kr/v1/iamport.js" />
      <body>
        <Providers>
          <Header />
          <Suspense fallback={<Loading />}>
            <Layout>{children}</Layout>
          </Suspense>
          <FloatingTopButton />
          <FloatingKakaoButton />
          <Footer />
          <MobileGnb />
          <Dialog />
          <div id="dialog" />
        </Providers>
        <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=46bd6cdd6d6a2dc07e1f79277450fafe&libraries=services,clusterer&autoload=false" />
      </body>
    </html>
  );
};

export default RootLayout;
