import { deepClone } from './helperFunctions.js';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

export const move = (e, piece, setPiece, board, time) => {
  // const [row, col] = piece;
  const copy = deepClone(piece);

  switch(e.key) {
    case 'ArrowLeft':
      // if(col - 1 < 0 || board[row][col - 1] !== 'empty') break;
      for(let i = 0; i < copy.position.length; i++) {
        const col = copy.position[i].col;
        const row = copy.position[i].row;
        if(col - 1 < 0 || board[row][col - 1] !== 'empty') return;
      }
      copy.position.map((el) => {
        el.col--;
      })
      setPiece(copy);
      break;

    case 'ArrowRight':
      for(let i = 0; i < copy.position.length; i++) {
        const col = copy.position[i].col;
        const row = copy.position[i].row;
        if(col + 1 < 0 || board[row][col + 1] !== 'empty') return;
      }
      copy.position.map((el) => {
        el.col++;
      })
      setPiece(copy);
      break;

    case 'ArrowDown':
      time.current = 50;
      break;

    case 'ArrowUp':
      console.log('up');
      break;

    default:
      return;
  }
}

export const lift = (e, time) => {
  switch(e.key) {
    case 'ArrowDown':
      time.current = 500;
      break;

    default:
      return;
  }
};