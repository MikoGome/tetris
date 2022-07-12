import React from "react";
import '../stylesheet/userInterface.scss';

import NextPiece from "./userInterface/NextPiece.jsx";
import CurrentScore from "./userInterface/CurrentScore.jsx";
import HighScore from "./userInterface/HighScore.jsx";

const UserInterface = () => {
  return (
    <div className="user-interface">
      <NextPiece />
      <CurrentScore />
      <HighScore />
    </div>
  )
}

export default UserInterface;