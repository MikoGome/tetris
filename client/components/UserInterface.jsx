import React from "react";
import '../stylesheet/userInterface.scss';

import NextPiece from "./userInterface/NextPiece.jsx";
import CurrentScore from "./userInterface/CurrentScore.jsx";
import HighScore from "./userInterface/HighScore.jsx";

const UserInterface = (props) => {
  const { newPiece, score, highScore } = props;

  return (
    <div className="user-interface">
      <NextPiece newPiece={newPiece}/>
      <CurrentScore score={score}/>
      <HighScore highScore={highScore}/>
    </div>
  )
}

export default UserInterface;