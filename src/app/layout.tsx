import type { Metadata } from "next";
import "../styles/reset.scss";
import FloatingKakaoButton from "@/components/FloatingKakaoButton";
import FloatingTopButton from "@/components/FloatingTopButton";

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
    <html lang="en">
      <body>
        {children}
        <FloatingTopButton />
        <FloatingKakaoButton />
      </body>
    </html>
  );
};

export default RootLayout;
