import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import TeddyDay from "./components/TeddyDay";
import PromiseDay from "./components/PromiseDay";
import Navbar from "./components/Navbar";
// import HugDay from "./components/HugDay";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teddy" element={<TeddyDay />} />
        <Route path="/promise" element={<PromiseDay />} />
        {/* <Route path="/hug" element={<HugDay />} /> */}
      </Routes>
    </Router>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  const valentineDays = [
    {
      id: "teddy",
      day: "Teddy Day",
      date: "Feb 10",
      icon: "🧸",
    },
    {
      id: "promise",
      day: "Promise Day",
      date: "Feb 11",
      icon: "💕",
    },
    // {
    //   id: "hug",
    //   day: "Hug Day",
    //   date: "Feb 12",
    //   icon: "🤗",
    // },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-red-100 p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-center text-red-600 py-4">Valentine Week For I Don't Know</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 sm:p-4">
          {valentineDays.map((dayInfo) => (
            <div
              key={dayInfo.day}
              onClick={() => navigate(`/${dayInfo.id}`)}
              className="cursor-pointer p-6 rounded-xl text-center transition-all bg-pink-50 hover:bg-pink-100 shadow-md hover:shadow-lg active:scale-95 duration-200"
            >
              <div className="flex justify-center mb-2 text-5xl">{dayInfo.icon}</div>
              <h2 className="font-semibold text-lg">{dayInfo.day}</h2>
              <p className="text-sm text-gray-600">{dayInfo.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
