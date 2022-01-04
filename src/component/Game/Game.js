import React, { useState, useCallback, useMemo } from "react";
import Board from "../Board/Board";

export default function Game() {
  const [gameData, setGameData] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    xIsNext: true,
    stepNumber: 0,
  });
  const { history, xIsNext, stepNumber } = gameData;
  const current = history[stepNumber];

  //useMemo
  const winner = useMemo(
    () => calculateWinner(current.squares),
    [current.squares]
  );

  const status = winner
    ? `Winner: ${winner}!!`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const moves = history.map((step, move) => {
    const desc = move ? `Go To Move #${move}` : "Go To Game Start";
    return (
      <li key={move}>
        <button
          onClick={() => {
            toJump(move);
          }}
        >
          {desc}
        </button>
      </li>
    );
  });

  //useCallback & useState,useReducer
  const handleClick = useCallback(
    (i) => {
      if (!winner) {
        setGameData((prev) => {
          const { history, xIsNext, stepNumber } = prev;
          const tempHistory = history.slice(0, stepNumber + 1);
          const squares = [...tempHistory[tempHistory.length - 1].squares];
          squares[i] = prev.xIsNext ? "X" : "O";

          return {
            ...prev,
            xIsNext: !xIsNext,
            history: [...tempHistory, { squares }],
            stepNumber: tempHistory.length,
          };
        });
      }
    },
    [winner]
  );

  const toJump = (step) => {
    setGameData((prev) => {
      return {
        ...prev,
        stepNumber: step,
        xIsNext: step % 2 === 0,
      };
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

const calculateWinner = (squares) => {
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (let i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];
    if (squares && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
