import { combineReducers } from 'redux'
import { postsIsLoading, postsHasError, posts, post } from './posts'
import { categoriesIsLoading, categoriesHasErrored, categories } from './categories'
import { commentsIsLoading, commentsHasErrored, comments } from './comments'
import { voteScore } from './votescore'

export default combineReducers({
  postsIsLoading,
  postsHasError,
  posts,
  post,
  categoriesIsLoading,
  categoriesHasErrored,
  categories,
  commentsIsLoading,
  commentsHasErrored,
  comments,
  voteScore
})
