export const ADD_LIST = 'lists:addLists';
export const DELETE_LIST = 'lists:deleteList';
export const ADD_BOOK = 'lists:addBookToList';
export const REMOVE_BOOK = 'lists:removeBookFromList';

export const addList = (list) => {
  return {
    type: ADD_LIST,
    payload: { list }
  };
};

export const deleteList = (listId) => {
  return {
    type: DELETE_LIST,
    payload: { listId }
  };
};

export const addBookToList = (listId, bookId) => {
  return {
    type: ADD_BOOK,
    payload: { listId, bookId }
  };
};

export const removeBookFromList = (listId, bookId) => {
  return {
    type: REMOVE_BOOK,
    payload: { listId, bookId }
  };
};