import {deepClone} from './helperFunctions.js'
//Pieces: I, J, L, O, S, T, Z


const genPiece = () => {
  const pieces = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const randIdx = Math.floor(Math.random() * pieces.length);
  const piece = new Piece(pieces[randIdx]);
  return piece;
}

function Piece(letter) {
  this.type = letter;
  this.angle = 0;
  
  switch(letter) {
    case 'I': 
      this.color = 'skyblue';
      this.maxAngle = 2;
      this.position = [{row: 0, col: 5}, {row: 0, col: 3}, {row: 0, col: 4}, {row: 0, col: 6}];
      break;
    case 'J':
      this.color = 'blue';
      this.maxAngle = 4;
      this.position = [{row: 1, col: 4}, {row: 0, col: 3}, {row: 1, col: 3}, {row: 1, col: 5}];
      break;
    case 'L':
      this.color = 'orange';
      this.maxAngle = 4;
      this.position = [{row: 1, col: 4}, {row: 1, col: 3}, {row: 1, col: 5}, {row: 0, col: 5}];
      break;
    case 'S': 
      this.color = 'green';
      this.maxAngle = 2;
      this.position = [{row: 0, col: 5}, {row: 1, col: 3}, {row: 0, col: 4}, {row: 1, col: 4}];
      break;
    case 'Z': 
      this.color = 'red';
      this.maxAngle = 2;
      this.position = [{row: 0, col: 4}, {row: 0, col: 3}, {row: 1, col: 4}, {row: 1, col: 5}];
      break;
    case 'O': 
      this.color = 'yellow';
      this.maxAngle = 1;
      this.position = [{row: 0, col: 4}, {row: 1, col: 4}, {row: 0, col: 5}, {row: 1, col: 5}];
      break;
    case 'T':
      this.color = 'purple';
      this.maxAngle = 4;
      this.position = [{row: 1, col: 4}, {row: 1, col: 3}, {row: 0, col: 4}, {row: 1, col: 5}];
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