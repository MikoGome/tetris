import React, {useState} from 'react';
import '../stylesheet/gameOver.scss';

const GameOver = (props) => {
  const {tryAgain, exit, score} = props;
  
  return (
    <div className = "game-over">
      <div className = "outer-square outer-wrapper">
        <h1>GAME OVER</h1>
        <div className = "game-over-modal inner-square">
          <img src = "https://media.giphy.com/media/dh1VbCznj5qkQmVleO/giphy.gif"/>
          <button className = "exit-button" onClick = {exit}>
            X
          </button>
          <button className = "try-again-button" onClick = {tryAgain}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOver;