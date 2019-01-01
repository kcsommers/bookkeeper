export const SET_USER = 'user:setUser';

export const setUser = (user) => {
  console.log('IN ACTION USER', user);
  return {
    type: SET_USER,
    payload: { user }
  };
};