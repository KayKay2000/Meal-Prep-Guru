const defaultState = {};

const SET_NEW_ITEM_SLOT_DATA = 'SET_NEW_ITEM_SLOT_DATA';

export function setNewItemSlotData(index, slot, position) {
    return {
        type: SET_NEW_ITEM_SLOT_DATA,
        index,
        slot,
        position
    }
}

export function addRecipeReducer(state = defaultState, action) {
    switch (action.type) {
      case SET_NEW_ITEM_SLOT_DATA:
        return { 
                 index: action.index,
                 slot: action.slot, 
                 position: action.position 
               };
      default:
        return state;
    }
  }