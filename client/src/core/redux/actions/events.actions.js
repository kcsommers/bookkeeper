export const ADD_EVENT = 'events:addEvent';

export const addEvent = (eventName) => {
  return {
    type: ADD_EVENT,
    payload: { eventName }
  };
};