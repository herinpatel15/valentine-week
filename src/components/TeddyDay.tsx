import { useState } from 'react';

// Define types and interfaces
interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const TeddyDay: React.FC = () => {
  const [showLetter, setShowLetter] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);

  const cardEmojis: string[] = ['🧸', '💝', '🎀', '🌹', '💌', '🍫'];
  const gameCards: string[] = [...cardEmojis, ...cardEmojis];

  const initializeGame = (): void => {
    const shuffledCards: Card[] = gameCards
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji: emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setFlippedIndexes([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameStarted(true);
  };

  const handleCardClick = (index: number): void => {
    if (
      flippedIndexes.length === 2 || 
      flippedIndexes.includes(index) || 
      matchedPairs.includes(cards[index].emoji)
    ) {
      return;
    }

    const newFlippedIndexes: number[] = [...flippedIndexes, index];
    setFlippedIndexes(newFlippedIndexes);

    if (newFlippedIndexes.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndexes;
      
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        setMatchedPairs([...matchedPairs, cards[firstIndex].emoji]);
        setFlippedIndexes([]);
      } else {
        setTimeout(() => {
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };

  const isGameComplete: boolean = matchedPairs.length === cardEmojis.length;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-red-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="text-center p-6">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">
            Happy Teddy Day! 🧸
          </h1>
          
          {/* Teddy Bear */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="text-8xl">
              🧸
            </div>
          </div>

          {/* Love Letter */}
          {!showLetter ? (
            <button
              onClick={() => setShowLetter(true)}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition mb-4"
            >
              Open Letter 💌
            </button>
          ) : (
            <div className="bg-pink-50 p-4 rounded-lg mb-4 animate-fade-in">
              <p className="text-gray-700 italic">
                "My dearest, you're as cuddly as a teddy bear and as sweet as honey. 
                You make every day special just by being you. Happy Teddy Day! 💕"
              </p>
            </div>
          )}

          {/* Memory Game */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-pink-600 mb-2">
              As a Friend 😅 Memory Game ❤️
            </h2>
            {!gameStarted ? (
              <button
                onClick={initializeGame}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
              >
                Start Game
              </button>
            ) : (
              <>
                <div className="mb-4">
                  <span className="font-semibold">Moves: {moves}</span>
                  {isGameComplete && (
                    <div className="text-green-500 font-bold mt-2">
                      Congratulations! You won in {moves} moves! 🎉
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {cards.map((card, index) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(index)}
                      className={`aspect-square flex items-center justify-center text-2xl cursor-pointer rounded-lg transition-all duration-300 transform ${
                        flippedIndexes.includes(index) || matchedPairs.includes(card.emoji)
                          ? 'bg-pink-200 rotate-0'
                          : 'bg-pink-500 rotate-180'
                      }`}
                    >
                      {(flippedIndexes.includes(index) || matchedPairs.includes(card.emoji)) 
                        ? card.emoji 
                        : ''}
                    </div>
                  ))}
                </div>
                <button
                  onClick={initializeGame}
                  className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition text-sm"
                >
                  Restart Game
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TeddyDay;