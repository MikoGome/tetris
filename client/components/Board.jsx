import React from 'react';
import '../stylesheet/board.scss';

//tetris 10 squares wide, 20 squares tall

const Board  = () => {
  const squares = Array(200).fill().map((el, i) => <div className="tile">{i}</div>)

  return (
    <div className="board">
      {squares}
    </div>
  )
}

export default Board;