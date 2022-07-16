import {deepClone} from './helperFunctions.js'
//Pieces: I, J, L, O, S, T, Z


const genPiece = (size, letter) => {
  const pieces = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  if(!letter) letter = pieces[Math.floor(Math.random() * pieces.length)];
  const piece = new Piece(size, letter);
  return piece;
}
//piece
function Piece(size, letter) {
  this.type = letter;
  this.angle = 0;
  let mid = 0;
  if(size === 'big') mid = 5;
  else if(size === 'small') mid = 2;

  switch(letter) {
    case 'I': 
      this.color = 'skyblue';
      this.maxAngle = 2;
      this.position = [{row: 0, col: mid}, {row: 0, col: mid - 2}, {row: 0, col: mid - 1}, {row: 0, col: mid + 1}];
      break;
    case 'J':
      this.color = 'blue';
      this.maxAngle = 4;
      this.position = [{row: 1, col: mid - 1}, {row: 0, col: mid - 2}, {row: 1, col: mid - 2}, {row: 1, col: mid}];
      break;
    case 'L':
      this.color = 'orange';
      this.maxAngle = 4;
      this.position = [{row: 1, col: mid - 1}, {row: 1, col: mid - 2}, {row: 1, col: mid}, {row: 0, col: mid}];
      break;
    case 'S': 
      this.color = 'green';
      this.maxAngle = 2;
      this.position = [{row: 0, col: mid}, {row: 1, col: mid - 2}, {row: 0, col: mid - 1}, {row: 1, col: mid - 1}];
      break;
    case 'Z': 
      this.color = 'red';
      this.maxAngle = 2;
      this.position = [{row: 0, col: mid - 1}, {row: 0, col: mid - 2}, {row: 1, col: mid - 1}, {row: 1, col: mid}];
      break;
    case 'O': 
      this.color = 'yellow';
      this.maxAngle = 1;
      this.position = [{row: 0, col: mid - 1}, {row: 1, col: mid - 1}, {row: 0, col: mid}, {row: 1, col: mid}];
      break;
    case 'T':
      this.color = 'purple';
      this.maxAngle = 4;
      this.position = [{row: 1, col: mid - 1}, {row: 1, col: mid - 2}, {row: 0, col: mid - 1}, {row: 1, col: mid}];
      break;
    
    default: 
      return;
  }
}

Piece.prototype.rotate = function(){
  const copy = deepClone(this);
  const {row, col} = copy.position[0];
  copy.angle++;
  const rotatedAngle = copy.angle % copy.maxAngle;

  switch(this.type) {
    case 'I':
      if(rotatedAngle === 0) {
        copy.position = [{row: row, col: col}, {row: row, col: col - 2}, {row: row, col: col - 1}, {row: row, col: col + 1}];
      } else if(rotatedAngle === 1) {
        copy.position = [{row: row, col: col}, {row: row - 1, col: col}, {row: row + 1, col: col}, {row: row + 2, col: col}];
      }
      break;
    
    case 'J':
      if(rotatedAngle === 0) {
        copy.position = [{row: row, col: col}, {row: row, col: col - 1}, {row: row, col: col + 1}, {row: row - 1, col: col - 1}];
      } else if(rotatedAngle === 1) {
        copy.position = [{row: row, col: col}, {row: row - 1, col: col}, {row: row + 1, col: col}, {row: row - 1, col: col + 1}];
      } else if(rotatedAngle === 2) {
        copy.position = [{row: row, col: col}, {row: row, col: col - 1}, {row: row, col: col + 1}, {row: row + 1, col: col + 1}];
      } else if(rotatedAngle === 3) {
        copy.position = [{row: row, col: col}, {row: row - 1, col: col}, {row: row + 1, col: col}, {row: row + 1, col: col - 1}];
      }
      break;
      
    case 'L':
      if(rotatedAngle === 0) {
        copy.position = [{row: row, col: col}, {row: row, col: col - 1}, {row: row, col: col + 1}, {row: row - 1, col: col + 1}];
      } else if(rotatedAngle === 1) {
        copy.position = [{row: row, col: col}, {row: row - 1, col: col}, {row: row + 1, col: col}, {row: row + 1, col: col + 1}];
      } else if(rotatedAngle === 2) {
        copy.position = [{row: row, col: col}, {row: row, col: col - 1}, {row: row, col: col + 1}, {row: row + 1, col: col - 1}];
      } else if(rotatedAngle === 3) {
        copy.position = [{row: row, col: col}, {row: row - 1, col: col}, {row: row + 1, col: col}, {row: row - 1, col: col - 1}];
      }
      break;
      
    case 'S':
      if(rotatedAngle === 0) {
        copy.position = [{row: row, col: col}, {row: row, col: col + 1}, {row: row + 1, col: col}, {row: row + 1, col: col - 1}];
      } else if(rotatedAngle === 1) {
        copy.position = [{row: row, col: col}, {row: row - 1, col: col - 1}, {row: row, col: col - 1}, {row: row + 1, col: col}];
      }
      break;

    case 'Z':
      if(rotatedAngle === 0) {
        copy.position = [{row: row, col: col}, {row: row, col: col - 1}, {row: row + 1, col: col}, {row: row + 1, col: col + 1}];
      } else if(rotatedAngle === 1) {
        copy.position = [{row: row, col: col}, {row: row + 1, col: col}, {row: row, col: col + 1}, {row: row - 1, col: col + 1}];
      }
      break;
      
    case 'T':
      if(rotatedAngle === 0) {
        copy.position = [{row: row, col: col}, {row: row - 1, col: col}, {row: row, col: col + 1}, {row: row, col: col - 1}];
      } else if(rotatedAngle === 1) {
        copy.position = [{row: row, col: col}, {row: row - 1, col: col}, {row: row, col: col + 1}, {row: row + 1, col: col}];
      } else if(rotatedAngle === 2) {
        copy.position = [{row: row, col: col}, {row: row, col: col + 1}, {row: row + 1, col: col}, {row: row, col: col - 1}];
      } else if(rotatedAngle === 3) {
        copy.position = [{row: row, col: col}, {row: row - 1, col: col}, {row: row + 1, col: col}, {row: row, col: col - 1}];
      }
      break;
  }
  return copy;
}

export default genPiece