import { combineReducers } from 'redux'
import { searchReducer } from './searchReducer'
import { favoritesReducer } from './favoritesReducer'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  search: searchReducer,
  user: userReducer
})

export default rootReducer