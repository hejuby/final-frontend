import React from "react";
import Link from "next/link";
import IconMoreRight from "@/assets/icons/icon-caret-right.svg";
import Card from "@/components/Home/Card";
import Banner from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
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
import IconSparkle from "@/assets/icons/icon-glass-sparkle.svg";
import IconHeart from "@/assets/icons/icon-glass-heart.svg";

import ms from "@/utils/modifierSelector";

import testData from "@/data/home_test.json";

const cn = ms(styles, "section");

const bannerItems = [
  {
    title: "신규 가입 이벤트",
    desc: "다인리뷰와의 첫 만남을 환영합니다.",
    href: "",
    img: "/images/top-banner01.png",
  },
  {
    title: "클린체험단",
    desc: "먹튀 걱정 하지말고 편하게 활동하세요!",
    href: "",
    img: "/images/top-banner02.png",
  },
];

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
      <section className={cn("__top-banner")}>
        <Slide
          slidesPerView={2}
          spaceBetween={20}
          slidesPerGroup={1}
          navigation={true}
        >
          {bannerItems.map(({ title, desc, href, img }, index) => (
            <Banner
              key={index}
              title={title}
              desc={desc}
              href={href}
              img={img}
            />
          ))}
        </Slide>
      </section>
      <section className={cn("__category")}>
        <Slide
          slidesPerView={4}
          spaceBetween={30}
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
      <section className={cn("__slide")}>
        <h2>
          <span>
            프리미엄 체험단 <IconSparkle />
          </span>
          <button>
            더보기 <IconMoreRight />
          </button>
        </h2>
        <Slide navigation={true}>
          {testData.premium.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </Slide>
      </section>
      <section className={cn("__slide")}>
        <h2>
          <span>
            인기 체험단 <IconHeart />
          </span>
          <button>
            더보기 <IconMoreRight />
          </button>
        </h2>
        <Slide navigation={true}>
          {testData.popular.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </Slide>
      </section>
      <section className={cn("__array")}>
        <div>
          <h2>
            신규 체험단
            <button>
              더보기 <IconMoreRight />
            </button>
          </h2>

          {testData.newest.slice(0, 3).map((card) => (
            <Card key={card.id} card={card} type="horizontal" />
          ))}
        </div>
        <div>
          <h2>
            마감임박 체험단
            <button>
              더보기 <IconMoreRight />
            </button>
          </h2>
          {testData.imminent.slice(0, 3).map((card) => (
            <Card key={card.id} card={card} type="horizontal" />
          ))}
        </div>
      </section>
      <section className={cn("__banner")}>
        <Link href="/community">
          <h4>커뮤니티에서 맞팔 친구들을 찾아보세요!</h4>
          <p>다인리뷰에서 다양한 분야의 리뷰어들을 만나보세요!</p>
        </Link>
      </section>
    </main>
  );
};

export default Home;
