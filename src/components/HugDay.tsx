// import { useState } from "react";

// const HugDay = () => {
//   const [message, setMessage] = useState<string | null>(null);

//   const hugMessages = [
//     "🤗 A big virtual hug for you!",
//     "💖 You just got a warm hug!",
//     "🥰 Someone is sending you love and hugs!",
//     "💞 A magical hug is on its way to you!",
//     "❤️ A tight hug full of happiness!"
//   ];

//   const sendHug = () => {
//     const randomMessage = hugMessages[Math.floor(Math.random() * hugMessages.length)];
//     setMessage(randomMessage);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-red-200 p-6">
//       <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
//         <h1 className="text-3xl font-bold text-red-600">Happy Hug Day! 🤗</h1>
//         <p className="text-gray-600 mt-2">Click the button to send a hug and get a surprise message!</p>
//         <button 
//           onClick={sendHug}
//           className="mt-4 px-6 py-3 text-lg font-semibold text-white bg-pink-500 rounded-full shadow-md hover:bg-pink-600 transition-all"
//         >
//           Send a Hug 💖
//         </button>
//         {message && <p className="mt-4 text-xl font-medium text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default HugDay;
import React, { useState, useEffect } from 'react';
import { Heart, PersonStanding, Star, Sparkles } from 'lucide-react';

interface HugBear {
  id: number;
  x: number;
  y: number;
  isHugged: boolean;
}

interface HugMessage {
  text: string;
  color: string;
}

const HugDayGame: React.FC = () => {
  const [bears, setBears] = useState<HugBear[]>([]);
  const [hugCount, setHugCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [hugPower, setHugPower] = useState<number>(0);
  const [sparkles, setSparkles] = useState<boolean>(false);

  const hugMessages: HugMessage[] = [
    { text: "Warm hugs! 🤗", color: "text-pink-500" },
    { text: "Bear hug! 🐻", color: "text-purple-500" },
    { text: "Super cuddle! ✨", color: "text-blue-500" },
    { text: "Love you! ❤️", color: "text-red-500" }
  ];

  useEffect(() => {
    generateBears();
  }, []);

  const generateBears = () => {
    const newBears: HugBear[] = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      x: Math.random() * 80 + 10, // Keep bears within 10-90% of container
      y: Math.random() * 80 + 10,
      isHugged: false
    }));
    setBears(newBears);
  };

  const handleHug = (bearId: number) => {
    setBears(prevBears =>
      prevBears.map(bear =>
        bear.id === bearId ? { ...bear, isHugged: true } : bear
      )
    );
    setHugCount(prev => prev + 1);
    setHugPower(prev => Math.min(prev + 10, 100));
    
    const randomMessage = hugMessages[Math.floor(Math.random() * hugMessages.length)];
    setMessage(randomMessage.text);
    setShowMessage(true);
    setSparkles(true);
    
    setTimeout(() => {
      setShowMessage(false);
      setSparkles(false);
    }, 1000);
  };

  const resetGame = () => {
    setBears(prevBears =>
      prevBears.map(bear => ({ ...bear, isHugged: false }))
    );
    setHugCount(0);
    setHugPower(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-red-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">
            Happy Hug Day! 🤗
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <Heart className="text-red-500 mr-2" fill="currentColor" />
              <span className="font-semibold">{hugCount} Hugs</span>
            </div>
            <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-500"
                style={{ width: `${hugPower}%` }}
              />
            </div>
          </div>
        </div>

        <div className="relative h-80 bg-gradient-to-b from-pink-50 to-purple-50 rounded-xl mb-6 overflow-hidden">
          {bears.map((bear) => (
            <button
              key={bear.id}
              onClick={() => !bear.isHugged && handleHug(bear.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                bear.isHugged ? 'scale-110' : 'hover:scale-105'
              }`}
              style={{
                left: `${bear.x}%`,
                top: `${bear.y}%`
              }}
            >
              <PersonStanding
                className={`${
                  bear.isHugged ? 'text-pink-500' : 'text-gray-400'
                } transition-colors duration-300`}
                size={32}
                fill={bear.isHugged ? 'currentColor' : 'none'}
              />
              {sparkles && bear.isHugged && (
                <Sparkles
                  className="absolute top-0 left-0 text-yellow-400 animate-ping"
                  size={40}
                />
              )}
            </button>
          ))}
          
          {showMessage && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-pink-600 animate-bounce">
              {message}
            </div>
          )}
        </div>

        <div className="text-center">
          {hugPower >= 100 ? (
            <div className="space-y-4">
              <div className="flex justify-center gap-2">
                <Star className="text-yellow-400" fill="currentColor" />
                <Heart className="text-red-500" fill="currentColor" />
                <Star className="text-yellow-400" fill="currentColor" />
              </div>
              <p className="text-lg text-purple-600 font-semibold">
                You're amazing at giving hugs! 🎉
              </p>
            </div>
          ) : (
            <p className="text-gray-600 mb-4">
              Give hugs to all the bears! 🐻
            </p>
          )}
          
          <button
            onClick={resetGame}
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition mt-4"
          >
            More Hugs! 🤗
          </button>
        </div>
      </div>
    </div>
  );
};

export default HugDayGame;