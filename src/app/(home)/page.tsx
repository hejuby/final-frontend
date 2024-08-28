import React from "react";
import IconMoreRight from "@/assets/icons/icon-caret-right.svg";
import Card from "@/components/Home/Card";
import Category from "@/components/Home/Category"; // 컴포넌트 임포트
import Slide from "@/components/Slide";
import styles from "./page.module.scss";
import Community from "@/assets/icons/icon-cate-community.svg";
import Guide from "@/assets/icons/icon-cate-guide.svg";
import Restaurant from "@/assets/icons/icon-cate-yummy.svg";
import Beauty from "@/assets/icons/icon-cate-beauty.svg";
import Travel from "@/assets/icons/icon-cate-travel.svg";
import Culture from "@/assets/icons/icon-cate-culture.svg";
import Food from "@/assets/icons/icon-cate-food.svg";
import Living from "@/assets/icons/icon-cate-living.svg";
import Digital from "@/assets/icons/icon-cate-digital.svg";

import testData from "@/data/home_test.json";

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

const Home = () => {
  return (
    <main>
      <section className={styles["slide-category"]}>
        <Slide
          slidesPerView={4}
          breakpoints={{
            350: { slidesPerView: 5 },
            481: { slidesPerView: 4, spaceBetween: 10 },
            600: { slidesPerView: 5 },
            740: { slidesPerView: 6, spaceBetween: 10 },
            900: { slidesPerView: 7, spaceBetween: 10 },
            1024: { slidesPerView: 8 },
            1200: { slidesPerView: 9 },
          }}
        >
          {categoryItems.map(({ icon, label }, index) => (
            <Category key={index} icon={icon} label={label} />
          ))}
        </Slide>
      </section>
      <section className={styles["slide-group"]}>
        <Slide>
          {testData.premium.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </Slide>
      </section>
      <section className={styles["array-group"]}>
        <div>
          <h3>
            신규 체험단
            <button>
              더보기 <IconMoreRight />
            </button>
          </h3>

          {testData.newest.slice(0, 3).map((card) => (
            <Card key={card.id} card={card} type="horizontal" />
          ))}
        </div>
        <div>
          <h3>
            마감임 체험단
            <button>
              더보기 <IconMoreRight />
            </button>
          </h3>
          <Card type="horizontal" />
        </div>
      </section>
    </main>
  );
};

export default Home;
