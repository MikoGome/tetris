import React, {State, useEffect} from 'react';
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
  const {color, position} = piece;
  
  const squares = board
    .map((row, rowIdx) => {
      return row.map((col, colIdx) => {
        let colorClass = '';
        if(board[rowIdx][colIdx] !== 'empty') colorClass = board[rowIdx][colIdx];
        else {
          position.forEach((el) => {
            if(rowIdx === el.row && colIdx === el.col) colorClass = color;
          })
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