//Pieces: I, J, L, O, S, T, Z

const genPiece = () => {
  const pieces = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const randIdx = Math.floor(Math.random() * pieces.length);
  const piece = new Piece(pieces[randIdx]);
  return piece;
}

class Piece {
  constructor(letter) {
    switch(letter) {
      case 'I': 
        this.color = 'skyblue';
        this.position = [{row: 0, col: 3}, {row: 0, col: 4}, {row: 0, col: 5}, {row: 0, col: 6}];
        break;
      case 'J':
        this.color = 'blue';
        this.position = [{row: 0, col: 3}, {row: 0, col: 4}, {row: 0, col: 5}, {row: 1, col: 3}];
        break;
      case 'L':
        this.color = 'orange';
        this.position = [{row: 0, col: 3}, {row: 0, col: 4}, {row: 0, col: 5}, {row: 1, col: 5}];
        break;
      case 'S': 
        this.color = 'green';
        this.position = [{row: 1, col: 3}, {row: 0, col: 4}, {row: 1, col: 4}, {row: 0, col: 5}];
        break;
      case 'Z': 
        this.color = 'red';
        this.position = [{row: 0, col: 3}, {row: 0, col: 4}, {row: 1, col: 4}, {row: 1, col: 5}];
        break;
      case 'O': 
        this.color = 'yellow';
        this.position = [{row: 0, col: 4}, {row: 1, col: 4}, {row: 0, col: 5}, {row: 1, col: 5}];
        break;
      case 'T':
        this.color = 'purple';
        this.position = [{row: 1, col: 3}, {row: 0, col: 4}, {row: 1, col: 4}, {row: 1, col: 5}];
        break;
      
      default: 
        return;
    }
  }
  
  rotate(){
    console.log('should rotate');
  }
}

export default genPiece;