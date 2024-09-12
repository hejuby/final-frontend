"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import IconMoreRight from "@/assets/icons/icon-caret-right.svg";
import Card from "@/components/Home/Card";
import Banner from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
import Slide from "@/components/Slide";
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
import { ICampaignItems } from "@/@types/campaignItems";
import axios from "axios";
import styles from "./page.module.scss";

const cn = ms(styles, "section");

const bannerItems = [
  {
    title: "신규 가입 이벤트",
    desc: "다인리뷰와의 첫 만남을 환영합니다.",
    href: "/",
    img: "/images/top-banner01.png",
  },
  {
    title: "클린체험단",
    desc: "먹튀 걱정 하지말고 편하게 활동하세요!",
    href: "/",
    img: "/images/top-banner02.png",
  },
];

const categoryItems = [
  {
    icon: <Community width={52} height={52} />,
    label: "커뮤니티",
    href: "/community",
  },
  { icon: <Guide width={52} height={52} />, label: "이용가이드", href: "/" },
  {
    icon: <Restaurant width={52} height={52} />,
    label: "맛집",
    href: "/search",
  },
  { icon: <Beauty width={52} height={52} />, label: "뷰티", href: "/search" },
  { icon: <Travel width={52} height={52} />, label: "여행", href: "/search" },
  { icon: <Culture width={52} height={52} />, label: "문화", href: "/search" },
  { icon: <Food width={52} height={52} />, label: "식품", href: "/search" },
  { icon: <Living width={52} height={52} />, label: "생활", href: "/search" },
  {
    icon: <Digital width={52} height={52} />,
    label: "디지털",
    href: "/search",
  },
];

const Home = () => {
  const [campaignData, setCampaignData] = useState<{
    premium: ICampaignItems[];
    popular: ICampaignItems[];
    newest: ICampaignItems[];
    imminent: ICampaignItems[];
  }>({
    premium: [],
    popular: [],
    newest: [],
    imminent: [],
  });

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/home`,
        );
        setCampaignData(response.data);
      } catch (error) {
        // eslint-disable-next-line
        console.error("Failed to fetch campaign data", error);
      }
    };

    fetchCampaignData();
  }, []);
  return (
    <main>
      <section className={cn("__top-banner")}>
        <Slide
          slidesPerView={1.1}
          spaceBetween={10}
          slidesPerGroup={1}
          customNav
          styles={styles}
          breakpoints={{
            481: { slidesPerView: 1.1, spaceBetween: 10 },
            624: { slidesPerView: 1.3 },
            800: { slidesPerView: 1.5 },
            950: { slidesPerView: 1.8 },
            1025: { slidesPerView: 2 },
          }}
        >
          {bannerItems.map(({ title, desc, href, img }, index) => (
            <Banner
              // eslint-disable-next-line
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
          styles={styles}
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
          {categoryItems.map(({ icon, label, href }, index) => (
            // eslint-disable-next-line
            <Category key={index} icon={icon} label={label} href={href} />
          ))}
        </Slide>
        <div className={styles.line}>{` `}</div>
      </section>
      <section className={cn("__slide")}>
        <h2>
          <span>
            프리미엄 체험단 <IconSparkle />
          </span>
          <button type="button" aria-label="moreIcon">
            더보기 <IconMoreRight />
          </button>
        </h2>
        <Slide
          styles={styles}
          customNav
          slidesPerView={1.1}
          spaceBetween={5}
          breakpoints={{
            370: { slidesPerView: 1.3 },
            440: { slidesPerView: 1.5 },
            480: { slidesPerView: 1.3 },
            520: { slidesPerView: 1.4 },
            580: { slidesPerView: 1.6 },
            660: { slidesPerView: 1.8 },
            750: { slidesPerView: 2.2 },
            850: { slidesPerView: 2.5 },
            980: { slidesPerView: 2.8 },
            1100: { slidesPerView: 3.2 },
            1260: { slidesPerView: 3.5 },
            1400: { slidesPerView: 4 },
          }}
        >
          {campaignData.premium.map((premium) => (
            // eslint-disable-next-line
            <Card key={premium.id} {...premium} />
          ))}
        </Slide>
      </section>
      <section className={cn("__slide")}>
        <h2>
          <span>
            인기 체험단 <IconHeart />
          </span>
          <button type="button" aria-label="moreIcon">
            더보기 <IconMoreRight />
          </button>
        </h2>
        <Slide
          styles={styles}
          customNav
          slidesPerView={1.1}
          spaceBetween={5}
          breakpoints={{
            370: { slidesPerView: 1.3 },
            440: { slidesPerView: 1.5 },
            480: { slidesPerView: 1.3 },
            520: { slidesPerView: 1.4 },
            580: { slidesPerView: 1.6 },
            660: { slidesPerView: 1.8 },
            750: { slidesPerView: 2.2 },
            850: { slidesPerView: 2.5 },
            980: { slidesPerView: 2.8 },
            1100: { slidesPerView: 3.2 },
            1260: { slidesPerView: 3.5 },
            1400: { slidesPerView: 4 },
          }}
        >
          {campaignData.popular.map((card) => (
            // eslint-disable-next-line
            <Card key={card.id} {...card} />
          ))}
        </Slide>
      </section>
      <section className={cn("__array")}>
        <div>
          <h2>
            신규 체험단
            <button type="button">
              더보기 <IconMoreRight />
            </button>
          </h2>

          {campaignData.newest.slice(0, 3).map((card) => (
            // eslint-disable-next-line
            <Card key={card.id} {...card} pattern="horizontal" />
          ))}
        </div>
        <div>
          <h2>
            마감임박 체험단
            <button type="button" aria-label="moreIcon">
              더보기 <IconMoreRight />
            </button>
          </h2>
          {campaignData.imminent.slice(0, 3).map((card) => (
            // eslint-disable-next-line
            <Card key={card.id} {...card} pattern="horizontal" />
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
