const defaultState = {};

const PLANNER_SET_PLANNER = 'PLANNER_SET_PLANNER';
const PLANNER_REMOVE_RECIPE = 'PLANNER_REMOVE_RECIPE';
const PLANNER_ADD_RECIPE = 'PLANNER_ADD_RECIPE';

export function setPlanner(planner, objectMap) {

}

export function plannerReducer(state = defaultState, action) {
    switch (action.type) {
      case PLANNER_SET_PLANNER:
        return action.favorites
      case PLANNER_REMOVE_RECIPE:
        return action.favorites
      case PLANNER_ADD_RECIPE:
        return
      default:
        return state
    }
  }