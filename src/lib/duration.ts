const millis = (n: number) => n;
const seconds = (n: number) => millis(n) * 1000;
const minutes = (n: number) => seconds(n) * 60;
const hours = (n: number) => minutes(n) * 60;
const days = (n: number) => hours(n) * 24;
const weeks = (n: number) => days(n) * 7;
const months = (n: number) => days(n) * 30;
const years = (n: number) => days(n) * 365;

export const Duration = {
  millis,
  seconds,
  minutes,
  hours,
  days,
  weeks,
  months,
  years,
};
