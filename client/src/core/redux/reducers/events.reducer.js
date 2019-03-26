import { EventEmitter } from 'events';
import {
  ADD_EVENT
} from '../actions/events.actions';

const globalEvents = {
  modalTrigger: new EventEmitter()
};

const eventsReducer = (state = globalEvents, { type, payload }) => {
  switch (type) {
    case ADD_EVENT:
      return {
        ...state,
        [payload.eventName]: new EventEmitter()
      };
    default:
      return state;
  }
};

export default eventsReducer;