import React, {useState, useEffect} from 'react';
import '../stylesheet/board.scss';

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

const Board  = (props) => {
  const {board, piece} = props;

  const squares = board
    .map((row, rowIdx) => {
      return row.map((col, colIdx) => {
        let color = '';
        if(board[rowIdx][colIdx] !== 'empty') color = board[rowIdx][colIdx];
        return (
          <div 
            className={"tile " + board[rowIdx][colIdx]}
            key={"squares_" + rowIdx + colIdx} 
            id={rowIdx + letters[colIdx]}
          >
            {rowIdx + letters[colIdx]}
          </div>)
      })
  });
  
  return (
    <div className="board">
      {squares}
    </div>
  )
}

export default Board;