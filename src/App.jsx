import Calendar from "./components/Calendar";

export default function App() {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-gray-200 flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold text-blue-700 mt-4 mb-2 border-b-4 border-blue-300 pb-1">
        📅 Calendar
      </h1>

      <div className="w-full max-w-screen-xl flex-1 bg-white bg-opacity-70 backdrop-blur-md shadow-xl rounded-lg p-4 overflow-hidden">
        <Calendar />
      </div>
    </div>
  );
}
