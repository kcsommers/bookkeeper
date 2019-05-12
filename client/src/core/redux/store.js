import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user.reducer';
import listsReducer from './reducers/lists.reducer';
import booksReducer from './reducers/books.reducer';
import notesReducer from './reducers/notes.reducer';
import newItemsReducer from './reducers/newItems.reducer';
import eventsReducer from './reducers/events.reducer';
import alertsReducer from './reducers/alerts.reducer';
import deviceInfoReducer from './reducers/deviceInfo.reducer';
import { setUser } from './actions/user.actions';
import { addList } from './actions/lists.actions';
import { addBook } from './actions/books.actions';
import { addNote } from './actions/notes.actions';
import User from '../classes/models/User';
import Book from '../classes/models/Book';
import Note from '../classes/models/Note';
import List from '../classes/models/List';


const allReducers = combineReducers({
  user: userReducer,
  lists: listsReducer,
  books: booksReducer,
  notes: notesReducer,
  newItems: newItemsReducer,
  events: eventsReducer,
  alert: alertsReducer,
  deviceInfo: deviceInfoReducer
});

export const store = createStore(allReducers);

const addItemToStore = (item, action) => {
  store.dispatch(action(item));
};

const createUser = (user) => {
  const listIds = [];
  if (user.lists) {
    user.lists.forEach(list => { listIds.push(list.id); });
  }
  return new User(
    user.id, user.username, user.email, user.password, user.location, user.image, user.banner, listIds
  );
};

const createNote = (note) => {
  return new Note(note.id, note.type, note.content, note.page, note.bookId, note.userId, note.createdAt);
};

const createBook = (book) => {
  const noteIds = [];
  if (book.notes) {
    book.notes.forEach((note) => { noteIds.push(note.id); });
  }
  return new Book(book.id, book.title, book.authors, book.description, book.thumbnail, book.banner, book.current, noteIds);
};

const createList = (list) => {
  const bookIds = [];
  if (list.books.length) {
    list.books.forEach((book) => {
      bookIds.push(book.id);
    });
  }
  return new List(list.id, list.name, list.userId, bookIds);
};

export const createCurrentReadsList = (bookIds, userId) => {
  const newList = new List(0, 'Current Reads', userId, bookIds);
  addItemToStore(newList, addList);
};

export const initializeStore = (user) => {
  addItemToStore(createUser(user), setUser);
  if (user.lists) {
    const currentReads = [];
    user.lists.forEach((list) => {
      addItemToStore(createList(list), addList);
      if (list.books) {
        list.books.forEach((book) => {
          if (book.current) { currentReads.push(book.id); }
          addItemToStore(createBook(book), addBook);
          if (book.notes) {
            book.notes.forEach((note) => {
              addItemToStore(createNote(note), addNote);
            });
          }
        });
      }
    });

    if (currentReads.length) {
      createCurrentReadsList(currentReads, user.id);
    }
  }
};
