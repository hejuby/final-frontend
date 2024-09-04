"use client";

import React, { useEffect, useState, useRef } from "react";
import Modal from "@/components/Modal";
import IconHeartGray from "@/assets/icons/icon-heart-gray.svg";
import IconLeft from "@/assets/icons/icon-direction-right.svg";
import IconDown from "@/assets/icons/icon-direction-down.svg";
import IconUp from "@/assets/icons/icon-direction-up.svg";
import IconClose from "@/assets/icons/icon-close-blue.svg";
import useDialog from "@/hooks/useDialog";
import Selectbox, { Option } from "@/components/Selectbox/index";
import testData from "@/data/home_test.json";
import Card from "@/components/Home/Card";
import CityModal from "./_component/CityModal";
import styles from "./page.module.scss";

const Search = () => {
  const { alert } = useDialog();

  const [category, setCategory] = useState<Option | null>(null);
  const [flatform, setFlatform] = useState<Option | null>(null);
  const [type, setType] = useState<Option | null>(null);
  const [recommend, setRecommend] = useState<Option | null>(null);

  const [isCityModal, setIsCityModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<
    { city: string; county: string }[]
  >([]);

  const [isTablet, setIsTablet] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

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
      setSelectedCity(null);
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
            options={[
              { optionLabel: "전체", value: "All" },
              { optionLabel: "맛집", value: "Restaurant" },
              { optionLabel: "뷰티", value: "Beauty" },
              { optionLabel: "여행", value: "Travel" },
              { optionLabel: "문화", value: "Culture" },
              { optionLabel: "식품", value: "Food" },
              { optionLabel: "생활", value: "Living" },
              { optionLabel: "디지털", value: "Digital" },
            ]}
            onChange={setCategory}
          />
          <Selectbox
            placeholder="플랫폼"
            size="medium"
            selected={flatform}
            options={[
              { optionLabel: "전체", value: "All" },
              { optionLabel: "인스타그램", value: "Instagram" },
              { optionLabel: "블로그", value: "Blog" },
              { optionLabel: "유튜브", value: "Youtube" },
              { optionLabel: "릴스", value: "Reels" },
              { optionLabel: "쇼츠", value: "Shorts" },
              { optionLabel: "틱톡", value: "Tiktok" },
            ]}
            onChange={setFlatform}
          />
          <Selectbox
            placeholder="유형"
            size="medium"
            selected={type}
            options={[
              { optionLabel: "전체", value: "All" },
              { optionLabel: "방문형", value: "visit" },
              { optionLabel: "구매형", value: "purchase" },
              { optionLabel: "배송형", value: "delivery" },
              { optionLabel: "기자단", value: "corps" },
              { optionLabel: "포장", value: "packaging" },
            ]}
            onChange={setType}
          />
          <Selectbox
            placeholder="추천순"
            size="medium"
            selected={recommend}
            options={[
              { optionLabel: "추천순", value: "recommend" },
              { optionLabel: "인기순", value: "popularity" },
              { optionLabel: "마감임박순", value: "d" },
              { optionLabel: "최신순", value: "update" },
            ]}
            onChange={setRecommend}
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
        {testData.premium.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </section>
    </div>
  );
};

export default Search;
