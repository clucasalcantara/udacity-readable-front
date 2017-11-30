import { VOTE_SCORE_SUCCESS } from '../utils/actionTypes'

export function voteScore(state = [], action) {
  switch (action.type) {
    case VOTE_SCORE_SUCCESS:
      return state
    default:
      return state
  }
}