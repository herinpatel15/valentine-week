import React, { useState, useEffect } from "react";

const PromiseDay: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 10-second game
  const [hearts, setHearts] = useState<{ id: number; top: number; left: number }[]>([]);
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

  // Function to generate a new heart at random positions
  const generateHeart = () => {
    const newHeart = {
      id: Date.now(),
      top: Math.random() * 80, // Random top position (0-80%)
      left: Math.random() * 80, // Random left position (0-80%)
    };
    setHearts((prevHearts) => [...prevHearts, newHeart]);
  };

  // Function to handle clicking a heart
  const handleCatchHeart = (id: number) => {
    setScore((prevScore) => prevScore + 1); // Increase score
    setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== id)); // Remove the clicked heart
  };

  // Game timer
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameStarted]);

  // Generate hearts every 500ms while the game is running
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const heartInterval = setInterval(generateHeart, 500);
      return () => clearInterval(heartInterval);
    }
  }, [timeLeft, gameStarted]);

  // Reset the game
  const resetGame = () => {
    setScore(0);
    setTimeLeft(10);
    setHearts([]);
    setGameStarted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
      <h1 className="text-4xl font-bold text-pink-600 mb-4">Happy Promise Day! 💖</h1>
      <h1 className="text-xl font-bold text-pink-600 mb-4">Caught my hearts! 😅</h1>

      {!gameStarted ? (
        <button
          onClick={() => setGameStarted(true)}
          className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300"
        >
          Start Game
        </button>
      ) : (
        <>
        {/* <h1 className="text-xl font-bold text-pink-600 mb-4">Caught my hearts!</h1> */}
          <p className="text-xl text-pink-700 mb-2">Score: {score}</p>
          <p className="text-xl text-pink-700 mb-8">Time Left: {timeLeft} seconds</p>

          {/* Game Area */}
          <div className="relative w-full h-96 bg-pink-50 rounded-lg shadow-lg overflow-hidden">
            {hearts.map((heart) => (
              <div
                key={heart.id}
                onClick={() => handleCatchHeart(heart.id)}
                style={{ top: `${heart.top}%`, left: `${heart.left}%` }}
                className="absolute w-12 h-12 cursor-pointer animate-bounce"
              >
                ❤️
              </div>
            ))}
          </div>

          {/* Game Over Message */}
          {timeLeft === 0 && (
            <div className="mt-8 text-center">
              <h2 className="text-3xl font-bold text-pink-600">Game Over!</h2>
              <p className="text-xl text-pink-700">You caught {score} hearts! 🎉</p>
              <p className="text-lg text-pink-700 mt-4">What's your Promise for @herin710</p>
              <button
                onClick={resetGame}
                className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300"
              >
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PromiseDay;