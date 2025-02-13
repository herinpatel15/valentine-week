// import React, { useState, useEffect, useRef } from 'react';
// import { Heart } from 'lucide-react';

// interface KissObject {
//   id: number;
//   x: number;
//   y: number;
//   speed: number;
//   emoji: string;
// }

// interface GameStats {
//   score: number;
//   lives: number;
//   level: number;
// }

// const KissDay = () => {
//   const [gameStarted, setGameStarted] = useState(false);
//   const [basketPosition, setBasketPosition] = useState(50);
//   const [kisses, setKisses] = useState<KissObject[]>([]);
//   const [stats, setStats] = useState<GameStats>({
//     score: 0,
//     lives: 3,
//     level: 1,
//   });
  
//   const gameAreaRef = useRef<HTMLDivElement>(null);
//   const animationFrameRef = useRef<number>();
//   const lastSpawnTimeRef = useRef<number>(Date.now());
  
//   const kissEmojis = ['💋', '❤️', '💝', '💕'];

//   const startGame = () => {
//     setGameStarted(true);
//     setStats({ score: 0, lives: 3, level: 1 });
//     setKisses([]);
//     lastSpawnTimeRef.current = Date.now();
//     gameLoop(Date.now());
//   };

//   const gameLoop = (timestamp: number) => {
//     if (!gameStarted) return;

//     // Spawn new kisses
//     if (timestamp - lastSpawnTimeRef.current > 2000 - stats.level * 200) {
//       const newKiss: KissObject = {
//         id: Date.now(),
//         x: Math.random() * 80 + 10, // Keep within 10-90% of width
//         y: 0,
//         speed: 2 + Math.random() * stats.level,
//         emoji: kissEmojis[Math.floor(Math.random() * kissEmojis.length)]
//       };
//       setKisses(prev => [...prev, newKiss]);
//       lastSpawnTimeRef.current = timestamp;
//     }

//     // Update positions and check collisions
//     setKisses(prev => {
//       const updatedKisses = prev.map(kiss => ({
//         ...kiss,
//         y: kiss.y + kiss.speed
//       })).filter(kiss => {
//         // Check if caught
//         if (kiss.y > 85 && kiss.y < 95 && 
//             Math.abs(kiss.x - basketPosition) < 10) {
//           setStats(s => ({
//             ...s,
//             score: s.score + 10,
//             level: Math.floor(s.score / 100) + 1
//           }));
//           return false;
//         }
//         // Check if missed
//         if (kiss.y > 100) {
//           setStats(s => ({
//             ...s,
//             lives: s.lives - 1
//           }));
//           return false;
//         }
//         return true;
//       });
//       return updatedKisses;
//     });

//     animationFrameRef.current = requestAnimationFrame(gameLoop);
//   };

//   useEffect(() => {
//     if (stats.lives <= 0) {
//       setGameStarted(false);
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     }
//   }, [stats.lives]);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!gameAreaRef.current) return;
//       const rect = gameAreaRef.current.getBoundingClientRect();
//       const x = ((e.clientX - rect.left) / rect.width) * 100;
//       setBasketPosition(Math.max(10, Math.min(90, x)));
//     };

//     if (gameStarted) {
//       window.addEventListener('mousemove', handleMouseMove);
//     }

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, [gameStarted]);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-pink-100 to-red-100 p-4">
//       <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-6">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-pink-600 mb-2">
//             Happy Kiss Day! 💋
//           </h1>
//           {!gameStarted ? (
//             <div className="space-y-4">
//               <p className="text-gray-600">
//                 Catch the falling kisses in your basket! 
//                 Move your mouse to control the basket.
//               </p>
//               <button
//                 onClick={startGame}
//                 className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition"
//               >
//                 Start Game
//               </button>
//             </div>
//           ) : (
//             <div className="flex justify-around mb-4">
//               <div className="text-pink-600">Score: {stats.score}</div>
//               <div className="flex gap-2">
//                 {Array.from({ length: stats.lives }).map((_, i) => (
//                   <Heart 
//                     key={i} 
//                     className="text-red-500" 
//                     fill="currentColor"
//                     size={20}
//                   />
//                 ))}
//               </div>
//               <div className="text-purple-600">Level: {stats.level}</div>
//             </div>
//           )}
//         </div>

//         {/* Game Area */}
//         <div
//           ref={gameAreaRef}
//           className="relative h-96 bg-gradient-to-b from-pink-50 to-purple-50 rounded-xl overflow-hidden"
//         >
//           {gameStarted && (
//             <>
//               {/* Falling Kisses */}
//               {kisses.map(kiss => (
//                 <div
//                   key={kiss.id}
//                   className="absolute transform -translate-x-1/2 transition-all duration-100"
//                   style={{
//                     left: `${kiss.x}%`,
//                     top: `${kiss.y}%`
//                   }}
//                 >
//                   <span className="text-2xl">{kiss.emoji}</span>
//                 </div>
//               ))}

