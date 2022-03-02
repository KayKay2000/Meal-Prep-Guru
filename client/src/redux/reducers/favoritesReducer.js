const defaultState = []

const FAVORITES_ADD_RECIPE = 'FAVORITES_ADD_RECIPE'
const FAVORITES_REMOVE_RECIPE = 'FAVORITES_REMOVE_RECIPE'

export function addRecipe(recipe) {
  return {
    type: FAVORITES_ADD_RECIPE,
    recipe
  }
}

export function removeRecipe(recipe) {
  return {
    type: FAVORITES_REMOVE_RECIPE,
    recipe
  }
}

export function favoritesReducer(state = defaultState, action) {
  switch (action.type) {
    case FAVORITES_ADD_RECIPE:
      return [
        ...state,
        action.recipe
      ]
    case FAVORITES_REMOVE_RECIPE:
      return state.filter((recipe) => {
        return recipe.id !== action.recipe.id
      })
    default:
      return state
  }
}