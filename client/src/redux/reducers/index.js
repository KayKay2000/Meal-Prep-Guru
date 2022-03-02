import { combineReducers } from 'redux'
import { searchReducer } from './searchReducer'
import { favoritesReducer } from './favoritesReducer'

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  search: searchReducer
})

export default rootReducer