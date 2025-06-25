import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonthDays } from "../utils/dateUtils";
import Header from "./Header";
import EventCard from "./EventCard";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const month = currentDate.format("MMMM");
  const year = currentDate.format("YYYY");
  const monthNum = currentDate.format("MM");
  const days = getMonthDays(monthNum, year);
  const today = dayjs().format("YYYY-MM-DD");

  const changeMonth = (diff) => {
    setCurrentDate(currentDate.add(diff, "month"));
  };

  const handleSelect = (selectedMonth, selectedYear) => {
    const formattedMonth = String(selectedMonth).padStart(2, "0");
    const newDate = dayjs(`${selectedYear}-${formattedMonth}-01`);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(dayjs());
  };

  return (
    <div className="w-full h-full max-w-screen-xl mx-auto mt-2 bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300">
      <Header
        month={month}
        year={year}
        onPrev={() => changeMonth(-1)}
        onNext={() => changeMonth(1)}
        onSelect={handleSelect}
        onToday={goToToday}
      />

      <div className="grid grid-cols-7 gap-2 p-4 text-center bg-gray-50">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-semibold text-gray-700">{d}</div>
        ))}
      </div>

      {days.map((week, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-7 gap-2 px-4 pb-2 text-center">
          {week.map((day, idx) => {
            const dateStr = day
              ? dayjs(`${year}-${monthNum}-${String(day).padStart(2, "0")}`).format("YYYY-MM-DD")
              : null;

            const dayEvents = dateStr
              ? events.filter((e) => e.date === dateStr)
              : [];

            return (
              <div
                key={idx}
                className="border h-[80px] p-1 relative rounded-lg bg-white hover:bg-blue-50 transition-colors duration-200 shadow-sm"
              >
                {day && (
                  <>
                    <div
                      className={`text-sm font-semibold w-7 h-7 mx-auto flex items-center justify-center rounded-full ${
                        dateStr === today ? "bg-blue-600 text-white shadow-md" : "text-gray-700"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="mt-1 overflow-auto text-xs text-left max-h-[50px] custom-scrollbar">
                      {dayEvents.map((ev) => (
                        <EventCard key={ev.id} event={ev} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
