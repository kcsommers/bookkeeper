import {
  ADD_QUOTE,
  DELETE_QUOTE,
  UPDATE_QUOTE
} from '../actions/quotes.actions';

const quotesReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ADD_QUOTE: {
      return {
        ...state,
        [payload.quote.id]: payload.quote
      };
    }
    case DELETE_QUOTE: {
      const newState = Object.keys(state).reduce((newStateObj, currId) => {
        const currIdNum = parseInt(currId, 10);
        if (currIdNum !== payload.quoteId) {
          newStateObj[currIdNum] = state[currIdNum];
        }
        return newStateObj;
      }, {});
      return newState;
    }
    case UPDATE_QUOTE: {
      const quote = state[payload.id];
      quote.content = payload.newContent;
      return {
        ...state,
        [payload.id]: quote
      };
    }
    default:
      return state;
  }
};

export default quotesReducer;