// import userReducer from '../redux/reducers/user.reducer';
// import listsReducer from '../redux/reducers/lists.reducer';
// import booksReducer from '../redux/reducers/books.reducer';
// import notesReducer from '../redux/reducers/notes.reducer';
// import quotesReducer from '../redux/reducers/quotes.reducer';
// import newItemsReducer from '../redux/reducers/newItems.reducer';
// import deviceInfoReducer from '../redux/reducers/deviceInfo.reducer';
// import { setUser } from '../redux/actions/user.actions';
// import { addList } from '../redux/actions/lists.actions';
// import { addBook } from '../redux/actions/books.actions';
// import { addNote } from '../redux/actions/notes.actions';
// import { addQuote } from '../redux/actions/quotes.actions';
import ModalContent from '../classes/ModalContent';
import { store } from '../redux/store';

export const ScreenService = {
  getItemsById(items, ids) {
    const storeItems = store.getState()[items];
    const results = [];
    ids.forEach(id => { results.push(storeItems[id]); });
    return results;
  },

  getStore() {
    return store;
  },

  getModalContent(template, content, actions) {
    const newModal = new ModalContent(template, content, actions);
    newModal.initModal();
    return newModal;
  }
};