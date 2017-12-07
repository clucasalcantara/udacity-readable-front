import {
  POSTS_FETCH_DATA_SUCCESS,
  POSTS_IS_LOADING,
  POSTS_HAS_ERROR,
  POST_FETCH_BY_ID_DATA_SUCCESS,
  INSERT_UPDATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  HANDLE_SORT_POSTS
} from '../utils/actionTypes'

export function postsIsLoading(state = false, action) {
  switch (action.type) {
    case POSTS_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

export function postsHasErrored(state = false, action) {
  switch (action.type) {
    case POSTS_HAS_ERROR:
      return action.hasErrored
    default:
      return state
  }
}

function sortBy(posts, sortBy) {
  return posts.sort((a, b) => b[sortBy] - a[sortBy])
}

export function posts(state = [], action) {
  switch (action.type) {
    case POSTS_FETCH_DATA_SUCCESS:
      return action.posts
    case HANDLE_SORT_POSTS:
      return [
        ...sortBy(state, action.sortBy)
      ]
    default:
      return state
  }
}

export function post(state = [], action) {
  switch (action.type) {
    case POST_FETCH_BY_ID_DATA_SUCCESS:
      return action.post
    case INSERT_UPDATE_POST_SUCCESS:
      return action.post
    case DELETE_POST_SUCCESS:
      return action.post
    default:
      return state
  }
}