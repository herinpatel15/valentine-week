// import React, { useState } from 'react';

// const ValentineDay = () => {
//   const [noButtonStyle, setNoButtonStyle] = useState({});
//   const [showCongrats, setShowCongrats] = useState(false);

//   const handleNoClick = () => {
//     const randomX = Math.random() * (window.innerWidth - 100);
//     const randomY = Math.random() * (window.innerHeight - 50);

//     setNoButtonStyle({
//       position: 'absolute',
//       left: `${randomX}px`,
//       top: `${randomY}px`
//     });
//   };

//   const handleYesClick = () => {
//     setShowCongrats(true);
//   };

//   if (showCongrats) {
//     return (
//       <div className="min-h-screen bg-pink-100 flex items-center justify-center">
//         <div className="text-center p-8 bg-white rounded-xl shadow-lg">
//           <h1 className="text-4xl font-bold text-pink-600 mb-4">
//             🎉 Congratulations! 💕
//           </h1>
//           <p className="text-2xl text-red-500">
//             You Said Yes to Love!
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-pink-100 to-red-100 flex items-center justify-center">
//       <div className="text-center p-8 bg-white rounded-xl shadow-lg">
//         <h1 className="text-3xl font-bold text-pink-600 mb-6">
//           Will You Be My Valentine? 💘
//         </h1>
//         <div className="flex justify-center space-x-4">
//           <button 
//             onClick={handleYesClick}
//             className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
//           >
//             Yes, I Will! 💕
//           </button>
//           <button 
//             onClick={handleNoClick}
//             style={noButtonStyle}
//             className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition"
//           >
//             No, Thanks 💔
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ValentineDay;
import React, { useState, useEffect } from 'react';
import { Heart, X, ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';

type Cell = {
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isPath: boolean;
    direction: string | null;
};

type Position = {
    row: number;
    col: number;
    //   direction?: string | null;
};

export default function ValentineDay() {
    const GRID_SIZE = 8;
    const [grid, setGrid] = useState<Cell[][]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPath, setCurrentPath] = useState<Position[]>([]);
    const [level, setLevel] = useState(1);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    const hasValidPath = (grid: Cell[][], start: Position, end: Position): boolean => {
        const queue: Position[] = [start];
        const visited = new Set<string>();
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

        while (queue.length > 0) {
            const current = queue.shift()!;
            const key = `${current.row},${current.col}`;

            if (current.row === end.row && current.col === end.col) {
                return true;
            }

            if (!visited.has(key)) {
                visited.add(key);

                for (const [dx, dy] of directions) {
                    const newRow = current.row + dx;
                    const newCol = current.col + dy;

                    if (
                        newRow >= 0 && newRow < GRID_SIZE &&
                        newCol >= 0 && newCol < GRID_SIZE &&
                        !grid[newRow][newCol].isWall
                    ) {
                        queue.push({ row: newRow, col: newCol });
                    }
                }
            }
        }
        return false;
    };

    const initializeGrid = () => {
        let validGrid = false;
        let newGrid: Cell[][];

        while (!validGrid) {
            newGrid = Array(GRID_SIZE).fill(null).map(() =>
                Array(GRID_SIZE).fill(null).map(() => ({
                    isStart: false,
                    isEnd: false,
                    isWall: false,
                    isPath: false,
                    direction: null,
                }))
            );

            newGrid[0][0].isStart = true;
            newGrid[GRID_SIZE - 1][GRID_SIZE - 1].isEnd = true;

            const wallCount = Math.min(8 + (level * 3), 20);
            for (let i = 0; i < wallCount; i++) {
                const row = Math.floor(Math.random() * GRID_SIZE);
                const col = Math.floor(Math.random() * GRID_SIZE);
                if (!newGrid[row][col].isStart && !newGrid[row][col].isEnd) {
                    newGrid[row][col].isWall = true;
                }
            }

            validGrid = hasValidPath(
                newGrid,
                { row: 0, col: 0 },
                { row: GRID_SIZE - 1, col: GRID_SIZE - 1 }
            );

            if (validGrid) {
                setGrid(newGrid);
                setCurrentPath([{ row: 0, col: 0 }]);
                setIsPlaying(true);
                setGameWon(false);
                setMoves(0);
            }
        }
    };

    const getDirection = (current: Position, next: Position): string | null => {
        // if (next.row < current.row) return 'up';
        // if (next.row > current.row) return 'down';
        // if (next.col < current.col) return 'left';
        // return 'right';
        if (next.row < current.row) return 'up';
        if (next.row > current.row) return 'down';
        if (next.col < current.col) return 'left';
        if (next.col > current.col) return 'right';
        return null; // Ensure it can return null
    };

    const getArrow = (direction: string) => {
        switch (direction) {
            case 'up': return <ArrowUp className="text-pink-400" size={20} />;
            case 'down': return <ArrowDown className="text-pink-400" size={20} />;
            case 'left': return <ArrowLeft className="text-pink-400" size={20} />;
            case 'right': return <ArrowRight className="text-pink-400" size={20} />;
            default: return null;
        }
    };

    const isValidMove = (row: number, col: number): boolean => {
        if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return false;
        if (grid[row][col].isWall) return false;

        const lastPos = currentPath[currentPath.length - 1];
        const rowDiff = Math.abs(row - lastPos.row);
        const colDiff = Math.abs(col - lastPos.col);

        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    };

    const handleCellClick = (row: number, col: number) => {
        if (!isPlaying || gameWon) return;
        if (!isValidMove(row, col)) return;

        const newPath = [...currentPath, { row, col }];
        setCurrentPath(newPath);
        setMoves(moves + 1);

        // // const newGrid = grid.map(r => r.map(cell => ({ ...cell, isPath: false, direction: null })));
        // const newGrid = [...grid].map(row => row.map(cell => ({ ...cell, direction: null, isPath: false })));

        // for (let i = 0; i < newPath.length - 1; i++) {
        //     const current = newPath[i];
        //     const next = newPath[i + 1];
        //     newGrid[current.row][current.col].isPath = true;
        //     // newGrid[current.row][current.col].direction = getDirection(current, next);
        //     newGrid[current.row][current.col].direction = getDirection(current, next);
        // }

        // newGrid[row][col].isPath = true;
        // setGrid(newGrid);

        const updatedGrid: Cell[][] = [...grid].map(row => row.map(cell => ({ ...cell, direction: null, isPath: false })));

        // Set direction for all path cells
        for (let i = 0; i < newPath.length - 1; i++) {
            const current = newPath[i];
            const next = newPath[i + 1];

            updatedGrid[current.row][current.col].isPath = true;
            updatedGrid[current.row][current.col].direction = getDirection(current, next);
        }

        updatedGrid[row][col].isPath = true;
        setGrid(updatedGrid);


        if (grid[row][col].isEnd) {
            setGameWon(true);
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        initializeGrid();
    }, [level]);

    const getCellContent = (cell: Cell) => {
        if (cell.isStart) return <Heart className="text-pink-500" size={20} />;
        if (cell.isEnd) return <Heart className="text-red-500" size={20} />;
        if (cell.isWall) return <X className="text-gray-500" size={20} />;
        if (cell.isPath && cell.direction) return getArrow(cell.direction);
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="text-center mb-4">
                        <h1 className="text-2xl font-bold text-pink-600 mb-2">Happy Valentine's Day 💝</h1>
                        <h1 className="text-2xl font-bold text-pink-600 mb-2">Find My, Heart</h1>
                        <p className="text-gray-500">Start upper side from the heart and find the way to the other heart.</p>
                        <p className="text-gray-500 font-bold">Click box and make path,</p>
                        <p className="text-pink-500">Level: {level} | Moves: {moves}</p>
                    </div>

                    <div className="aspect-square w-full mb-4">
                        <div className="grid grid-cols-8 gap-1 h-full bg-pink-50 p-2 rounded-lg">
                            {grid.map((row, rowIndex) => (
                                row.map((cell, colIndex) => (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`
                      aspect-square flex items-center justify-center
                      rounded-md transition-all duration-200
                      ${cell.isPath ? 'bg-pink-100' : 'bg-white'}
                      ${isValidMove(rowIndex, colIndex) ? 'hover:bg-pink-50 cursor-pointer' : ''}
                      ${cell.isWall ? 'bg-gray-100' : ''}
                      ${!cell.isWall && !cell.isPath ? 'shadow-sm' : ''}
                    `}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                    >
                                        {getCellContent(cell)}
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => initializeGrid()}
                            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-200"
                        >
                            Reset Level
                        </button>
                        {gameWon && (
                            <button
                                onClick={() => {
                                    setLevel(level + 1);
                                }}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                            >
                                Next Level
                            </button>
                        )}
                    </div>

                    {gameWon && (
                        <div className="text-center mt-4 text-green-500 font-bold">
                            Level Complete! ❤️
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}