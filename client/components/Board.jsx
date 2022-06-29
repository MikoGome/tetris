import React, {useState, useEffect} from 'react';
import '../stylesheet/board.scss';

import {move} from '../gameLogic.js';
//tetris 10 squares wide, 20 squares tall
/*
[
  [div, div, div, div, div, div, div, div, div, div],
  [div, div, div, div, div, div, div, div, div, div],
  [div, div, div, div, div, div, div, div, div, div],
  [div, div, div, div, div, div, div, div, div, div],
  [div, div, div, div, div, div, div, div, div, div]...
]
*/

//pieces: L, L flipped, T, line, z, z flipped, square 

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const Board  = () => {
  const squares = Array(20).fill().map((el, row) => Array(10).fill().map((el, col) => <div className="tile" key={"squares_" + row + col} id={row + letters[col]}>{row + letters[col]}</div>));
  const [ piece, setPiece ] = useState([0, Math.floor(squares[0].length / 2)]); //position: [rowPos, colPos]

  document.body.onkeydown = e => {
    move(e, piece, setPiece);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      
      setPiece((prev) => {
        if(prev[0] >= squares.length) return clearInterval(interval);
        const [row, col] = prev;
        document.querySelectorAll('.tile').forEach(el => {
          el.classList.remove('red')
        });
        document.getElementById(row + letters[col]).classList.add('red');
        return [prev[0] + 1, prev[1]]
      });
      
    }, 1000);
  }, []);
  
  return (
    <div className="board">
      {squares}
    </div>
  )
}

export default Board;