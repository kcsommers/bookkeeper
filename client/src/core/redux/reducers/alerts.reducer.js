import { CREATE_ALERT, REMOVE_ALERT } from '../actions/alerts.actions';

const alertsReducer = (state = null, { type, payload }) => {
  switch (type) {
    case CREATE_ALERT: {
      return payload.alert;
    }
    case REMOVE_ALERT: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default alertsReducer;