import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user.reducer';
import listsReducer from './reducers/lists.reducer';
import booksReducer from './reducers/books.reducer';
import notesReducer from './reducers/notes.reducer';
import quotesReducer from './reducers/quotes.reducer';
import newItemsReducer from './reducers/newItems.reducer';
import eventsReducer from './reducers/events.reducer';
import alertsReducer from './reducers/alerts.reducer';
import deviceInfoReducer from './reducers/deviceInfo.reducer';
import { setUser } from './actions/user.actions';
import { addList } from './actions/lists.actions';
import { addBook } from './actions/books.actions';
import { addNote } from './actions/notes.actions';
import { addQuote } from './actions/quotes.actions';
import Note from '../classes/models/Note';
import Quote from '../classes/models/Quote';
import List from '../classes/models/List';


const allReducers = combineReducers({
  user: userReducer,
  lists: listsReducer,
  books: booksReducer,
  notes: notesReducer,
  quotes: quotesReducer,
  newItems: newItemsReducer,
  events: eventsReducer,
  alert: alertsReducer,
  deviceInfo: deviceInfoReducer
});

export const store = createStore(allReducers);

const addItemToStore = (item, action) => {
  store.dispatch(action(item));
};

const createNote = (note) => {
  return new Note(note.id, note.content, note.bookId, note.userId, note.createdAt);
};

const createQuote = (quote) => {
  return new Quote(quote.id, quote.content, quote.page, quote.bookId, quote.userId, quote.createdAt);
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

const createCurrentReadsList = (bookIds, userId) => {
  const newList = new List(0, 'Current Reads', userId, bookIds);
  store.dispatch(addList(newList));
};

export const initializeStore = (user) => {
  store.dispatch(setUser(user));
  if (user.lists) {
    const currentReads = [];
    user.lists.forEach((list) => {
      addItemToStore(createList(list), addList);
      if (list.books) {
        list.books.forEach((book) => {
          if (book.current) { currentReads.push(book.id); }
          addItemToStore(book, addBook);
          if (book.notes) {
            book.notes.forEach((note) => {
              addItemToStore(createNote(note), addNote);
            });
          }
          if (book.quotes) {
            book.quotes.forEach((quote) => {
              addItemToStore(createQuote(quote), addQuote);
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
