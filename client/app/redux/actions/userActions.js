export const SET_USER = 'user:setUser';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: { user }
  };
};