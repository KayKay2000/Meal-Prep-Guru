import { combineReducers } from 'redux'
import { searchReducer } from './searchReducer'
import { favoritesReducer } from './favoritesReducer'
import { userReducer } from './userReducer'
import { plannerReducer } from './plannerReducer'
import { addRecipeReducer } from './addRecipeReducer'

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  search: searchReducer,
  user: userReducer,
  planner: plannerReducer,
  addIndex: addRecipeReducer
})

export default rootReducer