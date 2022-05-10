import React from "react";
import { Timeline as TimelineMUI } from "@mui/lab";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import style from "./style.module.css";

export const Timeline = ({ createdAt, updatedAt }) => {
  return (
    <div>
      <TimelineMUI>
        <TimelineItem className={style.TimelineItemClass}>
          <TimelineSeparator>
            <TimelineDot variant="outlined" className={style.first} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Создан: {createdAt}</TimelineContent>
        </TimelineItem>
        <TimelineItem className={style.TimelineItemClass}>
          <TimelineSeparator>
            <TimelineDot variant="outlined" className={style.last} />
          </TimelineSeparator>
          <TimelineContent>Последнее изменение: {updatedAt}</TimelineContent>
        </TimelineItem>
      </TimelineMUI>
    </div>
  );
};
