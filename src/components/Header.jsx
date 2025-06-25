import { useState } from "react";

export default function Header({ month, year, onPrev, onNext, onSelect, onToday }) {
  const [showPicker, setShowPicker] = useState(false);

  const years = Array.from({ length: 20 }, (_, i) => 2015 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleChange = () => {
    const selectedYear = document.getElementById("yearSelect").value;
    const selectedMonth = document.getElementById("monthSelect").value;
    onSelect(selectedMonth, selectedYear);
    setShowPicker(false);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-lg">
      
      <div className="flex items-center gap-6 mx-auto">
        <button
          onClick={onPrev}
          className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded"
        >
          ←
        </button>

        <div className="relative text-center">
          <h2
            className="text-xl font-bold cursor-pointer"
            onClick={() => setShowPicker(!showPicker)}
          >
            {month} {year}
          </h2>

          {showPicker && (
            <div className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 bg-white text-black p-4 shadow-md rounded-lg w-60">
              <select
                id="monthSelect"
                className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {months.map((m, idx) => (
                  <option key={m} value={idx + 1}>{m}</option>
                ))}
              </select>
              <select
                id="yearSelect"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <button
                onClick={handleChange}
                className="bg-blue-600 text-white w-full mt-3 py-2 rounded hover:bg-blue-700"
              >
                Go
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onNext}
          className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded"
        >
          →
        </button>
      </div>

      <button
        onClick={onToday}
        className="bg-white text-blue-600 border border-white hover:bg-blue-100 px-3 py-1 rounded"
      >
        Today
      </button>
    </div>
  );
}
