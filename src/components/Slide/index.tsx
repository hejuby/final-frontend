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
  navigation?: boolean;
  breakpoints?: Record<
    number,
    { slidesPerView?: number; spaceBetween?: number }
  >;
}

const Slide: React.FC<SlideProps> = ({
  children,
  slidesPerView = 4,
  navigation = false,
  breakpoints = {},
}) => {
  const slides = React.Children.toArray(children);
  return (
    <Swiper
      slidesPerView={slidesPerView}
      simulateTouch={true}
      grabCursor={true}
      navigation={navigation}
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
