import React, {useState, useEffect, useRef} from 'react';

import Board from '../components/Board.jsx';
import UserInterface from '../components/UserInterface.jsx';
import GameOver from '../components/GameOver.jsx'

import '../stylesheet/styles.scss';
import {deepClone} from '../helperFunctions.js';
import genPiece from '../pieces.js';
import {lift, move} from '../gameControls.js';
//gameover
//https://res.cloudinary.com/dpaazksht/video/upload/v1658529027/MapleStory_BGM_PlayPark-Asiasoft__getmp3.pro_dug4x5.mp3
//jump
//https://res.cloudinary.com/dpaazksht/video/upload/v1658528964/Maplestory_jump_sfx__getmp3.pro_oonvnc.mp3
const App = () => {
  //create state for tetris board
  const squares = Array(20).fill().map((el, row) => Array(10).fill().map((el, col) => 'empty'));
  const [ board, setBoard ] = useState(squares); //all the set pieces
  const [ piece, setPiece ] = useState({position:[]});
  const [ gameOver, setGameOver ] = useState(false);
  const [ newPiece, setNewPiece ] = useState({position:[]});

  const [ start, setStart ] = useState(false);
  const [ score, setScore ] = useState(0);
  const [ highScore, setHighScore ] = useState(!localStorage.getItem('highScores') ? [0,0,0] : JSON.parse(localStorage.getItem('highScores'))); 
  const [ music, setMusic ] = useState(false);

  const bgm = useRef(new Audio('https://res.cloudinary.com/dpaazksht/video/upload/v1657933696/maple_gxqh4s.mp3'));
  const gameTime = useRef(null);
  
  useEffect(() => {
    if(music) { 
      bgm.current.load();
      bgm.current.volume = 0.25;
      bgm.current.loop = true;
      bgm.current.play();
    } else {
      bgm.current.pause();
    }
  }, [music]);

  useEffect(() => {
    if(!gameOver) return;
    setMusic(false);
    const gameOverBgm = new Audio('https://res.cloudinary.com/dpaazksht/video/upload/v1658529027/MapleStory_BGM_PlayPark-Asiasoft__getmp3.pro_dug4x5.mp3');
    gameOverBgm.volume = 0.10;
    gameOverBgm.play();

    clearTimeout(gameTime.current);
    const copyHighScore = highScore.concat(score).sort((a,b) => b - a);
    copyHighScore.pop();
    setHighScore(copyHighScore);
    localStorage.setItem('highScores', JSON.stringify(copyHighScore));
  }, [gameOver]);

  
  function tryAgain() {
    setScore(0);
    setGameOver(false);
    setStart(false);
    gameStart(false);
    gameStart(true);
  }

  function exit() {
    setScore(0);
    setGameOver(false);
    setStart(true);
    gameStart(false);
  }

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
              const landBgm = new Audio('https://res.cloudinary.com/dpaazksht/video/upload/v1658531353/DropItem_onknhr.mp3');
              landBgm.volume = .15;
              landBgm.play();
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
            if(clearRows.length) new Audio('https://res.cloudinary.com/dpaazksht/video/upload/v1658531239/DarkSight_g6rnak.mp3').play(); //clear sfx
            setScore((prev) => {
              return prev + ((rowClearCount * 2)  * 215243)
            });
            
            //transfering our current newPiece to big Board
            setNewPiece((prev) => {
              setPiece(genPiece('big', prev.type));
              return genPiece('small');
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

  const gameStart = (bool) => {
    clearTimeout(gameTime.current);
    setNewPiece({position:[]});
    setPiece({position:[]})
    setBoard(squares);
    setStart(!start);
    setScore(0);
    setMusic(false);

    if(bool) { 
      setPiece(genPiece('big'));
      setNewPiece(genPiece('small'));
      time.current.save = 500;
      time.current.active = time.current.save;
      gameLogic();
      setMusic(true);
    }
  }

  return (
    <div className="app">
      {
        !start ? 
        <button className = "button" onClick = {() => gameStart(true)}>Start</button>
        :
        <button className = "button" onClick = {() => gameStart(false)}>Reset</button>
      }
      <Board board={board} piece={piece}/>
      <UserInterface newPiece={newPiece} score={score} highScore={highScore}/>
      {
        gameOver ? 
        <GameOver tryAgain={tryAgain} exit={exit} score={score}/>:
        null
      }
    </div>
  )
}

export default App;