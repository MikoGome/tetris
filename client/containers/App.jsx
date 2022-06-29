import React, {useState} from 'react';
import Board from '../components/Board.jsx';
import UserInterface from '../components/UserInterface.jsx';
import '../stylesheet/styles.scss';

const App = () => {
  

  return (
    <div className="app">
      TETRIS
      <Board/>
      <UserInterface/>
    </div>
  )
}

export default App;