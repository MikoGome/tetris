import {deepClone} from './helperFunctions.js';

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
      time.current.active = time.current.save / 10;
      break;

    case 'ArrowUp':
      
      const rotated = piece.rotate(setPiece, board);
      for(let i = 0; i < rotated.position.length; i++){
        const {row, col} = rotated.position[i];
        if(row < 0 || row >= 20 || col < 0 || col >= 10 || board[row][col] !== 'empty') return
      }
      new Audio('https://res.cloudinary.com/dpaazksht/video/upload/v1658528964/Maplestory_jump_sfx__getmp3.pro_oonvnc.mp3').play();
      setPiece(rotated);
      break;

    default:
      return;
  }
}

export const lift = (e, time) => {
  switch(e.key) {
    case 'ArrowDown':
      time.current.active = time.current.save;
      break;

    default:
      return;
  }
};