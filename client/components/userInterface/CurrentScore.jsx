import React, {useState} from 'react';

const CurrentScore = (props) => {
  const { score } = props;
  return (
    <div className = "current-score">
      <p>current - score</p>
      <div className = "inner-current-score">
        {score}
      </div>
      
    </div>
  )
}

export default CurrentScore;