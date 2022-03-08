const defaultState = 'none';

const SET_INDEX = 'SET_INDEX';

export function setIndex(index) {
    return {
        type: SET_INDEX,
        index
    }
}

export function addRecipeReducer(state = defaultState, action) {
    switch (action.type) {
      case SET_INDEX:
        return action.index;
      default:
        return state;
    }
  }