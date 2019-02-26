export const SET_STATUS_BAR_HEIGHT = 'deviceInfo:setStatusBarHeight';

export const setStatusBarHeight = (height) => {
  return {
    type: SET_STATUS_BAR_HEIGHT,
    payload: { height }
  };
};