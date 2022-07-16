import React, {useState, useEffect, useRef} from 'react';

import Board from '../components/Board.jsx';
import UserInterface from '../components/UserInterface.jsx';

import '../stylesheet/styles.scss';
import {deepClone} from '../helperFunctions.js';
import genPiece from '../pieces.js';
import {lift, move} from '../gameControls.js';

const App = () => {
  //create state for tetris board
  const squares = Array(20).fill().map((el, row) => Array(10).fill().map((el, col) => 'empty'));
  const [ board, setBoard ] = useState(squares); //all the set pieces
  const [ piece, setPiece ] = useState({position:[]});
  const [ gameOver, setGameOver ] = useState(false);
  const [ newPiece, setNewPiece ] = useState({position:[]});

  const [ startOrReset, setStartOrReset ] = useState(false);
  const [ score, setScore ] = useState(0);
  const [ highScore, setHighScore ] = useState(!localStorage.getItem('highScores') ? [0,0,0] : JSON.parse(localStorage.getItem('highScores'))); 

  const [ music, setMusic ] = useState(false);   

  const gameTime = useRef(null);

  useEffect(() => {
    if(!gameOver) return;
    if(gameOver) alert('you suck')
    console.log('score', score)
    const copyHighScore = highScore.concat(score).sort((a,b) => b - a);
    copyHighScore.pop();
    setScore(0);
    setHighScore(copyHighScore);
    localStorage.setItem('highScores', JSON.stringify(copyHighScore));
    setStartOrReset(false);
    setGameOver(false);
    gameStart();
  }, [gameOver]);

  /*
  position: [rowPos, colPos] ->
    {
      color: color (ex. 'skyblue'),
      position: [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}, {row: 0, col: 3}]
    }
  */
  
  const time = useRef({});
  
  document.onkeydown = e => {
    move(e, piece, setPiece, board, time);
  };

  document.onkeyup = e => {
    lift(e, time);
  };
  
  function gameLogic() {
    gameTime.current = setTimeout(() => {
      gameLogic();
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
            
            let rowClearCount = 0;
            clearRows.forEach(el => {
              copy.splice(el, 1);
              copy.unshift(Array(10).fill('empty'));
              rowClearCount++;
              time.current.save -= 10;
              time.current.active = time.current.save;
            });

            setScore((prev) => {
              return prev + ((rowClearCount * 2)  * 215243)
            });
            
            //transfering our current newPiece to big Board
            setNewPiece((prev) => {
              setPiece(genPiece('big', prev.type));
              return genPiece('small')
            }); //generating a random newPiece
          }
  
          return copy;
        });
  
        const copy = deepClone(prev);
        copy.position.map((el) => {
          el.row++;
        });
        return copy;
      });
    }, time.current.active);
  }

  const gameStart = () => {
    if(!startOrReset) { 
      setStartOrReset(!startOrReset);
      setPiece(genPiece('big'));
      setNewPiece(genPiece('small'));
      time.current.save = 500;
      time.current.active = time.current.save;
      gameLogic();
      if(music) return;
      const bgm = new Audio('https://res.cloudinary.com/dpaazksht/video/upload/v1657933696/maple_gxqh4s.mp3');
      bgm.volume = 0.25;
      bgm.loop = true;
      bgm.play();
      setMusic(true);
    } else {
      setNewPiece({position:[]});
      setPiece({position:[]})
      setBoard(squares);
      setStartOrReset(!startOrReset);
      clearTimeout(gameTime.current);
    }
  }

  return (
    <div className="app">
      {
        !startOrReset ? 
        <button className = "start-button" onClick = {gameStart}>START</button>
        :
        <button className = "start-button" onClick = {gameStart}>RESET</button>
      }
      <Board board={board} piece={piece}/>
      <UserInterface newPiece={newPiece} score={score} highScore={highScore}/>
    </div>
  )
}

export default App;