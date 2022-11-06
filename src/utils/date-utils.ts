import { Timestamp } from "firebase/firestore";

export type IntervalTime = "day" | "week" | "month";

export const subtractDate = (original: Timestamp, interval: IntervalTime) => {
  let date = original.toDate();
  switch (interval) {
    case "day":
      return Timestamp.fromDate(new Date(date.getTime() - 86400000)); // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    case "week":
      return Timestamp.fromDate(new Date(date.getTime() - 604800000)); // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    case "month":
      return Timestamp.fromDate(new Date(date.getTime() - 2629746000)); // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  }
};
