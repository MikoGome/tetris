import React from 'react';

const HighScore = (props) => {
  const { highScore } = props;
  return (
    <div className = "high-score">
      <p>high - score</p>
      <div className = "inner-high-score">
        {
          highScore.map((el, idx) => {
            return <h1>{idx + 1}. {el}</h1>
          })
        }
      </div>
      
    </div>
  )
}

export default HighScore;