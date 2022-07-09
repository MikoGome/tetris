import React, {useState, useEffect, useRef} from 'react';

import Board from '../components/Board.jsx';
import UserInterface from '../components/UserInterface.jsx';

import '../stylesheet/styles.scss';
import {deepClone} from '../helperFunctions.js';
import genPiece from '../pieces.js';
import {lift, move} from '../gameControls.js';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const App = () => {
  //create state for tetris board
  const squares = Array(20).fill().map((el, row) => Array(10).fill().map((el, col) => 'empty'));
  const [ board, setBoard ] = useState(squares); //all the set pieces
  const [ piece, setPiece ] = useState(genPiece());
  const [ gameOver, setGameOver ] = useState(false);

  useEffect(() => {
    if(gameOver) alert('you suck')
  }, [gameOver])
  /*
  position: [rowPos, colPos] ->
    {
      color: color (ex. 'skyblue'),
      position: [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}, {row: 0, col: 3}]
    }
  */
  
  const time = useRef(500);
  
  document.onkeydown = e => {
    move(e, piece, setPiece, board, time);
  };

  document.onkeyup = e => {
    lift(e, time);
  };
  
  function gameLogic() {
    setPiece((prev) => {
      const { position, color } = prev; //piece
      setBoard((prev) => {
        const copy = deepClone(prev); //copy is board
        let placed = false;
        
        for(let i = 0; i < position.length; i++){
          const el = position[i];
          const row = el.row;
          const col = el.col;
          if(row >= board.length - 1 || prev[row + 1][col] !== 'empty') { //placing the pieces
            placed = true;
            break;
          }
        }

        if(placed) {
          position.forEach((el) => {
            const row = el.row;
            const col = el.col;
            if(copy[row][col] !== 'empty') setGameOver(true);
            copy[row][col] = color;
          })

          const clearRows= [];
          for(let row = 0; row < copy.length; row++){
            let filled = true;
            for(let col = 0; col < copy[row].length; col++){
              if(copy[row][col] === 'empty') {
                filled = false;
                break;
              } 
            }
            if(filled) clearRows.push(row);
          }

          clearRows.forEach(el => {
            copy.splice(el, 1);
            copy.unshift(Array(10).fill('empty'));
          });

          setPiece(genPiece());
        }

        return copy;
      });

      const copy = deepClone(prev);
      copy.position.map((el) => {
        el.row++;
      })
      return copy;
    });
    setTimeout(gameLogic, time.current);
  }

  useEffect(() => {
    gameLogic();
  }, []);

  return (
    <div className="app">
      TETRIS
      <Board board={board} piece={piece}/>
      <UserInterface/>
    </div>
  )
}

export default App;