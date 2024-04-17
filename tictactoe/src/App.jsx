import React, { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './utils/gameUtils';
import './App.css';

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const handleSquareClick = (index) => {
    if (winner || board[index]) return; // If there's a winner or square is already filled, do nothing

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winnerPlayer = calculateWinner(newBoard);
    if (winnerPlayer) {
      setWinner(winnerPlayer);
      updateScore(winnerPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    if (window.confirm('Are you sure you want to reset the game?')) {
      setBoard(Array(9).fill(null));
      setWinner(null);
      setCurrentPlayer('X');
    }
  };

  const updateScore = (winner) => {
    setScores((prevScores) => {
      if (winner === 'X') {
        return { ...prevScores, X: prevScores.X + 1 };
      } else if (winner === 'O') {
        return { ...prevScores, O: prevScores.O + 1 };
      } else {
        return { ...prevScores, draws: prevScores.draws + 1 };
      }
    });
  };

  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="score-board">
        <div>
          Player X: <span className="score">{scores.X}</span>
        </div>
        <div>
          Player O: <span className="score">{scores.O}</span>
        </div>
        <div>
          Draws: <span className="score">{scores.draws}</span>
        </div>
      </div>
      <Board squares={board} onSquareClick={handleSquareClick} />
      {winner && (
        <div className="winner">
          <p>Winner: {winner}</p>
          <p>
            Scores: X ({scores.X}), O ({scores.O}), Draws ({scores.draws})
          </p>
        </div>
      )}
      {!winner && board.every((square) => square) && (
        <div className="draw">
          <p>It's a draw!</p>
          <p>
            Scores: X ({scores.X}), O ({scores.O}), Draws ({scores.draws})
          </p>
        </div>
      )}
      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
