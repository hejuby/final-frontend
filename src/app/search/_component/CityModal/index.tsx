import React from "react";
import cityList from "@/data/city_list.json";
import Line from "@/components/Line";
import IconLeft from "@/assets/icons/icon-direction-right.svg";
import IconDown from "@/assets/icons/icon-direction-down.svg";
import IconUp from "@/assets/icons/icon-direction-up.svg";
import IconClose from "@/assets/icons/icon-close-blue.svg";
import styles from "./index.module.scss";

interface CityModalProps {
  selectedCity: string | null;
  selectedCounty: { city: string; county: string }[];
  addCity: (city: string) => void;
  addCounty: (county: string) => void;
  deleteCounty: (city: string, county: string) => void;
  isModal?: boolean;
  setIsModal?: (isModal: boolean) => void;
  isTablet?: boolean;
}

interface CityList {
  cityOptions: string[];
  countyOptions: {
    [key: string]: string[];
  };
}

const CityModal: React.FC<CityModalProps> = ({
  selectedCity,
  selectedCounty,
  addCity,
  addCounty,
  deleteCounty,
  setIsModal,
  isModal,
  isTablet,
}) => {
  const { cityOptions, countyOptions } = cityList as CityList;

  const handleCitySelect = (city: string) => {
    addCity(city);
  };

  const handleCountySelect = (county: string) => {
    if (county === "전체") {
      selectedCounty.forEach(({ city: selCity, county: selCounty }) => {
        if (selCity === selectedCity && selCounty !== "전체") {
          deleteCounty(selCity, selCounty);
        }
      });

      addCounty(county);
    } else {
      const isOtherSelected = selectedCounty.some(
        (selection) =>
          selection.city === selectedCity && selection.county === "전체",
      );
      if (isOtherSelected) {
        deleteCounty(selectedCity!, "전체");
      }

      addCounty(county);
    }
  };

  const handleArea = () => {
    if (setIsModal) {
      setIsModal(false);
    }
  };
  return (
    <div className={styles["modal-wrap"]}>
      {isTablet && (
        <>
          <div className={styles["select-title"]}>
            <p>
              지역 선택
              <span>
                <IconLeft />
              </span>
            </p>
            <button onClick={handleArea} type="button">
              전체
              <span>{!isModal ? <IconUp /> : <IconDown />}</span>
            </button>
          </div>
          {/* 선택지역 */}
          {/* eslint-disable no-nested-ternary */}
          <div className={styles["selected-option"]}>
            {selectedCity === "전국" && selectedCounty.length === 0 ? (
              <p className={styles["selected-item"]}>
                전국
                <button
                  onClick={() => deleteCounty("전국", "")}
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
                  onClick={() => deleteCounty("재택", "")}
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
                    onClick={() => deleteCounty(city, county)}
                    type="button"
                    aria-label="close-button"
                  >
                    <IconClose />
                  </button>
                </p>
              ))
            )}
          </div>
        </>
      )}
      {/* 모바일만 */}

      <div className={styles["city-select"]}>
        {cityOptions.map((city) => (
          <button
            key={city}
            onClick={() => handleCitySelect(city)}
            className={selectedCity === city ? styles.selected : ""}
            type="button"
          >
            {city}
          </button>
        ))}
      </div>
      <Line />
      {selectedCity && selectedCity !== "전국" && selectedCity !== "재택" && (
        <div className={styles["county-select"]}>
          {countyOptions[selectedCity]?.map((county) => (
            <button
              key={county}
              type="button"
              onClick={() => handleCountySelect(county)}
              className={
                selectedCounty.some(
                  (selection) =>
                    selection.city === selectedCity &&
                    selection.county === county,
                )
                  ? styles.selected
                  : ""
              }
            >
              {county}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityModal;
