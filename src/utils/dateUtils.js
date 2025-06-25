import dayjs from "dayjs";

export const getMonthDays = (month, year) => {
  const date = dayjs(`${year}-${month}-01`);
  const startDay = date.startOf('month').day();
  const daysInMonth = date.daysInMonth();

  const calendar = [];
  let dayCount = 1;

  for (let week = 0; week < 6; week++) {
    const weekRow = [];
    for (let d = 0; d < 7; d++) {
      if ((week === 0 && d < startDay) || dayCount > daysInMonth) {
        weekRow.push(null);
      } else {
        weekRow.push(dayCount);
        dayCount++;
      }
    }
    if (weekRow.some(day => day !== null)) {
      calendar.push(weekRow);
    }
  }

  return calendar;
};

