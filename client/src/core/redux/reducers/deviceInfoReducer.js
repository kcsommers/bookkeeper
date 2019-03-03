import {
  SET_STATUS_BAR_HEIGHT
} from '../actions/deviceInfoActions';

const deviceInfoReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_STATUS_BAR_HEIGHT:
      return {
        ...state,
        statusBarHeight: payload.height
      };
    default:
      return state;
  }
};

export default deviceInfoReducer;