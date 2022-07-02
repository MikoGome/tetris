import React, {useState, useEffect, useRef} from 'react';
import Board from '../components/Board.jsx';
import UserInterface from '../components/UserInterface.jsx';
import '../stylesheet/styles.scss';
import {deepClone} from '../helperFunctions.js';


import {lift, move} from '../gameControls.js';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const App = () => {
  //create state for tetris board
  const squares = Array(20).fill().map((el, row) => Array(10).fill().map((el, col) => 'empty'));
  const [ board, setBoard ] = useState(squares); //all the set pieces
  const [ piece, setPiece ] = useState([0, Math.floor(board[0].length / 2)]); //position: [rowPos, colPos]
  const time = useRef(500);

  document.onkeydown = e => {
    const [row, col] = piece;
    move(e, piece, setPiece, board, time);
    document.querySelectorAll('.empty').forEach(el => {
      el.classList.remove('red');
    });
    document.getElementById(row + letters[col]).classList.add('red');
  };

  document.onkeyup = e => {
    lift(e, time);
  };

  function gameLogic() {
    setPiece((prev) => {
      const [ row, col ] = prev;
      setBoard((prev) => {
        const copy = deepClone(prev);
        if(row >= board.length - 1 || prev[row + 1][col] === 'red') {
          copy[row][col] = 'red';
          setPiece([0, Math.floor(board[0].length / 2)]);
        }
        return copy;
      });
      document.querySelectorAll('.empty').forEach(el => {
        el.classList.remove('red');
      });
      document.getElementById(row + letters[col]).classList.add('red');
      return [prev[0] + 1, prev[1]]
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