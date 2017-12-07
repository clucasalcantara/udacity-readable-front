import { get, post, put, deleteData } from '../utils/api'
import {
  COMMENTS_IS_LOADING,
  COMMENTS_HAS_ERROR,
  FETCH_COMMENTS_DATA_SUCCESS,
  FETCH_COMMENTS_BY_ID_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  INSERT_UPDATE_COMMENT_SUCCESS
} from '../utils/actionTypes'

export function commentsIsLoading(bool) {
  return {
    type: COMMENTS_IS_LOADING,
    isLoading: bool
  }
}

export function commentsHasErrored(bool) {
  return {
    type: COMMENTS_HAS_ERROR,
    hasErrored: bool
  }
}

export function commentsFetchDataSuccess(comments) {
  return {
    type: FETCH_COMMENTS_DATA_SUCCESS,
    comments
  }
}

export function commentFetchByIdDataSuccess(comment) {
  return {
    type: FETCH_COMMENTS_BY_ID_SUCCESS,
    comment
  }
}


export function deleteCommentSuccess(comment) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    comment
  }
}

export function insertUpdateCommentSuccess(comment) {
  return {
    type: INSERT_UPDATE_COMMENT_SUCCESS,
    comment
  }
}

export function commentsFetchData(postId) {
  const url = `posts/${postId}/comments`
  return (dispatch) => {
    dispatch(commentsIsLoading(true))
    get(url)
      .then(res => {
        dispatch(commentsIsLoading(false))
        return res.data
      })
      .then(comments => dispatch(commentsFetchDataSuccess(comments)))
      .catch(() => dispatch(commentsHasErrored(true)))
  }
}


export function insertComment(commentData) {
  const url = `comments/`
  
  return (dispatch) => {
    post(url, commentData)
      .then(res => {
        dispatch(commentsIsLoading(false))
        return res.data
      })
      .then(post => dispatch(insertUpdateCommentSuccess(post)))
      .catch(() => dispatch(commentsHasErrored(true)))
  }
}

export function commentFetchById(idComment) {
  const url = `comments/${idComment}`
  return (dispatch) => {
    dispatch(commentsIsLoading(true))
    get(url)
      .then(res => {
        dispatch(commentsIsLoading(false))
        return res.data
      })
      .then(comment => dispatch(commentFetchByIdDataSuccess(comment)))
      .catch(() => dispatch(commentsHasErrored(true)))
  }
 
}

export function updateComment(id, {body, timestamp}) {
  const url = `comments/${id}`
  const data = {
    timestamp,
    body
  }
  return (dispatch) => {
    put(url, data)
      .then(res => {
        dispatch(commentsIsLoading(false))
        return res.data
      })
      .then(comment => dispatch(insertUpdateCommentSuccess(comment)))
      .catch(() => dispatch(commentsHasErrored(true)))    
  }
}

export function deleteComment(id) {
  const url = `comments/${id}`
  
  return (dispatch) => {
    deleteData(url)
      .then(res => {
        dispatch(commentsIsLoading(false))
        return res.data
      })
      .then(comment => dispatch(deleteCommentSuccess(comment)))
      .catch(() => dispatch(commentsHasErrored(true)))    
  }
}
