import {
  COMMENTS_IS_LOADING,
  COMMENTS_HAS_ERROR,
  FETCH_COMMENTS_DATA_SUCCESS,
  FETCH_COMMENTS_BY_ID_SUCCESS,
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
    case COMMENTS_HAS_ERROR:
      return action.hasErrored
    default:
      return state
  }
}

export function comments(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS_DATA_SUCCESS:
      return action.comments
    default:
      return state
  }
}

export function comment(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS_BY_ID_SUCCESS:
      return action.comment
    case INSERT_UPDATE_COMMENT_SUCCESS:
      return action.comment
    case DELETE_COMMENT_SUCCESS:
      return action.comment
    default:
      return state
  }
}