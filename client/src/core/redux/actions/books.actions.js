export const ADD_BOOK = 'books:addBook';
export const DELETE_BOOK = 'books:deleteBook';
export const ADD_NOTE = 'books:addNoteToBook';
export const ADD_QUOTE = 'books:addQuoteToBook';
export const DELETE_NOTE = 'books:removeNoteFromBook';
export const DELETE_QUOTE = 'books:removeQuoteFromBook';

export const addBook = (book) => {
  return {
    type: ADD_BOOK,
    payload: { book }
  };
};

export const deleteBook = (bookId) => {
  return {
    type: DELETE_BOOK,
    payload: { bookId }
  };
};

export const addNoteToBook = (bookId, noteId) => {
  return {
    type: ADD_NOTE,
    payload: { bookId, noteId }
  };
};

export const addQuoteToBook = (bookId, quoteId) => {
  return {
    type: ADD_QUOTE,
    payload: { bookId, quoteId }
  };
};

export const removeNoteFromBook = (bookId, noteId) => {
  return {
    type: DELETE_NOTE,
    payload: { bookId, noteId }
  };
};

export const removeQuoteFromBook = (bookId, quoteId) => {
  return {
    type: DELETE_QUOTE,
    payload: { bookId, quoteId }
  };
};