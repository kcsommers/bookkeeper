export const ADD_QUOTE = 'quotes:addQuote';
export const DELETE_QUOTE = 'quotes:deleteQuote';
export const UPDATE_QUOTE = 'quotes:updateQuote';

export const addQuote = (quote) => {
  return {
    type: ADD_QUOTE,
    payload: { quote }
  };
};

export const deleteQuote = (quoteId) => {
  return {
    type: DELETE_QUOTE,
    payload: { quoteId }
  };
};

export const updateQuote = (id, newContent) => {
  return {
    type: UPDATE_QUOTE,
    payload: { id, newContent }
  };
};