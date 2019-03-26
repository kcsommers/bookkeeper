import {
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE
} from '../actions/notes.actions';

const notesReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ADD_NOTE: {
      return {
        ...state,
        [payload.note.id]: payload.note
      };
    }
    case DELETE_NOTE: {
      const newState = Object.keys(state).reduce((newStateObj, currId) => {
        const currIdNum = parseInt(currId, 10);
        if (currIdNum !== payload.noteId) {
          newStateObj[currIdNum] = state[currIdNum];
        }
        return newStateObj;
      }, {});
      return newState;
    }
    case UPDATE_NOTE: {
      const note = state[payload.id];
      note.content = payload.newContent;
      return {
        ...state,
        [payload.id]: note
      };
    }
    default:
      return state;
  }
};

export default notesReducer;