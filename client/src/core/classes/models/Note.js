import { addNote, updateNote, deleteNote } from '../../redux/actions/notes.actions';
import { addNoteToBook, removeNoteFromBook } from '../../redux/actions/books.actions';

export default class Note {
  constructor(
    id,
    content,
    bookId,
    userId,
    createdAt
  ) {
    this.id = id;
    this.content = content;
    this.bookId = bookId;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  addToStore(store) {
    store.dispatch(addNote(this));
    this._addToBook(store);
  }

  update(store, payload) {
    store.dispatch(updateNote(payload.id, payload.newContent));
  }

  removeFromStore(store) {
    store.dispatch(deleteNote(this.id));
    this._removeFromBook(store);
  }

  _addToBook(store) {
    store.dispatch(addNoteToBook(this.bookId, this.id));
  }

  _removeFromBook(store) {
    store.dispatch(removeNoteFromBook(this.bookId, this.id));
  }
}