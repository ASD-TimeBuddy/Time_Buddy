import { MONTHS, WEEKDAYS } from "../data/constants";

export function formatDate (dateString: string | number | Date) {
  const date = new Date(dateString);
  // invalid date
  if (isNaN(date.getTime())) {
    return "";
  }
  const D = date.getDate();
  const MM = date.getMonth();
  const day = date.getDay();
  return `${WEEKDAYS[day]}, ${MONTHS[MM]} ${D}`;
}

export function formatTime (dateString: string | number | Date) {
  const date = new Date(dateString);
  // invalid date
  if (isNaN(date.getTime())) {
    return "";
  }
  const h = date.getHours();
  const m = date.getMinutes();
  return `${h}:${m}`;
}