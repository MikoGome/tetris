import React from 'react';

const NextPiece = (props) => {
  const { newPiece } = props;

  //nwePiece.color = 'red',
  //newPiece.position = [{col: 0, row: 0}, {col: 0, row: 1}, {col: 0, row: 2}, {col: 0, row : 3}]
  /*
  [
    ['empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty']
  ]
  */
   const smallBoard = Array(2).fill().map((row, idx) => Array(4).fill().map((col, idx) => 'empty'));

   const randomNextPiece = smallBoard.map((row, rowIdx) => {
    return row.map((col, colIdx) => {
      let color = '';
      for(let i = 0; i < newPiece.position.length; i++) {
        if(newPiece.position[i].row === rowIdx && newPiece.position[i].col === colIdx) {
          color = newPiece.color;
          break;
        }
      }
      return <div className={'tile ' + color}></div>;
    }); 
   });

  return (
    <div className = "next-piece">
      <p>Next - Piece</p>
      <div className = "inner-next-piece">
        {randomNextPiece}
      </div>
    </div>
  )
}

export default NextPiece;