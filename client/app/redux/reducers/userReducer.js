import {
  SET_USER
} from '../actions/userActions';

const userReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_USER:
      console.log('REDUCER', payload.user);
      return payload.user;
    default:
      return state;
  }
};

export default userReducer;