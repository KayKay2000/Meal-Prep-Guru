const defaultState = [];

const PLANNER_SET_PLANNER = 'PLANNER_SET_PLANNER';

export function setPlanner(mealPlan) {
  return {
    type: PLANNER_SET_PLANNER,
    mealPlan
  }
}

export function plannerReducer(state = defaultState, action) {
    switch (action.type) {
      case PLANNER_SET_PLANNER:
        return action.mealPlan;
      default:
        return state;
    }
  }