import React, {useState} from 'react';

const CurrentScore = (props) => {
  const { score } = props;
  return (
    <div className = "current-score outer-square">
      <h4>Current Score</h4>
      <div className = "inner-square">
        <div className = "inner-current-score">
          <div className = "content-border">
            <h1 className = "green-header">SCORE</h1>
            <h1 className = "value">{score}</h1>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default CurrentScore;