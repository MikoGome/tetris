import React from 'react';

const HighScore = (props) => {
  const { highScore } = props;
  return (
    <div className = "high-score outer-square">
      <h4>High Score</h4>
      <div className = "inner-square">
        <div className = "inner-high-score">
          {
            highScore.map((el, idx) => {
              return (
                <div className = "content-border">
                  <h1 className = "green-header">{idx + 1}</h1> 
                  <h1 className = "value">{el}</h1>
                </div>
              )
            })
          }
        </div>
      </div>    
    </div>
  )
}

export default HighScore;