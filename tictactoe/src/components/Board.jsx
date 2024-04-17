import React from 'react';
import Square from './Square';
import './Board.css';

const Board = ({ squares, onSquareClick }) => {
  const renderSquare = (index) => (
    <Square
      key={index}
      value={squares[index]}
      onClick={() => onSquareClick(index)}
    />
  );

  return (
    <div className="board">{[0, 1, 2, 3, 4, 5, 6, 7, 8].map(renderSquare)}</div>
  );
};

export default Board;
