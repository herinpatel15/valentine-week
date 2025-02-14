import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import TeddyDay from "./components/TeddyDay";
import PromiseDay from "./components/PromiseDay";
import Navbar from "./components/Navbar";
import HugDay from "./components/HugDay";
import { Sparkles } from 'lucide-react';
import KissDay from "./components/KissDay";
import ValentineDay from "./components/ValentineDay";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teddy" element={<TeddyDay />} />
        <Route path="/promise" element={<PromiseDay />} />
        <Route path="/hug" element={<HugDay />} />
        <Route path="/kiss" element={<KissDay />} />
        <Route path="/valentine" element={<ValentineDay />} />
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
      isNew: false,
    },
    {
      id: "promise",
      day: "Promise Day",
      date: "Feb 11",
      icon: "💕",
      isNew: false,
    },
    {
      id: "hug",
      day: "Hug Day",
      date: "Feb 12",
      icon: "🤗",
      isNew: false,
    },
    {
      id: "kiss",
      day: "Kiss Day",
      date: "Feb 13",
      icon: "💋",
      isNew: false,
    },
    {
      id: "valentine",
      day: "Valentine Day",
      date: "Feb 14",
      icon: "💝",
      isNew: true,
    },
  ];

  return (
    // <div className="min-h-screen bg-gradient-to-r from-pink-100 to-red-100 p-4 sm:p-6 md:p-8 flex items-center justify-center">
    //   <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-6">
    //     <h1 className="text-3xl font-bold text-center text-red-600 py-4">Valentine Week For I Don't Know</h1>

    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 sm:p-4">
    //       {valentineDays.map((dayInfo) => (
    //         <div
    //           key={dayInfo.day}
    //           onClick={() => navigate(`/${dayInfo.id}`)}
    //           className="cursor-pointer p-6 rounded-xl text-center transition-all bg-pink-50 hover:bg-pink-100 shadow-md hover:shadow-lg active:scale-95 duration-200"
    //         >
    //           <div className="flex justify-center mb-2 text-5xl">{dayInfo.icon}</div>
    //           <h2 className="font-semibold text-lg">{dayInfo.day}</h2>
    //           <p className="text-sm text-gray-600">{dayInfo.date}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-red-100 p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-center text-red-600 py-4">
          Valentine Week For I Don't Know
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 sm:p-4">
          {valentineDays.map((dayInfo) => (
            <div
              key={dayInfo.day}
              onClick={() => navigate(`/${dayInfo.id}`)}
              className={`relative cursor-pointer p-6 rounded-xl text-center transition-all 
                ${dayInfo.isNew 
                  ? 'bg-gradient-to-r from-pink-50 via-red-50 to-pink-50 animate-pulse shadow-xl hover:shadow-2xl hover:bg-pink-100 border border-pink-200' 
                  : 'bg-pink-50 hover:bg-pink-100 shadow-md hover:shadow-lg'
                } 
                active:scale-95 duration-200`}
            >
              {dayInfo.isNew && (
                <>
                  {/* Sparkle Effect */}
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
                  </div>
                  
                  {/* New Badge */}
                  <div className="absolute -top-3 -left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    New!
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-red-200 opacity-20 rounded-xl animate-pulse" />
                </>
              )}
              
              <div className={`flex justify-center mb-2 text-5xl ${dayInfo.isNew ? 'animate-bounce' : ''}`}>
                {dayInfo.icon}
              </div>
              
              <h2 className={`font-semibold text-lg ${dayInfo.isNew ? 'text-red-600' : ''}`}>
                {dayInfo.day}
              </h2>
              
              <p className="text-sm text-gray-600">
                {dayInfo.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;


// import React, { useState } from 'react';
// import { Sparkles } from 'lucide-react';

// const HomePage = () => {
//   const [currentPage, setCurrentPage] = useState('home');

//   const valentineDays = [
//     {
//       id: "teddy",
//       day: "Teddy Day",
//       date: "Feb 10",
//       icon: "🧸",
//       isNew: false,
//     },
//     {
//       id: "promise",
//       day: "Promise Day",
//       date: "Feb 11",
//       icon: "💕",
//       isNew: false,
//     },
//     {
//       id: "hug",
//       day: "Hug Day",
//       date: "Feb 12",
//       icon: "🤗",
//       isNew: true,
//     },
//   ];

//   // const handleNavigation = (pageId: string) => {
//   //   setCurrentPage(pageId);
//   //   // You can handle the page change here
//   //   console.log(`Navigating to ${pageId}`);
//   // };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-pink-100 to-red-100 p-4 sm:p-6 md:p-8 flex items-center justify-center">
//       <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-6">
//         <h1 className="text-3xl font-bold text-center text-red-600 py-4">
//           Valentine Week For I Don't Know
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 sm:p-4">
//           {valentineDays.map((dayInfo) => (
//             <div
//               key={dayInfo.day}
//               onClick={() => handleNavigation(dayInfo.id)}
//               className={`relative cursor-pointer p-6 rounded-xl text-center transition-all 
//                 ${dayInfo.isNew 
//                   ? 'bg-gradient-to-r from-pink-50 via-red-50 to-pink-50 shadow-xl hover:shadow-2xl hover:bg-pink-100 border border-pink-200' 
//                   : 'bg-pink-50 hover:bg-pink-100 shadow-md hover:shadow-lg'
//                 } 
//                 active:scale-95 duration-200`}
//             >
//               {dayInfo.isNew && (
//                 <>
//                   {/* Sparkle Effect */}
//                   <div className="absolute -top-2 -right-2">
//                     <Sparkles className="w-6 h-6 text-yellow-400" />
//                   </div>
                  
//                   {/* New Badge */}
//                   <div className="absolute -top-3 -left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
//                     New!
//                   </div>
                  
//                   {/* Glow Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-red-200 opacity-20 rounded-xl" />
//                 </>
//               )}
              
//               <div className={`flex justify-center mb-2 text-5xl ${dayInfo.isNew ? 'animate-bounce' : ''}`}>
//                 {dayInfo.icon}
//               </div>
              
//               <h2 className={`font-semibold text-lg ${dayInfo.isNew ? 'text-red-600' : ''}`}>
//                 {dayInfo.day}
//               </h2>
              
//               <p className="text-sm text-gray-600">
//                 {dayInfo.date}
//               </p>

//               {dayInfo.isNew && (
//                 <div className="absolute bottom-2 right-2">
//                   <span className="inline-flex h-2 w-2">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
//                   </span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;