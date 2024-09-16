import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import useDialog from "@/hooks/useDialog";
import { ICampaignDetails } from "@/@types/campaignItems";
import IconMissionTag from "@/assets/icons/icon-mission-tag.svg?url";
import IconMissionText from "@/assets/icons/icon-mission-text.svg?url";
import IconMissionMap from "@/assets/icons/icon-mission-map.svg?url";
import IconMissionLink from "@/assets/icons/icon-mission-link.svg?url";
import IconMissionImage from "@/assets/icons/icon-mission-image.svg?url";
import IconMissionAd from "@/assets/icons/icon-mission-advertise.svg?url";
import Tag from "@/components/Tag";
import styles from "../../[productsId]/page.module.scss";

const CampaignNotice = ({
  campaignData,
}: {
  campaignData: ICampaignDetails;
}) => {
  const { alert } = useDialog();
  // 임시 데이터
  const latitude: number = 37.123456;
  const longitude: number = 126.987654;

  // 카카오맵 호출
  const KakaoMap = dynamic(() => import("../kakaoMap"), {
    ssr: false,
  });

  // 체험 불가능 요일 함수
  const weeks = ["월", "화", "수", "목", "금", "토", "일"];
  const unavailableDay = weeks.filter(
    (day) => !campaignData.availableDays.includes(day),
  );

  // 키워드 복사 이벤트
  const handleCopyKeyword = async () => {
    const keywords = campaignData.keywords.slice(0, 3).join(", ");
    try {
      await navigator.clipboard.writeText(keywords);
      alert("키워드가 클립보드에 복사되었습니다.");
    } catch (error) {
      alert("키워드 복사에 실패했습니다.");
    }
  };

  // 주소복사 이벤트
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(campaignData.address);
      alert("주소가 클립보드에 복사되었습니다.");
    } catch (error) {
      alert("주소 복사에 실패했습니다.");
    }
  };

  return (
    <div className={styles["product-notice-list"]}>
      {campaignData.type === "방문형" && (
        <dl>
          <dt>방문・예약 안내</dt>
          <dd>
            <ul>
              <li>
                <p>
                  <span>
                    체험가능 요일:
                    {campaignData.availableDays.map((item) => (
                      <span key={item}> {item}, </span>
                    ))}
                  </span>
                </p>
              </li>
              <li>
                <p>
                  {/* todo경민:  체험 가능시간 누락 */}
                  <span>체험 가능 시간 : 오후 7시 ~ 오후 10시</span>
                </p>
              </li>
              <li>
                <p>
                  체험 불가능 요일 :
                  {campaignData.availableDays.length > 0 &&
                    unavailableDay.map((item) => (
                      <span key={item}> {item}, </span>
                    ))}
                </p>
              </li>
              <li>
                <p>방문&체험 후 릴스 콘텐츠를 올리는 체험단입니다.</p>
              </li>
            </ul>
          </dd>
        </dl>
      )}

      <dl>
        <dt>주의 사항</dt>
        <dd>
          <ul>
            <li>
              <p>
                체험단 미션과 일정을 꼭 확인한 후에 신청해 주세요. 선정된 후에
                리뷰를 작성하지 않은 경우 페널티가 부과됩니다.
              </p>
            </li>
            <li>
              <p>유료 광고 표시(라벨 표시 / 게시글 내 표시)는 필수입니다.</p>
            </li>
          </ul>
        </dd>
      </dl>
      <dl>
        <dt>필수 체크 사항</dt>
        <dd>
          <ul>
            <li>
              <p>
                리뷰 미등록 시 서비스 이용료 및 제품에 대한 비용이 청구됩니다.
              </p>
            </li>
            <li>
              <p>초과 비용은 인플루언서 본인이 부담하여야 합니다.</p>
            </li>
            <li>
              <p>타쿠폰 및 할인 적용 불가합니다.</p>
            </li>
            <li>
              <p>예약 후 방문하지 않은 경우 페널티가 부과됩니다.</p>
            </li>
            <li>
              <p>
                작성하신 콘텐츠는 의무적으로 6개월간 유지하여야 하며, 6개월간
                업체 홍보용으로 사용될 수 있습니다.
              </p>
            </li>
          </ul>
        </dd>
      </dl>
      {/* 키워드 */}
      {campaignData.keywords.length > 0 && (
        <dl>
          <dt>태그용 키워드</dt>
          <dd className={styles["tag-wrap"]}>
            {campaignData.keywords.slice(0, 3).map((item) => (
              <Tag color="light-gray" key={item}>
                {item}
              </Tag>
            ))}
            <button type="button" onClick={handleCopyKeyword}>
              <Tag shape="rounded">복사</Tag>
            </button>
          </dd>
        </dl>
      )}

      {/* 미션 */}
      <dl className={styles.mission}>
        <dt>체험단 미션</dt>
        <dd>
          <ol>
            {/* 네이버 블로그 : 태그 등록, 지도 첨부, 링크 첨부, 1,000자 이상, 10장 이상, 공정위 문구 표시
인스타그램 : 태그 등록, 5장 이상, 계정 태그, 공정위 문구 표시
유튜브 : 태그 등록, 3분 이상, 소리 필수, 유료광고 표시, 공정위 문구 표시
틱톡 : 태그 등록, 30초 이상, 계정 태그, 소리 필수, 공정위 문구 표시
릴스 : 태그 등록, 30초 이상, 계정 태그, 소리 필수, 공정위 문구 표시
쇼츠 : 태그 등록, 30초 이상, 소리 필수, 유료광고 표시, 공정위 문구 표시
*/}
            <li>
              <div>
                <Image src={IconMissionTag} alt="tagIcon" />
              </div>
              <p>태그</p>
            </li>
            <li>
              <div>
                <Image src={IconMissionMap} alt="mapIcon" />
              </div>
              <p>지도</p>
            </li>
            <li>
              <div>
                <Image src={IconMissionLink} alt="linkIcon" />
              </div>
              <p>링크</p>
            </li>
            <li>
              <div>
                <Image src={IconMissionText} alt="textIcon" />
              </div>
              <p>1000자 이상</p>
            </li>
            <li>
              <div>
                <Image src={IconMissionImage} alt="imageIcon" />
              </div>
              <p>10장 이상</p>
            </li>
            <li>
              <div>
                <Image src={IconMissionAd} alt="advertiseIcon" />
              </div>
              <p>유료광고표시</p>
            </li>
          </ol>
        </dd>
      </dl>
      <dl>
        <dt>사업주 요청사항</dt>
        <dd>
          <ul>
            <li>
              <p>
                {/* todo: 경민 requirement 배열로 내려줄 수 있는지? */}
                {campaignData.requirement}
              </p>
            </li>
            <li>
              <p>30초 이상 동영상 하나 첨부, 소리 필수</p>
            </li>
            <li>
              <p>유료 광고 표시</p>
            </li>
          </ul>
        </dd>
      </dl>
      <dl>
        <dt>방문주소</dt>
        <dd>
          <div className={styles.address}>
            <p>{campaignData.address}</p>
            <button type="button" onClick={handleCopyAddress}>
              <Tag shape="rounded">복사</Tag>
            </button>
          </div>
          <div className={styles["map-wrap"]}>
            <KakaoMap latitude={latitude} longitude={longitude} />
          </div>
        </dd>
      </dl>
    </div>
  );
};

export default CampaignNotice;
