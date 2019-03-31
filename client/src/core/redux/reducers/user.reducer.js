import {
  SET_USER, UPDATE_USER
} from '../actions/user.actions';

const userReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return payload.user;
    case UPDATE_USER: {
      const newState = Object.assign(state, payload.newData);
      return newState;
    }
    default:
      return state;
  }
};

export default userReducer;