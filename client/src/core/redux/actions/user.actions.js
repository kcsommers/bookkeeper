export const SET_USER = 'user:setUser';
export const UPDATE_USER = 'user:updateUser';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: { user }
  };
};

export const updateUser = (newData) => {
  return {
    type: UPDATE_USER,
    payload: { newData }
  };
};