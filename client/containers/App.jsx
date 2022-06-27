import React from 'react';
import Board from '../components/Board.jsx';
import UserInterface from '../components/UserInterface.jsx';
import '../stylesheet/styles.scss';

const App = () => {
    return (
      <div className="app">
        <Board/>
        <UserInterface/>
      </div>
    )
}

export default App;