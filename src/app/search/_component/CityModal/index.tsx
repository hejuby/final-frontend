import React from "react";
import styles from "./index.module.scss";
import cityList from "@/data/city_list.json";
import Line from "@/components/Line";

interface CityModalProps {
  selectedCity: string | null;
  selectedCounty: { city: string; county: string }[];
  addCity: (city: string) => void;
  addCounty: (county: string) => void;
  deleteCounty: (city: string, county: string) => void;
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

  return (
    <div className={styles["modal-wrap"]}>
      <div className={styles["city-select"]}>
        {cityOptions.map((city) => (
          <button
            key={city}
            onClick={() => handleCitySelect(city)}
            className={selectedCity === city ? styles.selected : ""}
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
