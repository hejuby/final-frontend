"use client";

import React, { useEffect, useState, useRef } from "react";
import Modal from "@/components/Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ICampaignSearch } from "@/@types/campaignItems";
import Loading from "@/app/Loading";
import IconHeartGray from "@/assets/icons/icon-heart-gray.svg";
import IconLeft from "@/assets/icons/icon-direction-right.svg";
import IconDown from "@/assets/icons/icon-direction-down.svg";
import IconUp from "@/assets/icons/icon-direction-up.svg";
import IconClose from "@/assets/icons/icon-close-blue.svg";
import useDialog from "@/hooks/useDialog";
import Selectbox, { Option } from "@/components/Selectbox/index";
import Card from "@/components/Home/Card";
import CityModal from "./_component/CityModal";

import styles from "./page.module.scss";

const Search = ({
  searchParams,
}: {
  searchParams: {
    cities?: string;
    districts?: string;
    sortBy?: string;
    category?: string;
    platform?: string;
    type?: string;
  };
}) => {
  const { alert } = useDialog();
  const router = useRouter();

  const initialSortByValue = (() => {
    switch (searchParams.sortBy) {
      case "CLOSING_SOON":
        return "마감임박순";
      case "NEWEST":
        return "최신순";
      default:
        return "추천순";
    }
  })();

  const categories = [
    { optionLabel: "전체", value: "" },
    { optionLabel: "맛집", value: "FOOD" },
    { optionLabel: "뷰티", value: "BEAUTY" },
    { optionLabel: "여행", value: "TRAVEL" },
    { optionLabel: "문화", value: "CULTURE" },
    { optionLabel: "식품", value: "GROCERY" },
    { optionLabel: "생활", value: "LIFESTYLE" },
    { optionLabel: "디지털", value: "DIGITAL" },
  ];

  const initialCategory =
    categories.find((cat) => cat.value === searchParams.category) ||
    categories[0];
  const [category, setCategory] = useState<Option | null>(initialCategory);
  const [platform, setPlatform] = useState<Option | null>({
    optionLabel: searchParams.platform || "전체",
    value: searchParams.platform || "",
  });
  const [campaignType, setCampaignType] = useState<Option | null>({
    optionLabel: searchParams.type || "전체",
    value: searchParams.type || "",
  });
  const [recommend, setRecommend] = useState<Option | null>({
    optionLabel: initialSortByValue,
    value: searchParams.sortBy || "RECOMMENDED",
  });

  const [isCityModal, setIsCityModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCounty, setSelectedCounty] = useState<
    { city: string; county: string }[]
  >([]);

  const [isTablet, setIsTablet] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [campaignData, setCampaignData] = useState<ICampaignSearch | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // console.log(
  //   selectedCity,
  //   selectedCounty,
  //   category,
  //   platform,
  //   campaignType,
  //   recommend,
  // );
  // console.log(currentPage);
  useEffect(() => {
    const getCampaignData = async () => {
      setLoading(true);
      try {
        const cities = selectedCity || "";
        const districts = selectedCounty
          .map((county) => county.county)
          .join(", ");
        const sortBy = searchParams.sortBy || "RECOMMENDED";

        console.log(cities, "cities");
        console.log(districts, "districts");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/search`,
          {
            params: {
              cities,
              districts,
              category: category?.value || null,
              platform: platform?.value || null,
              type: campaignType?.value || null,
              sortBy,
              page: currentPage,
              size: 10,
            },
          },
        );

        if (currentPage === 0) {
          setCampaignData(response.data);
        } else {
          setCampaignData((prevData) => ({
            content: [...(prevData?.content || []), ...response.data.content],
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,
          }));
        }

        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.msg);
        }
      } finally {
        setLoading(false);
      }
    };

    getCampaignData();
    // eslint-disable-next-line
  }, [
    selectedCity,
    selectedCounty,
    category,
    platform,
    campaignType,
    recommend,
    currentPage,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category?.value) params.append("category", category.value.toString());
    if (platform?.value) params.append("platform", platform.value.toString());
    if (campaignType?.value)
      params.append("type", campaignType.value.toString());
    if (recommend?.value) params.append("sortBy", recommend.value.toString());
    if (selectedCity) params.append("cities", selectedCity);
    if (selectedCounty.length > 0) {
      selectedCounty.forEach(({ county }) =>
        params.append("districts", county),
      );
    }

    router.push(`/search?${params.toString()}`);
    // eslint-disable-next-line
  }, [
    category,
    platform,
    campaignType,
    recommend,
    selectedCity,
    selectedCounty,
    currentPage,
  ]);
  const handleScroll = () => {
    const { scrollY } = window;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (
      scrollY + windowHeight >= documentHeight - 100 &&
      !loading &&
      currentPage < totalPages - 1
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, [loading, currentPage, totalPages]);

  const handleArea = () => {
    setIsCityModal(!isCityModal);
  };

  // 지역선택
  const handleCitySelect = async (city: string) => {
    if (city === "전국" || city === "재택") {
      setSelectedCity(city);
      setSelectedCounty((prevCounties) =>
        prevCounties.filter(({ city: selCity }) => selCity === city),
      );
    } else {
      if (selectedCity && selectedCity !== city) {
        setSelectedCounty((prevCounties) =>
          prevCounties.filter(({ city: selCity }) => selCity !== selectedCity),
        );
      }
      setSelectedCity(city);

      const filteredCounties = selectedCounty.filter(
        ({ city: selCity }) => selCity === city,
      );
      setSelectedCounty((prevCounties) => [
        ...filteredCounties,
        ...prevCounties.filter(({ city: selCity }) => selCity !== city),
      ]);
    }
  };

  // 도시선택
  const handleCountySelect = async (county: string) => {
    if (selectedCity && selectedCity !== "전국" && selectedCity !== "재택") {
      const existingSelection = selectedCounty.find(
        (selection) =>
          selection.city === selectedCity && selection.county === county,
      );

      if (!existingSelection) {
        if (selectedCounty.length < 5) {
          setSelectedCounty((prevCounties) => [
            ...prevCounties,
            { city: selectedCity, county },
          ]);
        } else {
          await alert("지역 선택은 5개까지 가능합니다.");
        }
      }
    }
  };

  // 지역 삭제
  const handleDeleteCounty = (city: string, county: string) => {
    if (city === "전국" || city === "재택") {
      setSelectedCity("");
      setSelectedCounty([]);
    } else {
      setSelectedCounty((prevCounties) =>
        prevCounties.filter(
          (selection) =>
            !(selection.city === city && selection.county === county),
        ),
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 666);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsCityModal(false);
      }
    };

    if (isCityModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCityModal]);

  return (
    <div className={styles.container}>
      <h2>체험검색</h2>
      <section className={styles["select-section"]}>
        {/* 지역선택 (Left) */}
        <div className={styles["select-section__left"]}>
          <div className={styles["select-title"]}>
            <p>
              지역 선택
              <span>
                <IconLeft />
              </span>
            </p>
            <button onClick={handleArea} type="button">
              전체
              <span>{isCityModal ? <IconUp /> : <IconDown />}</span>
            </button>
          </div>
          {/* 선택지역 */}
          {/* eslint-disable no-nested-ternary */}
          <div className={styles["selected-option"]}>
            {selectedCity === "전국" && selectedCounty.length === 0 ? (
              <p className={styles["selected-item"]}>
                전국
                <button
                  onClick={() => handleDeleteCounty("전국", "")}
                  type="button"
                  aria-label="close-button"
                >
                  <IconClose />
                </button>
              </p>
            ) : selectedCity === "재택" && selectedCounty.length === 0 ? (
              <p className={styles["selected-item"]}>
                재택
                <button
                  onClick={() => handleDeleteCounty("재택", "")}
                  type="button"
                  aria-label="close-button"
                >
                  <IconClose />
                </button>
              </p>
            ) : (
              selectedCounty.map(({ city, county }) => (
                <p
                  key={`${city}-${county}`}
                  className={styles["selected-item"]}
                >
                  {`${city} ${county}`}
                  <button
                    onClick={() => handleDeleteCounty(city, county)}
                    type="button"
                    aria-label="close-button"
                  >
                    <IconClose />
                  </button>
                </p>
              ))
            )}
          </div>
        </div>
        {/* 셀렉트 (Right) */}
        <div className={styles["select-section__right"]}>
          <Selectbox
            placeholder="카테고리"
            size="medium"
            selected={category}
            options={categories}
            onChange={(selected) => {
              setCategory(selected);
            }}
          />
          <Selectbox
            placeholder="플랫폼"
            size="medium"
            selected={platform}
            options={[
              { optionLabel: "전체", value: "" },
              { optionLabel: "인스타그램", value: "INSTAGRAM" },
              { optionLabel: "블로그", value: "BLOG" },
              { optionLabel: "유튜브", value: "YOUTUBE" },
              { optionLabel: "릴스", value: "REELS" },
              { optionLabel: "쇼츠", value: "SHORTS" },
              { optionLabel: "틱톡", value: "TIKTOK" },
            ]}
            onChange={(selected) => {
              setPlatform(selected);
            }}
          />
          <Selectbox
            placeholder="유형"
            size="medium"
            selected={campaignType}
            options={[
              { optionLabel: "전체", value: "" },
              { optionLabel: "방문형", value: "VISIT" },
              { optionLabel: "구매형", value: "PURCHASE" },
              { optionLabel: "배송형", value: "DELIVERY" },
              { optionLabel: "기자단", value: "PRESS_CORPS" },
              { optionLabel: "포장", value: "TAKEOUT" },
            ]}
            onChange={(selected) => {
              setCampaignType(selected);
            }}
          />
          <Selectbox
            placeholder="추천순"
            size="medium"
            selected={recommend}
            options={[
              { optionLabel: "추천순", value: "RECOMMENDED" },
              { optionLabel: "인기순", value: "POPULAR" },
              { optionLabel: "마감임박순", value: "CLOSING_SOON" },
              { optionLabel: "최신순", value: "NEWEST" },
            ]}
            onChange={(selected) => {
              setRecommend(selected);
            }}
          />
          <button type="button">
            <IconHeartGray />
            <span>찜목록</span>
          </button>
        </div>
        {/* 지역선택 모달 */}
        <div
          className={styles["modal-position"]}
          style={selectedCounty.length > 0 ? { top: 90 } : { top: 40 }}
          ref={modalRef}
        >
          {!isTablet && isCityModal && (
            <CityModal
              selectedCity={selectedCity}
              selectedCounty={selectedCounty}
              addCity={handleCitySelect}
              addCounty={handleCountySelect}
              deleteCounty={handleDeleteCounty}
              isTablet={isTablet}
            />
          )}
          {isTablet && isCityModal && (
            <Modal isModal={isCityModal} onBackDrop={handleArea}>
              <CityModal
                selectedCity={selectedCity}
                selectedCounty={selectedCounty}
                addCity={handleCitySelect}
                addCounty={handleCountySelect}
                deleteCounty={handleDeleteCounty}
                setIsModal={setIsCityModal}
                isModal={isCityModal}
                isTablet={isTablet}
              />
            </Modal>
          )}
        </div>
      </section>
      <section className={styles["card-section"]}>
        {campaignData?.content.map((card, index) => (
          // eslint-disable-next-line
          <Card key={index} {...card} />
        ))}
      </section>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Search;
