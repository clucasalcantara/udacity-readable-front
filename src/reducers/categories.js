import {
  CATEGORIES_IS_LOADING,
  CATEGORIES_HAS_ERRORED,
  CATEGORIES_FETCH_DATA_SUCCESS
} from '../utils/actionTypes'

export function categoriesIsLoading(state = false, action) {
  switch (action.type) {
    case CATEGORIES_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

export function categoriesHasErrored(state = false, action) {
  switch (action.type) {
    case CATEGORIES_HAS_ERRORED:
      return action.hasErrored
    default:
      return state
  }
}

export function categories(state = [], action) {
  switch (action.type) {
    case CATEGORIES_FETCH_DATA_SUCCESS:
      return action.categories
    default:
      return state
  }
}