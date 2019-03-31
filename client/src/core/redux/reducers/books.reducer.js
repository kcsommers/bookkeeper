import {
  ADD_BOOK,
  DELETE_BOOK,
  ADD_NOTE,
  ADD_QUOTE,
  REMOVE_NOTE,
  REMOVE_QUOTE
} from '../actions/books.actions';

const booksReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ADD_BOOK: {
      const { book } = payload;
      return {
        ...state,
        [book.id]: book
      };
    }
    case DELETE_BOOK: {
      const newState = Object.keys(state).reduce((newStateObj, currId) => {
        const currIdNum = parseInt(currId, 10);
        if (currIdNum !== payload.bookId) {
          newStateObj[currIdNum] = state[currIdNum];
        }
        return newStateObj;
      }, {});
      return newState;
    }
    case ADD_NOTE: {
      const book = state[payload.bookId];
      const newIdsArr = [payload.noteId, ...book.noteIds];
      book.noteIds = newIdsArr;
      return {
        ...state,
        [book.id]: book
      };
    }
    case ADD_QUOTE: {
      const book = state[payload.bookId];
      const newIdsArr = [payload.quoteId, ...book.quoteIds];
      book.quoteIds = newIdsArr;
      return {
        ...state,
        [book.id]: book
      };
    }
    case REMOVE_NOTE: {
      const book = state[payload.bookId];
      const noteIdsFiltered = book.noteIds.filter(id => id !== payload.noteId);
      book.noteIds = noteIdsFiltered;
      return {
        ...state,
        [book.id]: book
      };
    }
    case REMOVE_QUOTE: {
      const book = state[payload.bookId];
      const quoteIdsFiltered = book.quoteIds.filter(id => id !== payload.quoteId);
      book.quoteIds = quoteIdsFiltered;
      return {
        ...state,
        [book.id]: book
      };
    }
    default:
      return state;
  }
};

export default booksReducer;