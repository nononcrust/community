import { z } from "zod";
import { Duration } from "./duration";

export const Brand = {
  ISODateString: z.string().brand("ISODateString"),
};

export type ISODateString = z.infer<typeof Brand.ISODateString>;
export const ISODateString = (isoDateString: string) => isoDateString as ISODateString;

export const toISOString = (date: Date) => ISODateString(date.toISOString());

export const formatToTimeAgo = (isoDateString: ISODateString): string => {
  const date = new Date(isoDateString);

  const diffMs = Math.floor(Date.now() - date.getTime());

  if (diffMs < Duration.minutes(1)) {
    return `${Math.floor(diffMs / Duration.seconds(1))}초 전`;
  } else if (diffMs < Duration.hours(1)) {
    return `${Math.floor(diffMs / Duration.minutes(1))}분 전`;
  } else if (diffMs < Duration.days(1)) {
    return `${Math.floor(diffMs / Duration.hours(1))}시간 전`;
  } else if (diffMs < Duration.weeks(1)) {
    return `${Math.floor(diffMs / Duration.days(1))}일 전`;
  } else if (diffMs < Duration.months(1)) {
    return `${Math.floor(diffMs / Duration.weeks(1))}주 전`;
  } else if (diffMs < Duration.years(1)) {
    return `${Math.floor(diffMs / Duration.months(1))}달 전`;
  } else {
    return `${Math.floor(diffMs / Duration.years(1))}년 전`;
  }
};
