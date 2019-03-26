import {
  ADD_BOOK,
  DELETE_BOOK,
  ADD_NOTE,
  ADD_QUOTE,
  DELETE_NOTE,
  DELETE_QUOTE
} from '../actions/books.actions';
import Book from '../../classes/models/Book';

const booksReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ADD_BOOK: {
      const { book } = payload;
      const noteIds = [];
      const quoteIds = [];
      if (book.notes) {
        book.notes.forEach((note) => { noteIds.push(note.id); });
      }
      if (book.quotes) {
        book.quotes.forEach((quote) => { quoteIds.push(quote.id); });
      }
      const newBook = new Book(book.id, book.title, book.authors, book.description, book.thumbnail, book.banner, book.current, noteIds, quoteIds);
      return {
        ...state,
        [newBook.id]: newBook
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
      return {
        ...state,
        [book.id]: {
          ...book,
          noteIds: newIdsArr
        }
      };
    }
    case ADD_QUOTE: {
      const book = state[payload.bookId];
      const newIdsArr = [payload.quoteId, ...book.quoteIds];
      return {
        ...state,
        [book.id]: {
          ...book,
          quoteIds: newIdsArr
        }
      };
    }
    case DELETE_NOTE: {
      const book = state[payload.bookId];
      const noteIdsFiltered = book.noteIds.filter(id => id !== payload.noteId);
      return {
        ...state,
        [book.id]: {
          ...book,
          noteIds: noteIdsFiltered
        }
      };
    }
    case DELETE_QUOTE: {
      const book = state[payload.bookId];
      const quoteIdsFiltered = book.quoteIds.filter(id => id !== payload.quoteId);
      return {
        ...state,
        [book.id]: {
          ...book,
          quoteIds: quoteIdsFiltered
        }
      };
    }
    default:
      return state;
  }
};

export default booksReducer;