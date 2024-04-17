// Square.jsx
import React from 'react';
import './Square.css';

const Square = ({ value, onClick }) => {
  return (
    <button className={`square ${value ? 'filled' : ''}`} onClick={onClick}>
      {value === 'X' && <span className="x">X</span>}
      {value === 'O' && <span className="o">O</span>}
    </button>
  );
};

export default Square;
