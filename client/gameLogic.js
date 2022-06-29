export const move = (e, piece, setPiece) => {
  const [row, col] = piece;
  switch(e.key) {
    case 'ArrowLeft':
      if(col - 1 < 0) break;
      setPiece([row, col - 1]);
      break;
    case 'ArrowRight':
      if(col + 1 >= 10) break;
      setPiece([row, col + 1]);
      break;
    case 'ArrowDown':
      console.log('down');
      break;
    case 'ArrowUp':
      console.log('up');
      break;
    default:
      return;
  }
}