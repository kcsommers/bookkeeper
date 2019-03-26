import { addNote, updateNote } from '../../redux/actions/notes.actions';
import { addNoteToBook } from '../../redux/actions/books.actions';

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
    this.addToBook(store);
  }

  addToBook(store) {
    store.dispatch(addNoteToBook(this.bookId, this.id));
  }

  update(store, payload) {
    store.dispatch(updateNote(payload.id, payload.newContent));
  }
}