import { store, createCurrentReadsList } from '../redux/store';

export const GlobalService = {
  getStore() {
    return store;
  },

  createCurrentReadsList(bookIds, userId) {
    createCurrentReadsList(bookIds, userId);
  }
};