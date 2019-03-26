export const ADD_ITEM = 'newItems:addNewItem';

export const addNewItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};