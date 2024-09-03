"use client";

import React from "react";
import moment from "moment";
import "moment/locale/ko";
import PreviousIcon from "@/assets/icons/icon-calendar-prev-arrow.svg";
import NextIcon from "@/assets/icons/icon-calendar-next-arrow.svg";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./custom.css";

interface CustomCalendarProps {
  applicationStartDate: Date;
  applicationEndDate: Date;
  announcementDate: Date;
  experienceStartDate: Date;
  experienceEndDate: Date;
  reviewDate: Date;
}

const Customcalendar: React.FC<CustomCalendarProps> = ({
  applicationStartDate,
  applicationEndDate,
  announcementDate,
  experienceStartDate,
  experienceEndDate,
  reviewDate,
}) => {
  const addCustomClass = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      if (moment(date).isSame(reviewDate, "day")) {
        return "review-day";
      }
      if (moment(date).isSame(announcementDate, "day")) {
        return "announce-day";
      }
      if (moment(date).isSame(applicationStartDate, "day")) {
        return "application-start-day";
      }
      if (moment(date).isSame(applicationEndDate, "day")) {
        return "application-end-day";
      }
      if (
        moment(date).isBetween(
          applicationStartDate,
          applicationEndDate,
          undefined,
          "[]",
        )
      ) {
        return "application-period";
      }
      if (moment(date).isSame(experienceStartDate, "day")) {
        return "experience-start-day";
      }
      if (moment(date).isSame(experienceEndDate, "day")) {
        return "experience-end-day";
      }

      if (
        moment(date).isBetween(
          experienceStartDate,
          experienceEndDate,
          undefined,
          "[]",
        )
      ) {
        return "experience-period";
      }
    }
    return null;
  };
  return (
    <div className="clalendar-custom">
      <Calendar
        calendarType="gregory"
        formatDay={(local, date) => moment(date).format("D")}
        prevLabel={<PreviousIcon />}
        nextLabel={<NextIcon />}
        prev2Label={false}
        next2Label={false}
        locale="ko"
        tileClassName={addCustomClass}
      />
    </div>
  );
};

export default Customcalendar;
