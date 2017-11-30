import { get, post, put, deleteData } from '../utils/api'
import {
  POSTS_IS_LOADING,
  POSTS_HAS_ERRORED,
  POSTS_FETCH_DATA_SUCCESS,
  POST_FETCH_BY_ID_DATA_SUCCESS,
  INSERT_UPDATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  HANDLE_SORT_POSTS
} from '../utils/actionTypes'

export function postsIsLoading(bool) {
  return {
    type: POSTS_IS_LOADING,
    isLoading: bool
  }
}

export function postsHasErrored(bool) {
  return {
      type: POSTS_HAS_ERRORED,
      hasErrored: bool
  }
}

export function postsFetchDataSuccess(posts) {
  return {
    type: POSTS_FETCH_DATA_SUCCESS,
    posts
  }
}

export function postFetchByIdDataSuccess(post) {
  return {
    type: POST_FETCH_BY_ID_DATA_SUCCESS,
    post
  }
}

export function insertUpdatePostSuccess(post) {
  return {
    type: INSERT_UPDATE_POST_SUCCESS,
    post
  }
}

export function deletePostSuccess(post) {
  return {
    type: DELETE_POST_SUCCESS,
    post
  }
}

export function handleSort(sortBy) {
  return {
    type: HANDLE_SORT_POSTS,
    sortBy
  }
}

export function postFetchById(idPost) {
  const url = `http://localhost:3001/posts/${idPost}`
  return (dispatch) => {
    dispatch(postsIsLoading(true))
    get(url)
      .then(res => {
        dispatch(postsIsLoading(false))
        return res.data
      })
      .then(post => dispatch(postFetchByIdDataSuccess(post)))
      .catch(() => dispatch(postsHasErrored(true)))
  }
 
}

export function postsFetchData(category) {
  const baseUrl = 'http://localhost:3001'
  const url = category ? `${baseUrl}/${category}/posts` : `${baseUrl}/posts`
  return (dispatch) => {
    dispatch(postsIsLoading(true))
    get(url)
      .then(res => {
        dispatch(postsIsLoading(false))
        return res.data
      })
      .then(posts => dispatch(postsFetchDataSuccess(posts)))
      .catch(() => dispatch(postsHasErrored(true)))
  }
}

export function insertPost(postData, id) {
  const baseUrl = 'http://localhost:3001/posts'
  const url = id ? `${baseUrl}/${id}` : baseUrl
  return (dispatch) => {
    post(url, postData)
      .then(res => {
        dispatch(postsIsLoading(false))
        return res.data
      })
      .then(post => dispatch(insertUpdatePostSuccess(post)))
      .catch(() => dispatch(postsHasErrored(true)))
  }
}

export function updatePost(id, { title, body }) {
  const url = `http://localhost:3001/posts/${id}`
  const data = {
    title,
    body
  }
  return (dispatch) => {
    put(url, data)
      .then(res => {
        dispatch(postsIsLoading(false))
        return res.data
      })
      .then(post => dispatch(insertUpdatePostSuccess(post)))
      .catch(() => dispatch(postsHasErrored(true)))
  }
}

export function deletePost(id) {
  const url = `http://localhost:3001/posts/${id}`
  
  return (dispatch) => {
    deleteData(url)
      .then(res => {
        dispatch(postsIsLoading(false))
        return res.data
      })
      .then(post => dispatch(deletePostSuccess(post)))
      .catch(() => dispatch(postsHasErrored(true))) 
  }
}
