"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import CustomNavigation from "./Navigation/index";

interface SlideProps {
  children: ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
  slidesPerGroup?: number;
  direction?: "horizontal" | "vertical" | undefined;
  loop?: boolean;
  breakpoints?: Record<
    number,
    { slidesPerView?: number; spaceBetween?: number }
  >;
  styles?: { [key: string]: string };
  customNav?: boolean;
}

const Slide: React.FC<SlideProps> = ({
  children,
  slidesPerView = 4,
  spaceBetween = 10,
  slidesPerGroup = 1,
  direction = "horizontal",
  loop = true,
  breakpoints = {},
  styles = {},
  customNav = false,
}) => {
  const swiperRef = useRef<any>(null);

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const screenWidth = () => {
      setIsDesktop(window.innerWidth >= 1520);
    };
    screenWidth();

    window.addEventListener("resize", screenWidth);
    return () => window.removeEventListener("resize", screenWidth);
  }, []);

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        slidesPerGroup={slidesPerGroup}
        direction={direction}
        modules={[Navigation, Pagination]}
        loop={loop}
        breakpoints={breakpoints}
      >
        {React.Children.map(children, (child, index) => (
          // eslint-disable-next-line
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
      {isDesktop && customNav && (
        <CustomNavigation
          onPrev={handlePrev}
          onNext={handleNext}
          styles={styles}
        />
      )}
    </>
  );
};

export default Slide;
