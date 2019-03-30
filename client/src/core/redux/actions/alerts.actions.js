export const CREATE_ALERT = 'alerts:createAlert';
export const REMOVE_ALERT = 'alerts:removeAlert';

export const createAlert = (alert) => {
  return {
    type: CREATE_ALERT,
    payload: { alert }
  };
};

export const removeAlert = (alertId) => {
  return {
    type: REMOVE_ALERT,
    payload: { alertId }
  };
};