//               {/* Basket */}
//               <div
//                 className="absolute bottom-0 transform -translate-x-1/2 transition-all duration-75"
//                 style={{ left: `${basketPosition}%` }}
//               >
//                 <div className="relative">
//                   <span className="text-4xl">🧺</span>
//                 </div>
//               </div>
//             </>
//           )}

//           {/* Game Over Screen */}
//           {!gameStarted && stats.score > 0 && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//               <div className="bg-white p-6 rounded-xl text-center">
//                 <h2 className="text-2xl font-bold text-pink-600 mb-4">
//                   Game Over!
//                 </h2>
//                 <p className="text-lg mb-4">Final Score: {stats.score}</p>
//                 <button
//                   onClick={startGame}
//                   className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
//                 >
//                   Play Again
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KissDay;


import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Heart } from 'lucide-react';

type Position = {
  x: number;
  y: number;
};

type Direction = 'up' | 'down' | 'left' | 'right' | null;

const KissDay = () => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [kissPos, setKissPos] = useState<Position>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState<Direction>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const GRID_SIZE = 10;
  const MOVE_SPEED = 200;

  useEffect(() => {
    if (!gameStarted) return;

    const moveInterval = setInterval(() => {
      if (direction) {
        setPlayerPos(prev => {
          const newPos = { ...prev };
          switch (direction) {
            case 'up':
              newPos.y = Math.max(0, prev.y - 1);
              break;
            case 'down':
              newPos.y = Math.min(GRID_SIZE - 1, prev.y + 1);
              break;
            case 'left':
              newPos.x = Math.max(0, prev.x - 1);
              break;
            case 'right':
              newPos.x = Math.min(GRID_SIZE - 1, prev.x + 1);
              break;
          }
          return newPos;
        });
      }
    }, MOVE_SPEED);

    return () => clearInterval(moveInterval);
  }, [direction, gameStarted]);

  useEffect(() => {
    if (playerPos.x === kissPos.x && playerPos.y === kissPos.y) {
      setScore(prev => prev + 1);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1000);
      
      // Generate new kiss position
      setKissPos({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      });
    }
  }, [playerPos, kissPos]);

  const handleKeyDown = (key: Direction) => {
    setDirection(key);
  };

  const handleKeyUp = () => {
    setDirection(null);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setPlayerPos({ x: 0, y: 0 });
    setKissPos({ x: 5, y: 5 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-red-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-4">
          Happy Kiss Day! 💋
        </h1>
        <h1 className="text-xl font-bold text-center text-pink-600 mb-1">
          I don't know what it's happening here, but it's fun! 😂
        </h1>
        <p className="text-base text-center text-gray-600 mb-4">
          #Innocent
        </p>

        {!gameStarted ? (
          <div className="text-center">
            {/* <p className="text-gray-600 mb-4">
              Move your character to catch the kisses! Use the direction buttons to play.
            </p> */}
            <button
              onClick={startGame}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
            >
              Start Game 🎮
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <p className="text-xl font-semibold text-pink-600">Score: {score}</p>
            </div>

            {/* Game Grid */}
            <div className="aspect-square bg-pink-50 rounded-lg p-2 mb-4 relative">
              <div className="grid grid-cols-10 gap-1 h-full">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                  const x = index % GRID_SIZE;
                  const y = Math.floor(index / GRID_SIZE);
                  const isPlayer = playerPos.x === x && playerPos.y === y;
                  const isKiss = kissPos.x === x && kissPos.y === y;

                  return (
                    <div
                      key={index}
                      className={`aspect-square rounded ${
                        isPlayer || isKiss ? 'bg-pink-200' : 'bg-pink-100'
                      }`}
                    >
                      {isPlayer && <div className="text-center">😚</div>}
                      {isKiss && <div className="text-center">💋</div>}
                    </div>
                  );
                })}
              </div>

              {showMessage && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Heart className="text-red-500 w-12 h-12 animate-ping" fill="currentColor" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
              <div />
              <button
                onMouseDown={() => handleKeyDown('up')}
                onMouseUp={handleKeyUp}
                onTouchStart={() => handleKeyDown('up')}
                onTouchEnd={handleKeyUp}
                className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 active:bg-pink-700 transition"
              >
                <ArrowUp className="w-6 h-6" />
              </button>
              <div />
              <button
                onMouseDown={() => handleKeyDown('left')}
                onMouseUp={handleKeyUp}
                onTouchStart={() => handleKeyDown('left')}
                onTouchEnd={handleKeyUp}
                className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 active:bg-pink-700 transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onMouseDown={() => handleKeyDown('down')}
                onMouseUp={handleKeyUp}
                onTouchStart={() => handleKeyDown('down')}
                onTouchEnd={handleKeyUp}
                className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 active:bg-pink-700 transition"
              >
                <ArrowDown className="w-6 h-6" />
              </button>
              <button
                onMouseDown={() => handleKeyDown('right')}
                onMouseUp={handleKeyUp}
                onTouchStart={() => handleKeyDown('right')}
                onTouchEnd={handleKeyUp}
                className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 active:bg-pink-700 transition"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KissDay;