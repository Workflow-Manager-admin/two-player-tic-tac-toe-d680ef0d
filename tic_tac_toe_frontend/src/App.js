import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
const Square = ({ value, onClick }) => (
  <button className={`square ${value?.toLowerCase()}`} onClick={onClick}>
    {value}
  </button>
);

// PUBLIC_INTERFACE
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([]);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    // Add move to history
    setHistory([
      ...history,
      {
        player: xIsNext ? 'X' : 'O',
        position: i,
        moveNumber: history.length + 1
      }
    ]);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setHistory([]);
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Game Draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="App">
      <div className="game-status">{status}</div>
      
      <div className="board">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>

      <div className="move-history">
        <h3>Move History</h3>
        <ul className="move-list">
          {history.map((move, index) => (
            <li key={index}>
              Move {move.moveNumber}: Player {move.player} at position {move.position + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
