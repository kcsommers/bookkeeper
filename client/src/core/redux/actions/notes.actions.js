export const ADD_NOTE = 'notes:addNote';
export const DELETE_NOTE = 'notes:deleteNote';
export const UPDATE_NOTE = 'notes:updateNote';

export const addNote = (note) => {
  return {
    type: ADD_NOTE,
    payload: { note }
  };
};

export const deleteNote = (noteId) => {
  return {
    type: DELETE_NOTE,
    payload: { noteId }
  };
};

export const updateNote = (id, newContent) => {
  return {
    type: UPDATE_NOTE,
    payload: { id, newContent }
  };
};