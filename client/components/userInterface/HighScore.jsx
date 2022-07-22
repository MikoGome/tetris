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
                <div key={'highscore_'+idx} className = "content-border">
                  <h1 key={'highscore_green_'+idx} className = "green-header">{idx + 1}</h1> 
                  <h1 key={'highscore_value_'+idx} className = "value">{el}</h1>
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