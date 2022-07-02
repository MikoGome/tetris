const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

export const move = (e, piece, setPiece, board, time) => {
  const [row, col] = piece;
  switch(e.key) {

    case 'ArrowLeft':
      if(col - 1 < 0 || board[row][col - 1] !== 'empty') break;
      setPiece([row, col - 1]);
      break;

    case 'ArrowRight':
      if(col + 1 >= 10 || board[row][col + 1] !== 'empty') break;
      setPiece([row, col + 1]);
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