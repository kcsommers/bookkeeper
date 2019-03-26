export const ADD_LIST = 'lists:addLists';

export const addList = (list) => {
  return {
    type: ADD_LIST,
    payload: { list }
  };
};