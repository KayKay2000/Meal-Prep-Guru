const defaultState = []

const FAVORITES_ADD_RECIPE = 'FAVORITES_ADD_RECIPE'
const FAVORITES_REMOVE_RECIPE = 'FAVORITES_REMOVE_RECIPE'
const FAVORITES_SET_RECIPES = 'FAVORITES_SET_RECIPES'

export function addFavorite(favorite) {
  return {
    type: FAVORITES_ADD_RECIPE,
    favorite
  }
}

export function removeFavorite(favorite) {
  return {
    type: FAVORITES_REMOVE_RECIPE,
    favorite
  }
}

export function setFavorites(favorites) {
  return {
    type: FAVORITES_SET_RECIPES,
    favorites
  }
}

export function fetchFavorites(dispatch, getState) {
  const state = getState()
  if (!state.user.currentUser) {
    return
  }
  fetch('/api/v1/favorites')
  .then(res => res.json())
  .then(favorites => {
    dispatch(setFavorites(favorites))
  })
}

export function favoritesReducer(state = defaultState, action) {
  switch (action.type) {
    case FAVORITES_SET_RECIPES:
      return action.favorites
    case FAVORITES_ADD_RECIPE:
      return [
        ...state,
        action.favorite
      ]
    case FAVORITES_REMOVE_RECIPE:
      return state.filter((favorite) => {
        return favorite.id !== action.favorite.id
      })
    default:
      return state
  }
}