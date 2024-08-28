"use client";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

interface SlideProps {
  children: ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
  slidesPerGroup?: number;
  navigation?: boolean;
  loop?: boolean;
  breakpoints?: Record<
    number,
    { slidesPerView?: number; spaceBetween?: number }
  >;
}

const Slide: React.FC<SlideProps> = ({
  children,
  slidesPerView = 4,
  spaceBetween = 10,
  slidesPerGroup = 1,
  navigation = false,
  loop = true,
  breakpoints = {},
}) => {
  const slides = React.Children.toArray(children);
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      simulateTouch={true}
      grabCursor={true}
      loop={loop}
      navigation={navigation}
      slidesPerGroup={slidesPerGroup}
      breakpoints={breakpoints}
      modules={[Navigation, Pagination]}
      direction="horizontal"
    >
      {slides.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slide;
