import { post } from '../utils/api'

export function handleVoteScoreSuccess() {
  return {
    type: 'VOTE_SCORE_SUCCESS'
  }
}

export function handleVoteScore(url, value) {
  return (dispatch) => {
    post(url, value)
      .then(res => {
        return res.data
      })
      .then(() => dispatch(handleVoteScoreSuccess()))
  }
}
