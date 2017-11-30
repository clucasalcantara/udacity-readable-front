import {
  COMMENTS_IS_LOADING,
  COMMENTS_HAS_ERRORED,
  COMMENTS_FETCH_DATA_SUCCESS,
  COMMENT_FETCH_BY_ID_DATA_SUCCESS,
  INSERT_UPDATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS
} from '../utils/actionTypes'

export function commentsIsLoading(state = false, action) {
  switch (action.type) {
    case COMMENTS_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

export function commentsHasErrored(state = false, action) {
  switch (action.type) {
    case COMMENTS_HAS_ERRORED:
      return action.hasErrored
    default:
      return state
  }
}

export function comments(state = [], action) {
  switch (action.type) {
    case COMMENTS_FETCH_DATA_SUCCESS:
      return action.comments
    default:
      return state
  }
}

export function comment(state = [], action) {
  switch (action.type) {
    case COMMENT_FETCH_BY_ID_DATA_SUCCESS:
      return action.comment
    case INSERT_UPDATE_COMMENT_SUCCESS:
      return action.comment
    case DELETE_COMMENT_SUCCESS:
      return action.comment
    default:
      return state
  }
}