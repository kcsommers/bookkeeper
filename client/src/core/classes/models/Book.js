import { addBook, deleteBook } from '../../redux/actions/books.actions';
import { addBookToList, removeBookFromList } from '../../redux/actions/lists.actions';

export default class Book {
  constructor(
    id,
    title,
    authors,
    description,
    thumbnail,
    banner,
    current,
    noteIds,
    quoteIds
  ) {
    this.id = id;
    this.title = title;
    this.authors = authors;
    this.description = description;
    this.thumbnail = thumbnail;
    this.banner = banner;
    this.current = current;
    this.noteIds = noteIds;
    this.quoteIds = quoteIds;
  }

  addToStore(store, listId) {
    store.dispatch(addBook(this));
    this._addToList(store, listId);
  }

  update() {
  }

  removeFromStore(store, listId) {
    store.dispatch(deleteBook(this.id));
    this._removeFromList(store, listId);
  }

  _addToList(store, listId) {
    store.dispatch(addBookToList(listId, this.id));
  }

  _removeFromList(store, listId) {
    store.dispatch(removeBookFromList(listId, this.id));
  }
}