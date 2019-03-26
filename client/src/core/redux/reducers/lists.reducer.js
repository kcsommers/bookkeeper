import {
  ADD_LIST
} from '../actions/lists.actions';

const listsReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ADD_LIST: {
      const { list } = payload;
      return {
        ...state,
        [list.id]: list
      };
    }
    default:
      return state;
  }
};

export default listsReducer;