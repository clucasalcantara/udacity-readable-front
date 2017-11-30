import React from 'react'

const VoteScore = ({ id, score, handleScore }) => {
  return (
    <div>
      <button onClick={() => handleScore(id, 'downVote')}> - </button>
      <strong>Score</strong> {score}
      <button onClick={() => handleScore(id, 'upVote')}> + </button>
    </div>  
  )
}

export default VoteScore
