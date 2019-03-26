import {
  ADD_ITEM
} from '../actions/newItems.actions';

const items = {
  lists: [],
  books: [],
  notes: [],
  quotes: []
};

const newItemsReducer = (state = items, { type, payload }) => {
  switch (type) {
    case ADD_ITEM: {
      const currentItems = state[payload.type];
      const newArr = [payload.item, ...currentItems];
      console.log('NEW ITEMS REDUCER:::::::::::', newArr);
      return {
        ...state,
        [payload.type]: newArr
      };
    }
    default:
      return state;
  }
};

export default newItemsReducer;