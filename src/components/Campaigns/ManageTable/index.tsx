import Link from "next/link";
import Table from "@/components/Table";
import Button from "@/components/Button";
import ToggleSwitch from "@/components/ToggleSwitch";
import IconLink from "@/assets/icons/icon-link.svg";
import IconMessage from "@/assets/icons/icon-message.svg";
import styles from "./index.module.scss";

const TABLE_HEAD = [
  "번호",
  "이름",
  "선정",
  "플랫폼 등급",
  "플랫폼",
  "방문수/팔로워",
  "취소 횟수",
  "신청한마디",
];

const TABLE_ORDER = [
  "index",
  "name",
  "selection",
  "platformRank",
  "platform",
  "views",
  "cancelCount",
  "comment",
];

const LIST: Record<Omit<typeof TABLE_ORDER, "index">[number], unknown>[] = [
  {
    name: "박다은",
    selection: false,
    platformRank: "프리미엄",
    platform: "",
    views: 350,
    cancelCount: 2,
    comment: "안녕하세요",
  },
  {
    name: "서유정",
    selection: true,
    platformRank: "초급",
    platform: "",
    views: 100,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "김송주",
    selection: false,
    platformRank: "고급",
    platform: "",
    views: 200,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "이이네",
    selection: false,
    platformRank: "중급",
    platform: "",
    views: 190,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "김돌석",
    selection: false,
    platformRank: "초급",
    platform: "",
    views: 140,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "김다혜",
    selection: false,
    platformRank: "중급",
    platform: "",
    views: 140,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "차영름",
    selection: true,
    platformRank: "초급",
    platform: "",
    views: 100,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "변희주",
    selection: false,
    platformRank: "프리미엄",
    platform: "",
    views: 600,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "박만쥬",
    selection: false,
    platformRank: "고급",
    platform: "",
    views: 220,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "이겨몬",
    selection: false,
    platformRank: "초급",
    platform: "",
    views: 110,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "권종일",
    selection: false,
    platformRank: "중급",
    platform: "",
    views: 180,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "송편돌",
    selection: false,
    platformRank: "초급",
    platform: "",
    views: 120,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "엄해영",
    selection: false,
    platformRank: "초급",
    platform: "",
    views: 100,
    cancelCount: 0,
    comment: "안녕하세요",
  },
  {
    name: "신비공주",
    selection: false,
    platformRank: "프리미엄",
    platform: "",
    views: 3400,
    cancelCount: 0,
    comment: "안녕하세요",
  },
];

const ManageTable = () => {
  return (
    <>
      <aside className={styles.top}>
        <label htmlFor="selected-campaigns" className={styles.top__control}>
          <ToggleSwitch id="selected-campaigns" />
          <p>선정된 체험단 우선 정렬</p>
        </label>
        <p
          className={styles.top__selected}
        >{`모집인원 ${LIST.filter((item) => item.selection).length}/${LIST.length}`}</p>
      </aside>
      <Table
        head={TABLE_HEAD}
        body={LIST.map((item, index) => {
          return {
            ...item,
            index: index + 1,
            // eslint-disable-next-line no-extra-boolean-cast
            selection: !!item.selection ? (
              <Button color="outline" padding="20px" disabled>
                <p className={styles["selection-button-text"]}>취소하기</p>
              </Button>
            ) : (
              <Button color="outline" padding="20px">
                <p className={styles["selection-button-text"]}>선정하기</p>
              </Button>
            ),
            platform: (
              <Link href={item.platform as string}>
                <IconLink />
              </Link>
            ),
            comment: (
              <button type="button" aria-label="신청한마디 버튼">
                <IconMessage />
              </button>
            ),
            isActive: !!item.selection,
          };
        })}
        order={TABLE_ORDER}
      />
    </>
  );
};

export default ManageTable;
