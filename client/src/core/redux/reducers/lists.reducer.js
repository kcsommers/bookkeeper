import {
  ADD_LIST, DELETE_LIST, ADD_BOOK, REMOVE_BOOK
} from '../actions/lists.actions';

const getReducedState = (state, listId) => {
  const reducedState = Object.keys(state).reduce((newStateObj, currId) => {
    const currIdNum = parseInt(currId, 10);
    if (currIdNum !== listId) {
      newStateObj[currIdNum] = state[currIdNum];
    }
    return newStateObj;
  }, {});
  return reducedState;
};

const listsReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ADD_LIST: {
      const { list } = payload;
      return {
        ...state,
        [list.id]: list
      };
    }
    case DELETE_LIST: {
      return getReducedState(state, payload.listId);
    }
    case ADD_BOOK: {
      const list = state[payload.listId];
      const newIdsArr = [payload.bookId, ...list.bookIds];
      list.bookIds = newIdsArr;
      return {
        ...state,
        [payload.listId]: list
      };
    }
    case REMOVE_BOOK: {
      const list = state[payload.listId];
      const bookIdsFiltered = list.bookIds.filter(id => id !== payload.bookId);
      if (payload.listId === 0 && !bookIdsFiltered.length) {
        return getReducedState(state, payload.listId);
      }
      list.bookIds = bookIdsFiltered;
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