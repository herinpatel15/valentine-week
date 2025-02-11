import { useState } from "react";

const HugDay = () => {
  const [message, setMessage] = useState<string | null>(null);

  const hugMessages = [
    "🤗 A big virtual hug for you!",
    "💖 You just got a warm hug!",
    "🥰 Someone is sending you love and hugs!",
    "💞 A magical hug is on its way to you!",
    "❤️ A tight hug full of happiness!"
  ];

  const sendHug = () => {
    const randomMessage = hugMessages[Math.floor(Math.random() * hugMessages.length)];
    setMessage(randomMessage);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-red-200 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600">Happy Hug Day! 🤗</h1>
        <p className="text-gray-600 mt-2">Click the button to send a hug and get a surprise message!</p>
        <button 
          onClick={sendHug}
          className="mt-4 px-6 py-3 text-lg font-semibold text-white bg-pink-500 rounded-full shadow-md hover:bg-pink-600 transition-all"
        >
          Send a Hug 💖
        </button>
        {message && <p className="mt-4 text-xl font-medium text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default HugDay;
