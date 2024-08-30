"use client";

import { useState } from "react";
import IconDirection from "@/assets/icons/icon-direction-right-gray.svg";
import IconWarning from "@/assets/icons/icon-warning-gray-filled.svg";
import IconClose from "@/assets/icons/icon-close.svg";
import styles from "./index.module.scss";

const InteractionListEmployer = () => {
  const [isOpenPenaltyModal, setIsOpenPenaltyModal] = useState(false);

  const handleOpenPenaltyModal = () => {
    setIsOpenPenaltyModal(true);
  };

  const handleClosePenaltyModal = () => {
    setIsOpenPenaltyModal(false);
  };

  return (
    <div className={styles["interaction-container"]}>
      <h3 className="visually-hidden">보유포인트, 찜하기, 패널티 정보</h3>
      <div className={styles.interaction__list}>
        <div className={styles.interaction__item}>
          <p className={styles.title}>
            보유포인트 <span>0P</span>
          </p>
          <button type="button" className="" aria-hidden>
            <IconDirection />
          </button>
        </div>
        <div className={styles.interaction__item}>
          <p className={styles.title}>
            패널티 <span>0</span>
          </p>
          <button
            type="button"
            className={styles["penalty-button"]}
            aria-label="패널티 정보 버튼"
            onClick={handleOpenPenaltyModal}
          >
            <IconWarning width="24" height="24" />
          </button>
        </div>
      </div>
      {isOpenPenaltyModal && (
        <article className={styles["penalty-container"]}>
          <h4 className="visually-hidden">패널티 정보</h4>
          <p className={styles.penalty__title}>
            패널티는 인플루언서, 사업주 서로간의 약속을 지키기 위한
            시스템입니다.
          </p>
          <div className={styles.penalty__table}>
            <table>
              <tr>
                <th>패널티 0회</th>
                <td>자유롭게 사이트 이용 가능</td>
              </tr>
              <tr>
                <th>패널티 1회</th>
                <td>사이트 이용 7일 정지</td>
              </tr>
              <tr>
                <th>패널티 2회</th>
                <td>사이트 이용 30일 정지</td>
              </tr>
              <tr>
                <th>패널티 3회</th>
                <td>사이트 이용 영구 정지</td>
              </tr>
            </table>
          </div>
          <h5>패널티 사유</h5>
          <div className={styles.penalty__type}>
            <strong>인플루언서</strong>
            <ul>
              <li>
                서비스를 제공받은 후 리뷰 작성 및 미션 수행을 하지 않은 경우
                (서비스에 대한 배상금 별도)
              </li>
              <li>방문 예약 후 방문하지 않은 경우</li>
              <li>
                체험단 선정된 후 취소 시 취소 횟수 부여, 취소 횟수 5회 시 패널티
                1회
              </li>
              <li>타 회원에 대해 거짓 정보를 제공해 불이익을 준 경우</li>
            </ul>
            <strong>사업주</strong>
            <ul>
              <li>체험단 모집 등록 후 체험단 선정을 하지 않은 경우</li>
              <li>
                체험단 선정 및 체험단 진행 중 체험단 취소/삭제를 하는 경우
              </li>
              <li>
                사업주가 정당한 사유 없이 인플루언서를 진상, 블로거지 등
                악성고객 취급하는 경우
              </li>
              <li>
                인플루언서가 예약 후 방문했음에도 서비스를 제공받지 못한 경우
              </li>
              <li>타 회원에 대해 거짓 정보를 제공해 불이익을 준 경우</li>
            </ul>
          </div>
          <button
            type="button"
            aria-hidden
            className={styles["close-button"]}
            onClick={handleClosePenaltyModal}
          >
            <IconClose />
          </button>
        </article>
      )}
    </div>
  );
};

export default InteractionListEmployer;
