import type { Metadata } from "next";
import "../styles/reset.scss";
import FloatingKakaoButton from "@/components/FloatingKakaoButton";
import FloatingTopButton from "@/components/FloatingTopButton";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileGnb from "@/components/MobileGnb";
import Dialog from "@/components/Dialog";
import Script from "next/script";

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
        <Header />
        <Layout>{children}</Layout>
        <FloatingTopButton />
        <FloatingKakaoButton />
        <Footer />
        <MobileGnb />
        <Dialog />
        <div id="dialog" />
        <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=46bd6cdd6d6a2dc07e1f79277450fafe&libraries=services,clusterer&autoload=false" />
      </body>
    </html>
  );
};

export default RootLayout;
