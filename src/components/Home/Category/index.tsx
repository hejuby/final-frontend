"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Community from "@/assets/icons/icon-cate-community.svg";
import Guide from "@/assets/icons/icon-cate-guide.svg";
import Restaurant from "@/assets/icons/icon-cate-yummy.svg";
import Beauty from "@/assets/icons/icon-cate-beauty.svg";
import Travel from "@/assets/icons/icon-cate-travel.svg";
import Culture from "@/assets/icons/icon-cate-culture.svg";
import Food from "@/assets/icons/icon-cate-food.svg";
import Living from "@/assets/icons/icon-cate-living.svg";
import Digital from "@/assets/icons/icon-cate-digital.svg";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import styles from "./index.module.scss";

const categoryItems = [
  { icon: Community, label: "커뮤니티" },
  { icon: Guide, label: "이용가이드" },
  { icon: Restaurant, label: "맛집" },
  { icon: Beauty, label: "뷰티" },
  { icon: Travel, label: "여행" },
  { icon: Culture, label: "문화" },
  { icon: Food, label: "식품" },
  { icon: Living, label: "생활" },
  { icon: Digital, label: "디지털" },
];
const Category = () => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  return (
    <section className={styles.category}>
      <Swiper
        slidesPerView={5}
        simulateTouch={true}
        grabCursor={true}
        // centeredSlides={true}
        // initialSlide={currentCard}
        onSlideChange={(swiper) => {
          setCurrentCard(swiper.snapIndex);
        }}
        observer={true}
        modules={[Navigation, Pagination]}
        breakpoints={{
          "@0.25": {
            slidesPerView: 6,
            spaceBetween: 50,
          },
          "@0.30": {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          "@0.38": {
            slidesPerView: 4,
            spaceBetween: 20,
          },

          "@0.45": {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          "@0.65": {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 9,
            spaceBetween: 40,
          },
        }}
      >
        <div className={styles["category-wrap"]}>
          {categoryItems.map(({ icon: Icon, label }, index) => (
            <SwiperSlide key={index}>
              <div className={styles["category-item"]}>
                <Icon width={52} height={52} />
                <p>{label}</p>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default Category;
