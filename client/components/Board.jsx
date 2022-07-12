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
  const {color, position} = piece; //[{row: 1, col: 1}, {row: 1, col: 2}]
  
  const squares = board
    .map((row, rowIdx) => {
      return row.map((col, colIdx) => {
        let colorClass = '';
        //pieces on the board
        if(board[rowIdx][colIdx] !== 'empty') colorClass = board[rowIdx][colIdx];

        //piece falling
        else {
          for(let el of position) {
            if(rowIdx === el.row && colIdx === el.col) {
              colorClass = color;
              break;
            }
          }
        }

        return (
          <div 
            className={"tile " + colorClass}
            key={"squares_" + rowIdx + colIdx} 
            id={rowIdx + letters[colIdx]}
          >
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